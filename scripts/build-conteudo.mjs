// Builds data/fotos.json from data/fotos.csv, and data/historias.json from the files in historias/.
// Runs before every `quarto render` (see pre-render in _quarto.yml), so adding a photo or a story
// only needs the file plus one line (or one text file) — no code.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRegistry, parseTags, indexPhotos } from "./photo-tags.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (f) => path.join(root, f);
const avisos = [];

// ---------- Photos ----------

// Sections a photo can belong to: [anchor, PT name, EN name].
const SECOES = {
  inicio: ["#", "Início da página", "Top of the page"],
  missao: ["#missao", "Missão", "Mission"],
  areas: ["#areas", "Áreas", "Areas"],
  missionarios: ["#missionarios", "Missionários", "Missionaries"],
  templo: ["#templo", "Templo", "Temple"],
  jornais: ["#jornal", "Jornais", "Newsletters"],
  fotos: ["#fotos", "Fotos", "Photos"],
  historias: ["#historias", "Histórias", "Stories"],
  reencontros: ["#reencontros", "Reencontros", "Reunions"],
  woodwards: ["#woodwards", "Os Woodward", "The Woodwards"],
  contato: ["#contato", "Contato", "Contact"],
};
const MES_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const MES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// CSV reader: comma or semicolon (Excel in Portuguese saves with ";"), quoted fields, UTF-8 with or without BOM.
function lerCsv(texto) {
  texto = texto.replace(/^﻿/, "");
  const primeira = texto.split(/\r?\n/, 1)[0];
  const sep = (primeira.match(/;/g) || []).length > (primeira.match(/,/g) || []).length ? ";" : ",";
  const linhas = [];
  let campo = "", linha = [], aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') aspas = false;
      else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === sep) { linha.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      linha.push(campo); campo = "";
      if (linha.some((x) => x.trim() !== "")) linhas.push(linha);
      linha = [];
    } else campo += c;
  }
  linha.push(campo);
  if (linha.some((x) => x.trim() !== "")) linhas.push(linha);
  const cab = linhas.shift().map((h) => h.trim().toLowerCase());
  return linhas.map((l, n) => ({ ...Object.fromEntries(cab.map((h, i) => [h, (l[i] ?? "").trim()])), __linha: n + 2 }));
}

// "Élder Hereth" → "do Élder…" / "Elder Hereth"; "Síster X" → "da Síster…".
const artigo = (nome) => /^(síster|sister|irmã|presidente? woodward e)/i.test(nome) ? "da" : /^(élder|elder|presidente|irmão|bispo|o )/i.test(nome) ? "do" : "de";
const emIngles = (nome) => nome.replace(/^Élder\b/, "Elder").replace(/^Síster\b/, "Sister").replace(/^Presidente\b/, "President");

