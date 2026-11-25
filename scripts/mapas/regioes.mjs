// Tag each RS municipality with a mission sub-region, then dissolve with mapshaper.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const municipios = JSON.parse(fs.readFileSync("data/municipios.json", "utf8"));
const geo = JSON.parse(fs.readFileSync("data/rs-municipios.geojson", "utf8"));

const POR_MICRO = {
  noroeste: [43001, 43002, 43003, 43006, 43007, 43008, 43011],
  planalto: [43004, 43005, 43009, 43010, 43012, 43013, 43014, 43015],
  serra: [43016, 43024],
  vales: [43023, 43021],
  metro: [43026],
  litoral: [43027],
};
// The Sinos valley sits inside the Porto Alegre and Gramado-Canela micro-regions.
const VALE_DOS_SINOS = new Set([
  "Novo Hamburgo", "São Leopoldo", "Campo Bom", "Estância Velha", "Sapiranga", "Dois Irmãos", "Ivoti",
  "Portão", "Sapucaia do Sul", "Taquara", "Parobé", "Nova Hartz", "Araricá", "Lindolfo Collor",
  "Morro Reuter", "Santa Maria do Herval", "Presidente Lucena", "Igrejinha", "Três Coroas", "Rolante",
]);

// The Osório micro-region runs far down the coast; the northern coast stops around Palmares do Sul.
const FORA = new Set(["Mostardas", "Tavares"]);

const microDe = new Map(municipios.map((m) => [String(m.id), m.microrregiao.id]));
const nomeDe = new Map(municipios.map((m) => [String(m.id), m.nome]));
const regiaoDaMicro = new Map();
for (const [r, ids] of Object.entries(POR_MICRO)) for (const id of ids) regiaoDaMicro.set(id, r);

const contagem = {};
for (const f of geo.features) {
  const cod = String(f.properties.codarea);
  const nome = nomeDe.get(cod);
  let r = VALE_DOS_SINOS.has(nome) ? "vales" : FORA.has(nome) ? "fora" : regiaoDaMicro.get(microDe.get(cod)) ?? "fora";
  f.properties = { regiao: r, nome };
  contagem[r] = (contagem[r] ?? 0) + 1;
}
console.log(contagem);
fs.writeFileSync("data/municipios-regiao.geojson", JSON.stringify(geo));

const ms = "node_modules/mapshaper/bin/mapshaper";
execFileSync("node", [ms, "data/municipios-regiao.geojson", "-dissolve", "regiao", "-simplify", "8%", "keep-shapes",
  "-o", "data/regioes.geojson", "format=geojson", "precision=0.0001"], { stdio: "inherit" });
execFileSync("node", [ms, "data/municipios-regiao.geojson", "-dissolve", "-simplify", "8%", "keep-shapes",
  "-o", "data/estado.geojson", "format=geojson", "precision=0.0001"], { stdio: "inherit" });
