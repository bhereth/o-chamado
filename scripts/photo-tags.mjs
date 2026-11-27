// Shared photo-tag validation. Area keys deliberately match chaveArea in index.qmd.
export const normalize = s => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();
const baseArea = n => n.replace(/(\s+(LD|LZ|Casal|[A-D]))+$/i, "").trim();
export function areaKey(name, zone) {
  const key = normalize(baseArea(name));
  return /^rio branco/.test(key) ? key + (["Moinhos de Vento", "Porto Alegre"].includes(zone) ? "|poa" : "|serra") : key;
}
export function createRegistry(board) {
  const entries = new Map();
  const add = (type, id, label, context) => {
    const key = `${type}:${id}`;
    if (!entries.has(key)) entries.set(key, { type, id, label, contexts: new Set() });
    if (context) entries.get(key).contexts.add(context);
  };
  for (const person of board.missionarios) add("missionary", person.id, `${person.titulo} ${person.plaqueta}`, `${person.chegada ?? "?"} – ${person.saida ?? "?"}`);
  for (const snapshot of board.snapshots) for (const zone of snapshot.zonas) {
    add("zone", normalize(zone.nome), zone.nome);
    if (!zone.especial) for (const area of zone.areas) if (area.nome) add("area", areaKey(area.nome, zone.nome), baseArea(area.nome), zone.nome);
  }
  return [...entries.values()].map(e => ({ ...e, contexts: [...e.contexts].sort() })).sort((a, b) => `${a.type}:${a.id}`.localeCompare(`${b.type}:${b.id}`, "pt"));
}
export function parseTags(text, registry) {
  const aliases = { zona: "zone", area: "area", missionary: "missionary", missionario: "missionary", zone: "zone" };
  const tags = new Map(), errors = [];
  for (const raw of String(text ?? "").split(";").map(s => s.trim()).filter(Boolean)) {
    const colon = raw.indexOf(":");
    const type = aliases[normalize(raw.slice(0, colon))] ?? normalize(raw.slice(0, colon));
    const value = raw.slice(colon + 1).trim();
    if (colon < 1 || !/^[a-z][a-z0-9_-]*$/.test(type) || !value) { errors.push(`Invalid tag "${raw}"; use type:value.`); continue; }
    let id = value;
    if (["area", "zone", "missionary"].includes(type)) {
      const candidates = registry.filter(e => e.type === type);
      const exact = candidates.find(e => e.id === value);
      const matches = exact ? [exact] : candidates.filter(e => normalize(e.id) === normalize(value) || normalize(e.label) === normalize(value));
      if (matches.length !== 1) {
        errors.push(`${matches.length ? "Ambiguous" : "Unknown"} tag "${raw}".${matches.length ? " Choose: " + matches.map(e => `${type}:${e.id}`).join(", ") : " See data/photo-tag-reference.csv."}`);
        continue;
      }
      id = matches[0].id;
    }
    tags.set(`${type}:${id}`, { type, id });
  }
  return { tags: [...tags.values()], errors };
}
export function indexPhotos(photos) {
  const types = new Map();
  for (const photo of photos) for (const { type, id } of photo.tags) {
    if (!types.has(type)) types.set(type, new Map());
    const ids = types.get(type);
    if (!ids.has(id)) ids.set(id, new Set());
    ids.get(id).add(photo.src);
  }
  return Object.fromEntries([...types].map(([type, ids]) => [type, Object.fromEntries([...ids].map(([id, srcs]) => [id, [...srcs]]))]));
}
