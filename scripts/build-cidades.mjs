// Builds data/cidades.json (hometown counts with coordinates) from data/home-towns.csv.
// The CSV holds only City,State, one row per missionary, with no names, so the map shows
// how many missionaries came from each place and nothing about who they were.
//
// Not part of the Quarto pre-render, because it needs two public gazetteers that are not in the repo:
//   municipios.csv, estados.csv  https://github.com/kelvins/municipios-brasileiros (csv/)
//   2023_Gaz_place_national.txt  https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2023_Gazetteer/2023_Gaz_place_national.zip
// Usage: node scripts/build-cidades.mjs <folder with those files>
import fs from "node:fs";

const G = process.argv[2];
if (!G) { console.error("usage: node scripts/build-cidades.mjs <gazetteer folder>"); process.exit(1); }

const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const linhasCsv = t => t.replace(/^﻿/, "").trim().split(/\r?\n/).map(l => l.split(","));

// Common names that the gazetteers list under their official name.
const APELIDOS = {
  "RJ|Campos": "Campos dos Goytacazes",
  "SP|Embu": "Embu das Artes",
  "TO|Miracema": "Miracema do Tocantins",
  "ID|Boise": "Boise City",
  "UT|Saint George": "St. George",
  "UT|West Valley": "West Valley City",
  "UT|Mt. Green": "Mountain Green",
  "CA|Ventura": "San Buenaventura (Ventura)",
};
// Places that are not separate municipalities/census places (DF administrative regions,
// Utah metro townships, unincorporated communities): name shown, approximate coordinates.
const FIXOS = {
  "DF|Taguatinga": ["BR", "Taguatinga", -15.833, -48.056],
  "DF|Taguatinga Norte": ["BR", "Taguatinga", -15.833, -48.056],
  "DF|Taguatinga Sul": ["BR", "Taguatinga", -15.833, -48.056],
  "DF|Ceilândia": ["BR", "Ceilândia", -15.817, -48.108],
  "DF|Brazlândia": ["BR", "Brazlândia", -15.675, -48.207],
  "UT|Kearns": ["US", "Kearns", 40.660, -111.996],
  "UT|Magna": ["US", "Magna", 40.709, -112.101],
  "ID|Pingree": ["US", "Pingree", 43.106, -112.590],
  "AZ|Pomerene": ["US", "Pomerene", 31.998, -110.287],
  "WA|Veradale": ["US", "Veradale", 47.649, -117.207],
};

const [, ...est] = linhasCsv(fs.readFileSync(`${G}/estados.csv`, "utf8"));
const ufDe = new Map(est.map(r => [r[0], r[1]]));
const UFS = new Set(ufDe.values());
const br = new Map();
for (const r of linhasCsv(fs.readFileSync(`${G}/municipios.csv`, "utf8")).slice(1))
  br.set(`${ufDe.get(r[5])}|${norm(r[1])}`, { nome: r[1], lat: +r[2], lon: +r[3] });
const us = new Map();
for (const l of fs.readFileSync(`${G}/2023_Gaz_place_national.txt`, "utf8").split(/\r?\n/).slice(1)) {
  const c = l.split("\t");
  if (c.length < 12) continue;
  const nome = c[3].trim().replace(/ (city and borough|city|town|village|CDP|borough|municipality)$/i, "");
  const k = `${c[0]}|${norm(nome)}`, terra = +c[6];
  if (!us.has(k) || us.get(k).terra < terra) us.set(k, { nome, lat: +c[10], lon: +c[11], terra });
}

const contagem = new Map(), semLugar = [];
for (const r of linhasCsv(fs.readFileSync("data/home-towns.csv", "utf8")).slice(1)) {
  const estado = r.at(-1).trim(), cidade = r.slice(0, -1).join(",").trim();
  const chave = `${estado}|${cidade.normalize("NFC")}`;
  let lugar = null;
  if (FIXOS[chave]) {
    const [pais, nome, lat, lon] = FIXOS[chave];
    lugar = { pais, nome, lat, lon };
  } else {
    const n = norm(APELIDOS[chave] ?? cidade);
    const b = UFS.has(estado) && br.get(`${estado}|${n}`), u = us.get(`${estado}|${n}`);
    if (b) lugar = { pais: "BR", ...b, nome: b.nome };
    else if (u) lugar = { pais: "US", ...u, nome: cidade.replace(/^Saint /, "St. ") };
  }
  if (!lugar) { semLugar.push(`${cidade}, ${estado}`); continue; }
  const k = `${lugar.pais}|${estado}|${lugar.nome}`;
  if (!contagem.has(k)) contagem.set(k, { cidade: lugar.nome, estado, pais: lugar.pais, lat: +lugar.lat.toFixed(3), lon: +lugar.lon.toFixed(3), n: 0 });
  contagem.get(k).n++;
}

const cidades = [...contagem.values()].sort((a, b) => b.n - a.n || a.cidade.localeCompare(b.cidade, "pt"));
fs.writeFileSync("data/cidades.json", JSON.stringify({ semLugar: semLugar.length, cidades }, null, 1) + "\n");
const soma = p => cidades.filter(c => c.pais === p).reduce((s, c) => s + c.n, 0);
console.log(`cidades.json: ${cidades.length} places, Brazil ${soma("BR")}, USA ${soma("US")}, not placed ${semLugar.length}`);
if (semLugar.length) console.log("Not placed:\n  " + semLugar.join("\n  "));
