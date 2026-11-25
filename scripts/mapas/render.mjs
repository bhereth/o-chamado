// Draws images/globo-{pt,en}.svg and images/mapa-rs-{pt,en}.svg.
// Usage (from this folder): npm install && npm run build
// Sources: IBGE municipal/state outlines (data/), Natural Earth land, borders and Lagoa Mirim (world-atlas, data/lagoas.geojson).
import fs from "node:fs";
import { geoOrthographic, geoMercator, geoPath, geoGraticule10, geoCentroid, geoArea } from "d3-geo";
import { feature, mesh } from "topojson-client";

const OUT = "../../images";
const rd = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

// d3-geo wants clockwise outer rings; a ring wound the other way covers the whole sphere, so flip those.
const rewind = (g) => {
  if (!g) return g;
  if (g.type === "FeatureCollection") g.features.forEach((f) => rewind(f.geometry));
  else if (g.type === "GeometryCollection") g.geometries.forEach(rewind);
  else if (g.type === "Feature") rewind(g.geometry);
  else if (g.type === "Polygon") { if (geoArea(g) > 2 * Math.PI) g.coordinates.forEach((r) => r.reverse()); }
  else if (g.type === "MultiPolygon") g.coordinates.forEach((c) => rewind({ type: "Polygon", coordinates: c }));
  return g;
};

const estado = rewind(rd("data/estado.geojson"));
const regioes = rewind(rd("data/regioes.geojson"));
const lagoas = rewind(rd("data/lagoas.geojson"));
const w110 = rd("node_modules/world-atlas/countries-110m.json");
const land110 = feature(w110, w110.objects.land);
const brasil = feature(w110, w110.objects.countries).features.find((f) => f.id === "076");
const w50 = rd("node_modules/world-atlas/countries-50m.json");
const land50 = feature(w50, w50.objects.land);
const fronteiras = mesh(w50, w50.objects.countries, (a, b) => a !== b);

export const CORES = {
  metro: "#e57a5e", vales: "#f2c879", serra: "#7fb89a", planalto: "#c3d88c",
  litoral: "#86c7e3", noroeste: "#c9a7d4", fora: "#ece6d6",
};

const TEXTO = {
  pt: {
    brasil: "Brasil",
    regioes: {
      noroeste: ["Noroeste", "e Missões"], planalto: ["Planalto e Campos", "de Cima da Serra"], serra: ["Serra", "Gaúcha"],
      vales: ["Vales do Sinos,", "Caí e Taquari"], metro: ["Porto Alegre e", "região metropolitana"], litoral: ["Litoral", "Norte"],
    },
    ate: "até jul/1998", fora: "outras missões",
    vizinhos: ["SANTA CATARINA", "ARGENTINA", "URUGUAI", "OCEANO ATLÂNTICO"],
    aria: "Mapa das sub-regiões da Missão Brasil Porto Alegre Norte",
    ariaGlobo: "Globo mostrando o Rio Grande do Sul, no sul do Brasil",
  },
  en: {
    brasil: "Brazil",
    regioes: {
      noroeste: ["Northwest", "& Missões"], planalto: ["Planalto & Campos", "de Cima da Serra"], serra: ["Serra", "Gaúcha"],
      vales: ["Sinos, Caí &", "Taquari valleys"], metro: ["Porto Alegre &", "metro area"], litoral: ["Northern", "coast"],
    },
    ate: "until Jul 1998", fora: "other missions",
    vizinhos: ["SANTA CATARINA", "ARGENTINA", "URUGUAY", "ATLANTIC OCEAN"],
    aria: "Map of the sub-regions of the Brazil Porto Alegre North Mission",
    ariaGlobo: "Globe showing Rio Grande do Sul, in southern Brazil",
  },
};

const ICONE = { noroeste: "⛪", planalto: "🌾", serra: "🍇", vales: "👞", metro: "🏙️", litoral: "🌊" };
// Map CSS classes are prefixed m- and scoped to .mapa-svg: an inlined SVG <style> applies to the whole page.
// Hand-tuned label anchors (lon/lat) so names sit clear of borders, cities and each other.
const ROTULO = {
  noroeste: [-53.75, -27.72], planalto: [-51.3, -28.05], serra: [-50.3, -29.12],
  vales: [-52.9, -29.55], metro: [-52.45, -30.52], litoral: [-49.25, -29.62],
};

