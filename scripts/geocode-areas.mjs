// Finds map coordinates for every área on the transfer boards and writes data/areas-coords.json.
//
//   node scripts/geocode-areas.mjs <folder with municipios.csv>
//
// Cities come from the IBGE municipality list (https://github.com/kelvins/municipios-brasileiros, csv/).
// Neighborhoods are looked up in OpenStreetMap Nominatim (only the área name and its city are sent,
// one request per second, per Nominatim's usage policy). Anything not found is placed at its city's
// center and marked "aproximado" for a person to check.
//
// Entries already in data/areas-coords.json are kept as they are, so hand corrections survive a rerun:
// set "fonte": "manual" after fixing one. Delete an entry to look it up again.
import fs from "node:fs";

const G = process.argv[2];
if (!G) { console.error("usage: node scripts/geocode-areas.mjs <gazetteer folder>"); process.exit(1); }
const SAIDA = "data/areas-coords.json";

const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
// Same rule the site uses to group an área's companionships: drop A/B letters, numbers and
// the LD/LZ/Casal tags, which name companionships or wards rather than places.
const baseArea = nome => nome.replace(/(\s+(LD|LZ|Casal|[A-D]|\d+))+$/i, "").trim();

// City each zone sits in, used as context for neighborhood names.
const ZONA_CIDADE = {
  "Porto Alegre": "Porto Alegre", "Moinhos de Vento": "Porto Alegre", "Guaíba": "Guaíba",
  "Canoas": "Canoas", "Canoas-Esteio": "Canoas", "Gravataí": "Gravataí", "São Leopoldo": "São Leopoldo",
  "Novo Hamburgo": "Novo Hamburgo", "Taquara": "Taquara", "Montenegro": "Montenegro",
  "Caxias do Sul": "Caxias do Sul", "Bento Gonçalves": "Bento Gonçalves", "Vacaria": "Vacaria",
  "Passo Fundo": "Passo Fundo", "Vergueiro": "Passo Fundo", "Erechim": "Erechim", "Osório": "Osório",
  "Capão da Canoa": "Capão da Canoa", "Ijuí": "Ijuí", "Santo Ângelo": "Santo Ângelo",
};
// Short or alternate forms of place names.
const APELIDOS = {
  "Sapucaia": "Sapucaia do Sul", "Caxias": "Caxias do Sul", "Rio Sinos": "Rio dos Sinos",
  "Morada do Sul": "Morada do Sol", "São Luiz": "São Luís",
};
// Names that are wards or offices, not places: put them at their city's center.
const SEM_LUGAR = new Set(["Ala", "Staff", "Staff Ala", "Kephas", "Ala do Vale", "Novo Hamburgo Ala"]);

const csv = t => t.replace(/^﻿/, "").trim().split(/\r?\n/).map(l => l.split(","));
const municipios = new Map(); // RS only (codigo_uf 43)
for (const r of csv(fs.readFileSync(`${G}/municipios.csv`, "utf8")).slice(1))
  if (r[5] === "43") municipios.set(norm(r[1]), { nome: r[1], lat: +r[2], lon: +r[3] });

