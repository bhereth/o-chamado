// Builds data/quadro.json (and data/relatorio-dados.md) from the transfer-board TSV.
// Usage: node scripts/build-data.mjs [--strict]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (f) => path.join(root, f);
const strict = process.argv.includes("--strict");

const tsvText = fs.readFileSync(p("data/areas-e-missionarios.tsv"), "utf8");
const pessoasRaw = JSON.parse(fs.readFileSync(p("data/missionarios.json"), "utf8"));
const corr = JSON.parse(fs.readFileSync(p("data/correcoes.json"), "utf8"));

const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pad = (n) => String(n).padStart(2, "0");
const ymKey = (y, m) => `${y}-${pad(m)}`;
const ymNum = (y, m) => y * 12 + m;
const numToKey = (n) => ymKey(Math.floor((n - 1) / 12), ((n - 1) % 12) + 1);

const MESES = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho",
  "agosto", "setembro", "outubro", "novembro", "dezembro"];
const MES_NOME = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
  "agosto", "setembro", "outubro", "novembro", "dezembro"];

const zonaMap = new Map(Object.entries(corr.zonas).map(([k, v]) => [norm(k), v]));
const especiais = new Set(corr.zonasEspeciais.map(norm));
const apelidos = new Map(Object.entries(corr.apelidos).map(([k, v]) => [norm(k), v]));
const cleanLabel = (l) => {
  const t = l.replace(/\s+/g, " ").trim();
  return apelidos.get(norm(t)) ?? t;
};

const warnings = [];

// ---------- People ----------
const usedIds = new Set();
const pessoas = pessoasRaw.map((r) => {
  const titulo = r["Título"];
  const t = norm(titulo).startsWith("s") ? "s" : "e";
  const cy = Number(r.ChegadaAno), cm = Number(r["ChegadaMês"]);
  const sy = Number(r["SaídaAno"]), sm = Number(r["SaídaMês"]);
  const chegada = cy && cm ? ymKey(cy, cm) : null;
  const saida = sy && sm ? ymKey(sy, sm) : null;
  let id = `${t}-${slug(r.Plaqueta)}-${chegada ?? "x"}`;
  for (let i = 2; usedIds.has(id); i++) id = `${t}-${slug(r.Plaqueta)}-${chegada ?? "x"}-${i}`;
  usedIds.add(id);
  const toks = norm(r.Plaqueta).split(" ");
  const ini = [];
  while (toks.length > 1 && toks[0].length === 1) ini.push(toks.shift());
  return {
    id, t, titulo, plaqueta: r.Plaqueta, nacionalidade: r.Nacionalidade,
    chegada, saida,
    cNum: chegada ? ymNum(cy, cm) : null,
    sNum: saida ? ymNum(sy, sm) : null,
    ini: ini.join(" "), sob: toks.join(" "),
  };
});
const pessoaById = new Map(pessoas.map((x) => [x.id, x]));

// ---------- Parse TSV ----------
const lines = tsvText.split(/\r?\n/);
const rows = [];
let ano = null, mes = null, zona = null;
for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split("\t").map((x) => (x ?? "").trim());
  const [a, m, z, area, ...ms] = c;
  if (![a, m, z, area, ms[0], ms[1], ms[2]].some(Boolean)) continue;
  if (a) ano = Number(a);
  if (m) {
    const idx = MESES.indexOf(norm(m));
    if (idx < 0) throw new Error(`Mês desconhecido "${m}" na linha ${i + 1}`);
    mes = idx + 1;
    zona = null;
  }
  if (z) zona = zonaMap.get(norm(z)) ?? z;
  if (!ano || !mes || !zona) {
    warnings.push(`Linha ${i + 1}: sem ano/mês/zona definidos; ignorada.`);
    continue;
  }
  const labels = ms.slice(0, 3).filter(Boolean).map(cleanLabel);
  const especial = especiais.has(norm(zona));
  if (!area && !especial) warnings.push(`Linha ${i + 1}: área em branco na zona ${zona}.`);
  rows.push({ key: ymKey(ano, mes), ano, mes, zona, especial, area: area || null, labels, linha: i + 1 });
}

// ---------- Build snapshots ----------
const byKey = new Map();
for (const r of rows) {
  if (!byKey.has(r.key)) byKey.set(r.key, []);
  byKey.get(r.key).push(r);
}
const snapKeys = [...byKey.keys()].sort();

const rep = { dup: [], numeradas: [], cruzadas: [], zonasNaoMapeadas: new Set() };
const knownZonas = new Set([...zonaMap.values(), ...zonaMap.keys()].map(norm));