function globo(lang) {
  const t = TEXTO[lang], id = (s) => `globo-${lang}-${s}`;
  const S = 360, R = 160;
  const proj = geoOrthographic().rotate([56, 18]).translate([S / 2, S / 2]).scale(R).clipAngle(90);
  const p = geoPath(proj).digits(1);
  const [cx, cy] = proj(geoCentroid(estado));
  const [bx, by] = proj([-52, -10]);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="${t.ariaGlobo}">
  <defs>
    <radialGradient id="${id("mar")}" cx="38%" cy="32%" r="75%">
      <stop offset="0" stop-color="#cfe8f1"/><stop offset="0.65" stop-color="#9ccbe0"/><stop offset="1" stop-color="#6fa9c6"/>
    </radialGradient>
    <radialGradient id="${id("brilho")}" cx="35%" cy="28%" r="60%">
      <stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="${S / 2 + 6}" cy="${S / 2 + 12}" rx="${R}" ry="${R}" fill="#15291f" opacity="0.12"/>
  <path d="${p({ type: "Sphere" })}" fill="url(#${id("mar")})"/>
  <path d="${p(geoGraticule10())}" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="0.6"/>
  <path d="${p(land110)}" fill="#f6efdf" stroke="#c9bfa6" stroke-width="0.7"/>
  <path d="${p(brasil)}" fill="#dfe9d6" stroke="#1b5e46" stroke-width="1"/>
  <path d="${p(estado)}" fill="#c0392b" stroke="#7a1f17" stroke-width="0.8"/>
  <circle cx="${cx}" cy="${cy}" r="17" fill="none" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="4 3"/>
  <path d="${p({ type: "Sphere" })}" fill="url(#${id("brilho")})"/>
  <path d="${p({ type: "Sphere" })}" fill="none" stroke="#1b5e46" stroke-width="2"/>
  <line x1="${cx - 12}" y1="${cy + 12}" x2="${cx - 40}" y2="${cy + 44}" stroke="#15291f" stroke-width="1.3"/>
  <rect x="${cx - 160}" y="${cy + 40}" width="126" height="24" rx="12" fill="#15291f"/>
  <text x="${cx - 97}" y="${cy + 56}" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-weight="700" font-size="11.5" fill="#fff">Rio Grande do Sul</text>
  <text x="${bx}" y="${by}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="600" font-size="15" fill="#1b5e46">${t.brasil}</text>
</svg>
`;
}

function mapa(lang) {
  const t = TEXTO[lang], id = (s) => `mapa-${lang}-${s}`;
  const W = 720, H = 640;
  // Clip to the frame so the world land and borders only contribute what is visible.
  const proj = geoMercator().fitExtent([[36, 40], [W - 36, H - 40]], estado).clipExtent([[-5, -5], [W + 5, H + 5]]);
  const p = geoPath(proj).digits(1);
  const P = (lon, lat) => proj([lon, lat]);

  const ordem = ["fora", "noroeste", "planalto", "vales", "serra", "litoral", "metro"];
  const feats = ordem.map((r) => regioes.features.find((f) => f.properties.regiao === r)).filter(Boolean);

  const cidades = [
    ["Porto Alegre", -51.23, -30.03, "estrela"], ["Caxias do Sul", -51.18, -29.17], ["Passo Fundo", -52.41, -28.26],
    ["Santo Ângelo", -54.26, -28.30], ["Osório", -50.27, -29.89], ["Novo Hamburgo", -51.13, -29.68],
    ["Vacaria", -50.93, -28.51], ["Erechim", -52.27, -27.63],
  ];
  const aDireita = new Set(["Osório", "Novo Hamburgo", "Erechim", "Porto Alegre"]);
  const estrela = (x, y, r) => {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1);
    }
    return d + "Z";
  };
  const lider = (de, para) => {
    const [a, b] = P(...de), [c, d] = P(...para);
    return `<path d="M${a} ${b} Q${(a + c) / 2} ${d - 10} ${c} ${d}" class="m-lider"/>`;
  };
  const rotulos = Object.entries(ROTULO).map(([r, [lon, lat]]) => {
    const [x, y] = P(lon, lat), nome = t.regioes[r];
    const linhas = nome.map((s, i) => `<tspan x="${x}" dy="${i ? 15 : 0}">${s}</tspan>`).join("");
    const extra = r === "noroeste" ? `<text x="${x}" y="${y + 15 * nome.length + 2}" text-anchor="middle" class="m-extra">${t.ate}</text>` : "";
    return `<text x="${x}" y="${y - 22}" text-anchor="middle" class="m-icone">${ICONE[r]}</text>
    <text x="${x}" y="${y}" text-anchor="middle" class="m-regiao">${linhas}</text>${extra}`;
  }).join("\n    ");
  const txt = (lon, lat, cls, s, rot) => {
    const [x, y] = P(lon, lat);
    return `<text x="${x}" y="${y}" text-anchor="middle" class="m-${cls}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${s}</text>`;
  };
  const [sc, ar, uy, oc] = t.vizinhos;

  return `<svg xmlns="http://www.w3.org/2000/svg" class="mapa-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t.aria}">
  <defs>
    <pattern id="${id("hachura")}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="9" height="9" fill="${CORES.noroeste}"/><line x1="0" y1="0" x2="0" y2="9" stroke="#fff" stroke-width="3" stroke-opacity="0.55"/>
    </pattern>
    <filter id="${id("sombra")}" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="5" dy="8" stdDeviation="0" flood-color="#15291f" flood-opacity="0.16"/></filter>
    <clipPath id="${id("moldura")}"><rect x="0" y="0" width="${W}" height="${H}" rx="20"/></clipPath>
    <clipPath id="${id("terra")}"><path clip-rule="evenodd" d="${p(land50)}"/></clipPath>
    <clipPath id="${id("rs")}"><path d="${p(estado)}"/></clipPath>
    <style>
      .mapa-svg .m-regiao { font: 700 13px Fraunces, Georgia, serif; fill: #15291f; paint-order: stroke; stroke: #fffaf0; stroke-width: 4px; stroke-linejoin: round; }
      .mapa-svg .m-extra { font: 700 9.5px Inter, "Segoe UI", sans-serif; fill: #8e2a1f; letter-spacing: .06em; text-transform: uppercase; paint-order: stroke; stroke: #fffaf0; stroke-width: 3px; }
      .mapa-svg .m-icone { font-size: 22px; }
      .mapa-svg .m-cidade { font: 600 10px Inter, "Segoe UI", sans-serif; fill: #15291f; paint-order: stroke; stroke: #fffaf0; stroke-width: 3px; stroke-linejoin: round; }
      .mapa-svg .m-fora { font: italic 600 13px Fraunces, Georgia, serif; fill: #8b8576; }
      .mapa-svg .m-vizinho { font: italic 600 12px Fraunces, Georgia, serif; fill: #9aa39a; letter-spacing: .18em; }
      .mapa-svg .m-agua { font: italic 600 11px Fraunces, Georgia, serif; fill: #3f7f9c; }
      .mapa-svg .m-lider { fill: none; stroke: #15291f; stroke-width: 1.2; stroke-dasharray: 3 3; }
    </style>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" rx="20" fill="#cfe7f1"/>
  <g clip-path="url(#${id("moldura")})">
    <path d="${p(land50)}" fill="#f3eee2" stroke="#c9c0aa" stroke-width="1"/>
    <path d="${p(fronteiras)}" fill="none" stroke="#b9b09a" stroke-width="1" stroke-dasharray="4 3"/>
  </g>
  <g filter="url(#${id("sombra")})" clip-path="url(#${id("terra")})">
    ${feats.map((f) => { const r = f.properties.regiao; return `<path d="${p(f)}" fill="${r === "noroeste" ? `url(#${id("hachura")})` : CORES[r]}" stroke="#fffaf0" stroke-width="2.5" stroke-linejoin="round"/>`; }).join("\n    ")}
  </g>
  <path d="${p(lagoas)}" fill="#bfe0ee" stroke="#1b5e46" stroke-width="1.5"/>
  <path d="${p(land50)}" fill="none" stroke="#1b5e46" stroke-width="1.5" clip-path="url(#${id("rs")})"/>
  <path d="${p(estado)}" fill="none" stroke="#1b5e46" stroke-width="4" stroke-linejoin="round"/>
  <g>
    ${cidades.map(([n, lon, lat, tipo]) => {
      const [x, y] = P(lon, lat);
      const marca = tipo === "estrela"
        ? `<path d="${estrela(x, y, 8)}" fill="#c0392b" stroke="#fffaf0" stroke-width="1.5"/>`
        : `<circle cx="${x}" cy="${y}" r="3.6" fill="#15291f" stroke="#fffaf0" stroke-width="1.4"/>`;
      const dx = aDireita.has(n) ? 9 : -7;
      return `${marca}<text x="${x + dx}" y="${y + 3.5}" text-anchor="${dx > 0 ? "start" : "end"}" class="m-cidade">${n}</text>`;
    }).join("\n    ")}
  </g>
  ${lider([-51.3, -30.05], [-52.2, -30.35])}
  ${lider([-50.15, -29.78], [-49.45, -29.62])}
  ${lider([-52.3, -29.5], [-52.7, -29.5])}
  <g>
    ${rotulos}
  </g>
  ${txt(-53.6, -31.0, "fora", t.fora)}
  ${txt(-51.05, -31.15, "agua", "Lagoa dos Patos", -52)}
  ${txt(-49.55, -27.55, "vizinho", sc)}
  ${txt(-56.4, -27.65, "vizinho", ar)}
  ${txt(-56.2, -32.6, "vizinho", uy)}
  ${txt(-49.9, -31.6, "vizinho", oc)}
</svg>
`;
}

for (const lang of ["pt", "en"]) {
  fs.writeFileSync(`${OUT}/globo-${lang}.svg`, globo(lang));
  fs.writeFileSync(`${OUT}/mapa-rs-${lang}.svg`, mapa(lang));
}
console.log("wrote images/globo-{pt,en}.svg and images/mapa-rs-{pt,en}.svg");