const fotos = [];
const tagRegistry = createRegistry(JSON.parse(fs.readFileSync(p("data/quadro.json"), "utf8")));
const tagErrors = [];
for (const r of lerCsv(fs.readFileSync(p("data/fotos.csv"), "utf8"))) {
  const onde = `data/fotos.csv, linha ${r.__linha}`;
  if (!r.arquivo) { avisos.push(`${onde}: falta o nome do arquivo.`); continue; }
  const arq = r.arquivo.replace(/^\/?images\//, "");
  if (!fs.existsSync(p("images/" + arq))) { avisos.push(`${onde}: arquivo images/${arq} não encontrado.`); continue; }
  const secao = (r.secao || "fotos").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (!SECOES[secao]) { avisos.push(`${onde}: seção "${r.secao}" não existe (use: ${Object.keys(SECOES).join(", ")}).`); continue; }
  let mes = null;
  if (r.mes) {
    const m = r.mes.match(/^(\d{4})-(\d{1,2})$/) || r.mes.match(/^(\d{1,2})\/(\d{4})$/);
    if (!m) avisos.push(`${onde}: mês "${r.mes}" não reconhecido (use 1999-08).`);
    else mes = m[1].length === 4 ? `${m[1]}-${m[2].padStart(2, "0")}` : `${m[2]}-${m[1].padStart(2, "0")}`;
  }
  const quem = r.cortesia || "";
  // With a licence: "Foto: author, licence". With only a link (a published source): "Foto: source".
  // Otherwise the photo was shared by someone: "Foto: cortesia do/da …".
  const credito = r.licenca
    ? [`Foto: ${quem}, ${r.licenca}`, `Photo: ${emIngles(quem)}, ${r.licenca}`]
    : quem && r.link ? [`Foto: ${quem}`, `Photo: ${emIngles(quem)}`]
    : quem ? [`Foto: cortesia ${artigo(quem)} ${quem}`, `Photo courtesy of ${emIngles(quem)}`] : ["", ""];
  const [y, mm] = mes ? mes.split("-").map(Number) : [];
  const ondeSite = mes
    ? ["#missionarios", `Chegadas e saídas, ${MES_PT[mm - 1]} de ${y}`, `Arrivals and departures, ${MES_EN[mm - 1]} ${y}`]
    : SECOES[secao];
  const naSecao = !/^(n|não|nao|no)$/i.test(r.na_secao || "sim");
  const parsedTags = parseTags(r.tags, tagRegistry);
  tagErrors.push(...parsedTags.errors.map(e => `${onde}: ${e}`));
  fotos.push({
    src: "images/" + arq,
    pt: r.legenda_pt || r.legenda_en || "",
    en: r.legenda_en || r.legenda_pt || "",
    credito, link: r.link || null, onde: ondeSite, secao, naSecao, mes, tags: parsedTags.tags,
  });
}
const csvField = value => `"${String(value).replace(/"/g, '""')}"`;
fs.writeFileSync(p("data/photo-tag-reference.csv"), "tag,label,context\n" + tagRegistry.map(e => [e.type + ":" + e.id, e.label, e.contexts.join(" / ")].map(csvField).join(",")).join("\n") + "\n");
if (tagErrors.length) throw new Error("Photo tags must be corrected before rendering:\n" + tagErrors.join("\n"));
fs.writeFileSync(p("data/fotos.json"), JSON.stringify({ geradoDe: "data/fotos.csv (não edite este arquivo; edite a planilha)", fotos, porTag: indexPhotos(fotos) }, null, 1) + "\n");

// ---------- Stories ----------

// historias/*.md: a few "campo: valor" lines between --- and ---, then the story text.
// Files whose name starts with "_" (like the template) are skipped.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
const historias = [];
const dirH = p("historias");
if (fs.existsSync(dirH)) {
  for (const nome of fs.readdirSync(dirH).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort()) {
    const txt = fs.readFileSync(path.join(dirH, nome), "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
    const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) { avisos.push(`historias/${nome}: falta o cabeçalho entre --- e ---.`); continue; }
    const campos = Object.fromEntries(m[1].split("\n").map((l) => l.match(/^\s*([\wçãéí]+)\s*:\s*(.*)$/)).filter(Boolean).map((x) => [x[1].toLowerCase(), x[2].trim().replace(/^["']|["']$/g, "")]));
    if (!campos.titulo) { avisos.push(`historias/${nome}: falta "titulo".`); continue; }
    const paragrafos = m[2].trim().split(/\n\s*\n/).map((par) => inline(par.replace(/\n/g, " ").trim())).filter(Boolean);
    historias.push({ arquivo: nome, titulo: campos.titulo, autor: campos.autor || "", ano: campos.ano || "", area: campos.area || "", idioma: campos.idioma || "pt", paragrafos });
  }
}
historias.sort((a, b) => String(a.ano).localeCompare(String(b.ano)) || a.titulo.localeCompare(b.titulo, "pt"));
fs.writeFileSync(p("data/historias.json"), JSON.stringify({ geradoDe: "historias/*.md (não edite este arquivo)", historias }, null, 1) + "\n");

console.log(`[build-conteudo] ${fotos.length} fotos, ${historias.length} histórias${avisos.length ? `, ${avisos.length} aviso(s):` : "."}`);
for (const a of avisos) console.log("  ⚠ " + a);