const snapshots = snapKeys.map((key) => {
  const srcRows = byKey.get(key);
  const { ano, mes } = srcRows[0];

  // Drop exact duplicates (same área + same companions, any zone).
  const seen = new Map();
  const kept = [];
  for (const r of srcRows) {
    if (r.area) {
      const sig = norm(r.area) + "|" + r.labels.map(norm).sort().join(",");
      if (seen.has(sig)) {
        const first = seen.get(sig);
        rep.dup.push({ key, area: r.area, keptZona: first.zona, keptLinha: first.linha,
          dropZona: r.zona, dropLinha: r.linha, labels: r.labels });
        continue;
      }
      seen.set(sig, r);
    }
    kept.push(r);
  }

  // Number companionships within zona|área.
  const counts = new Map();
  for (const r of kept) {
    if (!r.area) continue;
    const k = norm(r.zona) + "|" + norm(r.area);
    r.n = (counts.get(k) ?? 0) + 1;
    counts.set(k, r.n);
  }
  for (const r of kept) {
    if (!r.area) { r.n = null; r.total = null; r.rotulo = null; continue; }
    r.total = counts.get(norm(r.zona) + "|" + norm(r.area));
    r.rotulo = r.total > 1 ? `${r.area} #${r.n}` : r.area;
  }
  for (const [k, total] of counts) {
    if (total > 1) {
      const group = kept.filter((r) => r.area && norm(r.zona) + "|" + norm(r.area) === k);
      rep.numeradas.push({ key, zona: group[0].zona, area: group[0].area,
        items: group.map((r) => ({ n: r.n, labels: r.labels, linha: r.linha })) });
    }
  }
  const zonasPorArea = new Map();
  for (const r of kept) {
    if (!r.area) continue;
    const a = norm(r.area);
    if (!zonasPorArea.has(a)) zonasPorArea.set(a, { area: r.area, zonas: new Set() });
    zonasPorArea.get(a).zonas.add(r.zona);
  }
  for (const v of zonasPorArea.values())
    if (v.zonas.size > 1) rep.cruzadas.push({ key, area: v.area, zonas: [...v.zonas] });

  // Group into zones (sheet order).
  const zonas = [];
  const zIdx = new Map();
  for (const r of kept) {
    if (!knownZonas.has(norm(r.zona))) rep.zonasNaoMapeadas.add(r.zona);
    if (!zIdx.has(r.zona)) {
      zIdx.set(r.zona, zonas.length);
      zonas.push({ nome: r.zona, especial: r.especial, areas: [] });
    }
    zonas[zIdx.get(r.zona)].areas.push({
      nome: r.area, n: r.n, total: r.total, rotulo: r.rotulo, linha: r.linha,
      dupla: r.labels.map((l) => ({ n: l, id: null, c: null })),
    });
  }
  const regular = zonas.filter((z) => !z.especial);
  const areaSet = new Set();
  let comp = 0, miss = 0;
  for (const z of regular) for (const a of z.areas) if (a.nome) { areaSet.add(norm(a.nome)); comp++; }
  for (const z of zonas) for (const a of z.areas) miss += a.dupla.length;
  return {
    key, ano, mes, mesNome: MES_NOME[mes - 1],
    stats: { zonas: regular.length, areas: areaSet.size, companheirismos: comp, missionarios: miss },
    zonas,
  };
});

// ---------- Matching ----------
const occs = [];
snapshots.forEach((s, si) => {
  const d = ymNum(s.ano, s.mes);
  for (const z of s.zonas) for (const a of z.areas) for (const nm of a.dupla) {
    occs.push({ si, d, key: s.key, zona: z.nome, area: a.rotulo ?? z.nome, nm, label: norm(nm.n), cands: [] });
  }
});

const inRange = (x, d, tol) =>
  (x.cNum == null || x.cNum - tol <= d) && (x.sNum == null || d <= x.sNum + tol);

const vinculos = corr.vinculos.map((v) => ({ ...v, label: norm(v.rotulo) }));
for (const v of vinculos) if (!pessoaById.has(v.id)) warnings.push(`Vínculo com id inexistente: ${v.id}`);