const espera = ms => new Promise(r => setTimeout(r, ms));
let ultimo = 0;
async function nominatim(q) {
  const agora = Date.now();
  if (agora - ultimo < 1100) await espera(1100 - (agora - ultimo));
  ultimo = Date.now();
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&countrycodes=br&q=${encodeURIComponent(q)}`;
  const r = await fetch(url, { headers: { "User-Agent": "o-chamado-area-map/1.0 (one-off geocoding of area names)" } });
  if (!r.ok) throw new Error(`Nominatim ${r.status}`);
  return (await r.json()).map(x => ({ ...x, lat: +x.lat, lon: +x.lon }));
}
const distKm = (a, b) => {
  const R = 6371, t = Math.PI / 180;
  const dLat = (b.lat - a.lat) * t, dLon = (b.lon - a.lon) * t;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * t) * Math.cos(b.lat * t) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
// Places only: neighborhoods, districts, towns. Streets, schools and parks are not where an área was.
const TIPOS = new Set(["suburb", "neighbourhood", "quarter", "city_district", "borough", "village", "hamlet",
  "town", "city", "locality", "isolated_dwelling", "administrative"]);
const lugar = r => (r.category === "place" || r.category === "boundary") && TIPOS.has(r.type);
const resumo = r => r.display_name.split(",").slice(0, 3).join(",").trim();

const quadro = JSON.parse(fs.readFileSync("data/quadro.json", "utf8"));
const pares = new Map();
for (const s of quadro.snapshots) for (const z of s.zonas) {
  if (z.especial) continue;
  for (const a of z.areas) if (a.nome) pares.set(`${baseArea(a.nome)}|${z.nome}`, { area: baseArea(a.nome), zona: z.nome });
}

const antigo = fs.existsSync(SAIDA) ? JSON.parse(fs.readFileSync(SAIDA, "utf8")).areas : [];
const feitos = new Map(antigo.map(e => [`${e.area}|${e.zona}`, e]));
const saida = [];
for (const [k, { area, zona }] of [...pares].sort()) {
  if (feitos.has(k)) { saida.push(feitos.get(k)); continue; }
  const cidade = ZONA_CIDADE[zona];
  const centro = municipios.get(norm(cidade));
  const nome = APELIDOS[area] ?? area;
  let e;
  if (SEM_LUGAR.has(area)) {
    e = { lat: centro.lat, lon: centro.lon, fonte: "aproximado", nota: `ala/escritório; centro de ${cidade}` };
  } else if (norm(nome) === norm(cidade)) {
    e = { lat: centro.lat, lon: centro.lon, fonte: "ibge", nota: `cidade de ${cidade}` };
  } else {
    // "Guaíba Colina", "Cruz Alta Oeste": a city name followed by a neighborhood or direction.
    const pref = [...municipios.keys()].filter(c => norm(nome).startsWith(c + " ")).sort((a, b) => b.length - a.length)[0];
    const cid = pref ? municipios.get(pref) : centro;
    const bairro = pref ? nome.slice(municipios.get(pref).nome.length).trim() : nome;
    // 1. A neighborhood or district of that name in the zone's city.
    let bom = (await nominatim(`${bairro}, ${cid.nome}, Rio Grande do Sul`)).find(r => lugar(r) && distKm(r, cid) < 25);
    // 2. A neighborhood of that name nearby (a zone could reach into the next city).
    if (!bom && !pref) bom = (await nominatim(`${bairro}, Rio Grande do Sul`)).find(r => lugar(r) && r.type !== "city" && r.type !== "town" && distKm(r, cid) < 40);
    const m = municipios.get(norm(nome));
    if (bom) e = { lat: bom.lat, lon: bom.lon, fonte: "osm", nota: resumo(bom) };
    // 3. A city of that name within reach of the zone.
    else if (m && distKm(m, centro) < 150) e = { lat: m.lat, lon: m.lon, fonte: "ibge", nota: `cidade de ${m.nome}` };
    else e = { lat: cid.lat, lon: cid.lon, fonte: "aproximado", nota: `não encontrado; centro de ${cid.nome}` };
  }
  saida.push({ area, zona, lat: +e.lat.toFixed(4), lon: +e.lon.toFixed(4), fonte: e.fonte, nota: e.nota });
  console.log(`${e.fonte.padEnd(10)} ${area} (${zona}) -> ${e.nota}`);
}
fs.writeFileSync(SAIDA, JSON.stringify({ areas: saida }, null, 1) + "\n");
const conta = f => saida.filter(e => e.fonte === f).length;
console.log(`\n${saida.length} entries: ibge ${conta("ibge")}, osm ${conta("osm")}, aproximado ${conta("aproximado")}, manual ${conta("manual")}`);
