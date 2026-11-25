// Draws images/pampa.svg (the landscape above the footer) and images/lacador.svg.
// Usage: node scripts/pampa.mjs
import fs from "node:fs";

const ink = "#15291f";

// Laçador (Porto Alegre's statue as it stands outside Salgado Filho airport): cloth on the head,
// loose shirt, fringed chiripá, coiled laço in hand, on a square pedestal. Boots at y=204, pedestal to y=291.
let franja = "";
for (let x = 33; x <= 87; x += 3) franja += `<rect x="${x}" y="166" width="1.6" height="7"/>`;
const lacador = `
  <ellipse cx="60" cy="18" rx="9" ry="11"/>
  <path d="M51 12 Q60 3 69 12 L70 17 L50 17 Z"/>
  <path d="M53 22 L47 36 L52 35 L56 26 Z"/>
  <rect x="55" y="27" width="10" height="10"/>
  <path d="M40 40 Q60 32 80 40 L86 47 L80 76 L82 100 L38 100 L40 76 L34 47 Z"/>
  <path d="M37 43 L29 47 L23 76 L18 110 L17 121 L22 129 L28 122 L28 109 L32 80 L36 62 Z"/>
  <ellipse cx="22" cy="125" rx="5" ry="7"/>
  <path d="M83 43 L91 47 L97 76 L100 110 L98 122 L91 122 L90 109 L88 80 L84 62 Z"/>
  <ellipse cx="95" cy="125" rx="5" ry="6.5"/>
  <g fill="none" stroke="${ink}" stroke-width="2.4">
    <ellipse cx="96" cy="150" rx="8" ry="25"/>
    <ellipse cx="99" cy="152" rx="7" ry="24"/>
    <ellipse cx="93" cy="151" rx="7" ry="23"/>
    <path d="M97 175 Q103 190 98 206"/>
  </g>
  <path d="M37 97 L83 97 L89 167 L31 167 Z"/>
  ${franja}
  <path d="M44 166 L55 166 L55 204 L40 204 Q40 199 45 197 Z"/>
  <path d="M65 166 L76 166 L77 197 Q81 199 81 204 L65 204 Z"/>
  <path d="M33 205 Q60 199 87 205 L91 213 L29 213 Z"/>
  <rect x="25" y="213" width="70" height="6"/>
  <rect x="29" y="219" width="62" height="62"/>
  <rect x="23" y="281" width="74" height="10"/>`;

// Araucária (Paraná pine): tall bare trunk, branches only at the top curving upward like a
// candelabra, tufts at the tips making a wide, flat-topped crown. Base at (0,0), about 140 tall.
const ladoAraucaria = `
    <g fill="none" stroke="${ink}" stroke-width="3.4" stroke-linecap="round">
      <path d="M0 -76 Q-16 -80 -27 -88"/>
      <path d="M0 -84 Q-26 -90 -40 -100 Q-46 -105 -47 -110"/>
      <path d="M0 -93 Q-34 -98 -52 -112 Q-59 -119 -60 -126"/>
      <path d="M0 -102 Q-22 -108 -33 -121 Q-36 -126 -36 -130"/>
      <path d="M0 -110 Q-11 -116 -17 -128 Q-18 -132 -18 -135"/>
    </g>
    <ellipse cx="-28" cy="-90" rx="11" ry="5"/>
    <ellipse cx="-46" cy="-111" rx="13" ry="6"/>
    <ellipse cx="-38" cy="-106" rx="8" ry="4"/>
    <ellipse cx="-58" cy="-127" rx="16" ry="7"/>
    <ellipse cx="-46" cy="-120" rx="9" ry="4.5"/>
    <ellipse cx="-35" cy="-131" rx="14" ry="6.5"/>
    <ellipse cx="-17" cy="-136" rx="12" ry="6"/>`;
const araucaria = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-4 0 L-2.4 -120 L2.4 -120 L4 0 Z"/>
    <path d="M0 -110 L0 -131" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>
    <ellipse cx="0" cy="-138" rx="13" ry="6"/>
    ${ladoAraucaria}
    <g transform="scale(-1 1)">${ladoAraucaria}</g>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230" preserveAspectRatio="xMidYMax slice">
  <circle cx="770" cy="128" r="64" fill="#e8b923" opacity="0.35"/>
  <path d="M0 230 L0 120 C200 88 300 98 480 112 S800 78 1000 98 S1300 66 1440 92 L1440 230 Z" fill="#1b5e46" opacity="0.35"/>
  <g fill="${ink}">
    <path d="M0 230 L0 150 C120 122 240 112 360 131 S600 172 760 142 S1000 94 1180 121 S1360 152 1440 136 L1440 230 Z"/>
    ${araucaria(1030, 101, 0.5)}
    ${araucaria(1102, 104, 0.68)}
    ${araucaria(1180, 122, 0.56)}
    <g>
      <rect x="560" y="132" width="4" height="34"/><rect x="620" y="137" width="4" height="34"/><rect x="680" y="138" width="4" height="34"/><rect x="740" y="132" width="4" height="34"/>
    </g>
    <path d="M560 142 Q590 146 622 147 T682 148 T744 142" stroke="${ink}" stroke-width="1.5" fill="none"/>
    <path d="M560 153 Q590 157 622 158 T682 159 T744 153" stroke="${ink}" stroke-width="1.5" fill="none"/>
    <path d="M232 124 C280 98 384 96 428 152 L428 230 L232 230 Z"/>
    <g transform="translate(307 0) scale(0.38)">${lacador}
    </g>
  </g>
</svg>
`;
fs.writeFileSync("images/pampa.svg", svg);
fs.writeFileSync("images/lacador.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 292"><g fill="${ink}">${lacador}</g></svg>\n`);
fs.writeFileSync("images/araucaria.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -145 150 150"><g fill="${ink}">${araucaria(0, 0, 1)}</g></svg>\n`);
console.log("wrote images/pampa.svg, images/lacador.svg, images/araucaria.svg");