const badLabels = [];
for (const o of occs) {
  const v = vinculos.find((v) => v.label === o.label && (!v.de || o.key >= v.de) && (!v.ate || o.key <= v.ate));
  if (v && pessoaById.has(v.id)) { o.nm.id = v.id; o.nm.c = "vinculo"; continue; }
  const toks = o.label.split(" ");
  const t = toks.shift();
  if ((t !== "e" && t !== "s") || toks.length === 0) { badLabels.push(o); continue; }
  const ini = [];
  while (toks.length > 1 && toks[0].length === 1) ini.push(toks.shift());
  o.ini = ini.join(" ");
  o.sob = toks.join(" ");
  o.t = t;
  const same = pessoas.filter((x) => x.t === t && x.sob === o.sob);
  const t1 = (tol) => same.filter((x) => x.ini === o.ini && inRange(x, o.d, tol));
  const t2 = (tol) => same.filter((x) => (!x.ini || !o.ini || x.ini === o.ini) && inRange(x, o.d, tol));
  const tiers = [[t1(0), 0], [t2(0), 0], [t1(1), 1], [t2(1), 1]];
  o.pool = t2(1).map((x) => x.id);
  const hit = tiers.find(([c]) => c.length > 0);
  if (!hit) continue;
  const [cands, tol] = hit;
  o.tol = tol;
  if (cands.length === 1) {
    o.nm.id = cands[0].id;
    o.nm.c = tol ? "tolerancia" : cands[0].ini !== o.ini ? "sem-iniciais" : "exato";
  } else {
    o.cands = cands.map((x) => x.id);
  }
}

// Resolve ambiguous occurrences.
const occsBySnap = snapshots.map(() => []);
for (const o of occs) occsBySnap[o.si].push(o);
const occsByLabel = new Map();
for (const o of occs) {
  if (!occsByLabel.has(o.label)) occsByLabel.set(o.label, []);
  occsByLabel.get(o.label).push(o);
}
const assign = (o, id) => { o.nm.id = id; o.nm.c = "inferido"; o.cands = []; };

let changed = true;
while (changed) {
  changed = false;
  for (const o of occs) {
    if (o.nm.id || o.cands.length < 2) continue;
    const taken = new Set(occsBySnap[o.si].filter((x) => x !== o && x.nm.id).map((x) => x.nm.id));
    const rest = o.cands.filter((id) => !taken.has(id));
    if (rest.length === 1) { assign(o, rest[0]); changed = true; continue; }
    if (rest.length < o.cands.length && rest.length > 0) { o.cands = rest; changed = true; }

    const same = occsByLabel.get(o.label);
    const neighbor = same.find((x) => Math.abs(x.si - o.si) === 1 && x.nm.id && o.cands.includes(x.nm.id)
      && !taken.has(x.nm.id));
    if (neighbor) { assign(o, neighbor.nm.id); changed = true; continue; }

    // Consecutive run of snapshots containing this label.
    const sis = [...new Set(same.map((x) => x.si))].sort((a, b) => a - b);
    let lo = sis.indexOf(o.si), hi = lo;
    while (lo > 0 && sis[lo - 1] === sis[lo] - 1) lo--;
    while (hi < sis.length - 1 && sis[hi + 1] === sis[hi] + 1) hi++;
    const ds = sis.slice(lo, hi + 1).map((si) => ymNum(snapshots[si].ano, snapshots[si].mes));
    const covering = o.cands.filter((id) => ds.every((d) => inRange(pessoaById.get(id), d, 1)));
    if (covering.length === 1) { assign(o, covering[0]); changed = true; }
  }
}

// A missionary can only be in one área per snapshot. When two occurrences claim the same
// person, keep the one that continues that person's zone in adjacent snapshots (then the
// stronger match); the other gets the only remaining same-name candidate, or none.
const conflitos = [];
const forca = { vinculo: 4, exato: 3, "sem-iniciais": 2, tolerancia: 1, inferido: 1 };
snapshots.forEach((s, si) => {
  const porPessoa = new Map();
  for (const o of occsBySnap[si]) {
    if (!o.nm.id) continue;
    if (!porPessoa.has(o.nm.id)) porPessoa.set(o.nm.id, []);
    porPessoa.get(o.nm.id).push(o);
  }
  for (const [id, grupo] of porPessoa) {
    if (grupo.length < 2) continue;
    const vizinhos = [si - 1, si + 1].flatMap((j) => (occsBySnap[j] ?? []).filter((x) => x.nm.id === id));
    const nota = (o) =>
      vizinhos.filter((v) => v.zona === o.zona).length * 10 +
      vizinhos.filter((v) => v.area === o.area).length * 10 +
      (forca[o.nm.c] ?? 0);
    const [fica, ...saem] = [...grupo].sort((a, b) => nota(b) - nota(a));
    for (const o of saem) {
      if (o.nm.c === "vinculo") continue;
      const usados = new Set(occsBySnap[si].filter((x) => x !== o && x.nm.id).map((x) => x.nm.id));
      const alt = (o.pool ?? []).filter((pid) => pid !== id && !usados.has(pid));
      const antes = o.nm.id;
      if (alt.length === 1) { o.nm.id = alt[0]; o.nm.c = "inferido"; }
      else { o.nm.id = null; o.nm.c = null; o.cands = alt.length > 1 ? alt : []; }
      conflitos.push({ key: s.key, id: antes, fica, sai: o, novo: o.nm.id });
    }
  }
});

// Same person twice in one snapshot.
const dobrados = [];
snapshots.forEach((s, si) => {
  const seen = new Map();
  for (const o of occsBySnap[si]) {
    if (!o.nm.id) continue;
    if (seen.has(o.nm.id)) dobrados.push({ key: s.key, id: o.nm.id, a: seen.get(o.nm.id), b: o });
    else seen.set(o.nm.id, o);
  }
});
const rotulosDobrados = [];
snapshots.forEach((s, si) => {
  const seen = new Map();
  for (const o of occsBySnap[si]) {
    if (seen.has(o.label)) rotulosDobrados.push({ key: s.key, label: o.nm.n, a: seen.get(o.label), b: o });
    else seen.set(o.label, o);
  }
});

// ---------- Write quadro.json ----------
const out = {
  fonte: { tsv: "data/areas-e-missionarios.tsv", sha1: crypto.createHash("sha1").update(tsvText).digest("hex") },
  missionarios: pessoas.map(({ id, titulo, plaqueta, nacionalidade, chegada, saida }) =>
    ({ id, titulo, plaqueta, nacionalidade, chegada, saida })),
  snapshots,
};
// Only touch files whose content changed, so unchanged data doesn't fight editors/locks.
const writeIfChanged = (f, text) => {
  if (fs.existsSync(p(f)) && fs.readFileSync(p(f), "utf8") === text) return;
  fs.writeFileSync(p(f), text);
};
writeIfChanged("data/quadro.json", JSON.stringify(out) + "\n");

// ---------- Report ----------
const lev = (a, b) => {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
};
const fmtP = (id) => {
  const x = pessoaById.get(id);
  return `\`${id}\` (${x.titulo} ${x.plaqueta}, ${x.chegada ?? "?"} → ${x.saida ?? "?"})`;
};
const groupBy = (list, f) => {
  const m = new Map();
  for (const x of list) { const k = f(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); }
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
};
const where = (o) => `${o.key} ${o.zona} / ${o.area}`;
const range = (list) => {
  const ks = list.map((o) => o.key).sort();
  return ks[0] === ks.at(-1) ? ks[0] : `${ks[0]} … ${ks.at(-1)}`;
};

const ambig = occs.filter((o) => !o.nm.id && o.cands.length > 1);
const semCand = occs.filter((o) => !o.nm.id && o.cands.length === 0);
const counts = {};
for (const o of occs) { const c = o.nm.c ?? "sem-registro"; counts[c] = (counts[c] ?? 0) + 1; }

const md = [];
md.push("# Relatório dos dados do quadro de transferências", "");
md.push("Gerado por `node scripts/build-data.mjs`. Corrija a planilha ou `data/correcoes.json` e rode de novo.", "");
md.push(`- Quadros (meses): ${snapshots.length}`);
md.push(`- Nomes no total: ${occs.length}`);
for (const [c, n] of Object.entries(counts).sort()) md.push(`- ${c}: ${n}`);
md.push("");

md.push("## A. Nomes ambíguos (mais de uma pessoa possível)", "");
md.push("Para resolver, adicione um item em `vinculos` no `data/correcoes.json`.", "");
for (const [label, list] of groupBy(ambig, (o) => o.label)) {
  md.push(`### ${list[0].nm.n} — ${list.length}× (${range(list)})`);
  const ids = [...new Set(list.flatMap((o) => o.cands))];
  for (const id of ids) md.push(`- ${fmtP(id)}`);
  md.push("", "```json", JSON.stringify({ rotulo: list[0].nm.n, de: range(list).split(" … ")[0],
    ate: range(list).split(" … ").at(-1), id: ids[0] }), "```", "");
}

md.push("## B. Nomes sem nenhuma pessoa correspondente", "");
for (const [label, list] of groupBy(semCand, (o) => o.label)) {
  const o = list[0];
  let hint = "";
  if (o.sob) {
    const near = pessoas.filter((x) => x.t === o.t && lev(x.sob, o.sob) <= 2)
      .map((x) => `${x.titulo} ${x.plaqueta} (${x.chegada ?? "?"} → ${x.saida ?? "?"})`);
    hint = near.length ? ` — parecidos: ${near.slice(0, 5).join("; ")}` : " — provavelmente falta em missionarios.json";
  } else hint = " — rótulo inválido (deve começar com E ou S)";
  md.push(`- **${o.nm.n}** ${list.length}× (${range(list)}; ex.: ${where(o)})${hint}`);
}
md.push("");

md.push("## C. Identificados só com tolerância de ±1 mês", "");
for (const [, list] of groupBy(occs.filter((o) => o.nm.c === "tolerancia"), (o) => o.label + "|" + o.nm.id))
  md.push(`- ${list[0].nm.n} → ${fmtP(list[0].nm.id)} — ${range(list)}`);
md.push("");

md.push("## D. Iniciais só de um lado", "");
md.push("Sugestão: acrescentar a inicial na Plaqueta (ou na planilha) para casar exatamente.", "");
for (const [, list] of groupBy(occs.filter((o) => o.nm.c === "sem-iniciais"), (o) => o.label + "|" + o.nm.id))
  md.push(`- ${list[0].nm.n} → ${fmtP(list[0].nm.id)} — ${list.length}×`);
md.push("");

md.push("## E1. Linhas duplicadas removidas (mesmos missionários)", "");
for (const d of rep.dup)
  md.push(`- ${d.key} **${d.area}**: mantida em ${d.keptZona} (linha ${d.keptLinha}), removida de ${d.dropZona} (linha ${d.dropLinha}) — ${d.labels.join(", ")}`);
md.push("");

md.push("## E2. Áreas com mais de uma dupla (numeradas)", "");
for (const g of rep.numeradas)
  md.push(`- ${g.key} ${g.zona} / **${g.area}**: ` + g.items.map((i) => `#${i.n} ${i.labels.join(", ")} (linha ${i.linha})`).join(" · "));
md.push("");

md.push("## E3. Mesmo nome de área em zonas diferentes (não numeradas)", "");
for (const c of rep.cruzadas) md.push(`- ${c.key} **${c.area}**: ${c.zonas.join(", ")}`);
md.push("");

md.push("## F. Repetições no mesmo quadro", "");
for (const r of rotulosDobrados) md.push(`- ${r.key} rótulo **${r.label}** em ${r.a.area} e ${r.b.area}`);
for (const r of dobrados) md.push(`- ${r.key} pessoa ${fmtP(r.id)} em ${r.a.area} e ${r.b.area}`);
md.push("");

md.push("## F2. Mesma pessoa em duas áreas no mesmo quadro (resolvido automaticamente)", "");
md.push("Uma pessoa só pode estar numa área por mês. Ficou com a área que continua a zona dos meses vizinhos.", "");
for (const c of conflitos)
  md.push(`- ${c.key} ${fmtP(c.id)}: fica em ${c.fica.area}; ${c.sai.nm.n} em ${c.sai.area} → ` +
    (c.novo ? fmtP(c.novo) : "sem registro"));
md.push("");

md.push("## G. Zonas fora do mapa de correções / avisos", "");
for (const z of rep.zonasNaoMapeadas) md.push(`- zona sem entrada em \`zonas\`: ${z} (ok se o nome já estiver correto)`);
for (const w of warnings) md.push(`- ${w}`);
md.push("");

writeIfChanged("data/relatorio-dados.md", md.join("\n"));

// ---------- Console summary ----------
const first = snapshots[0], last = snapshots.at(-1);
console.log(`[build-data] ${snapshots.length} quadros, ${rows.length} linhas, ${occs.length} nomes`);
console.log(`[build-data] zonas: ${first.key}=${first.stats.zonas} → ${last.key}=${last.stats.zonas}`);
console.log(`[build-data] ${Object.entries(counts).map(([c, n]) => `${c}=${n}`).join(" ")}`);
console.log(`[build-data] duplicadas=${rep.dup.length} numeradas=${rep.numeradas.length} cruzadas=${rep.cruzadas.length} ambíguos=${new Set(ambig.map((o) => o.label)).size} sem-registro=${new Set(semCand.map((o) => o.label)).size}`);
console.log(`[build-data] relatório: data/relatorio-dados.md`);
if (strict && (ambig.length || semCand.length)) process.exit(1);
