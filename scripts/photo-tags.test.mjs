import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { areaKey, createRegistry, parseTags, indexPhotos } from "./photo-tags.mjs";

const board = JSON.parse(fs.readFileSync(new URL("../data/quadro.json", import.meta.url), "utf8"));
const registry = createRegistry(board);
test("builder keys match the site's area lookup for every recorded assignment", () => {
  const source = fs.readFileSync(new URL("../index.qmd", import.meta.url), "utf8");
  const expression = name => source.split("\n").find(l => l.startsWith(name + " = ")).slice(name.length + 3);
  const context = vm.createContext({});
  vm.runInContext(`const norm = ${expression("norm")}; const semLetra = ${expression("semLetra")};`, context);
  const body = source.split("chaveArea = (nome, zona) => {")[1].split("\n}\n")[0];
  const runtimeKey = vm.runInContext(`(nome, zona) => {${body}}`, context);
  for (const s of board.snapshots) for (const z of s.zonas) for (const a of z.areas) if (a.nome && !z.especial) {
    assert.equal(areaKey(a.nome, z.nome), runtimeKey(a.nome, z.nome));
  }
});
test("area identity follows zone changes and preserves the two Rio Brancos", () => {
  assert.equal(areaKey("Vacaria B", "Vacaria"), areaKey("Vacaria", "Caxias do Sul"));
  assert.notEqual(areaKey("Rio Branco", "Porto Alegre"), areaKey("Rio Branco", "Caxias do Sul"));
  assert.match(parseTags("area:Rio Branco", registry).errors[0], /Ambiguous/);
  assert.equal(parseTags("area:rio branco|poa", registry).errors.length, 0);
});
test("typed tags normalize labels, deduplicate and retain extensible types", () => {
  const result = parseTags("zone:Caxias do Sul;zona:caxias do sul;area:Marau;event:Christmas 1997", registry);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.tags, [{ type: "zone", id: "caxias do sul" }, { type: "area", id: "marau" }, { type: "event", id: "Christmas 1997" }]);
  assert.deepEqual(parseTags("", registry), { tags: [], errors: [] });
});
test("unrecognized and ambiguous people never silently link", () => {
  assert.equal(parseTags("missionary:e-hereth-1997-10", registry).tags[0].id, "e-hereth-1997-10");
  const duplicates = createRegistry({ snapshots: [], missionarios: [
    { id: "one", titulo: "Elder", plaqueta: "Smith" }, { id: "two", titulo: "Elder", plaqueta: "Smith" }
  ] });
  assert.match(parseTags("missionary:Elder Smith", duplicates).errors[0], /Ambiguous/);
  assert.equal(parseTags("missionary:one", duplicates).errors.length, 0);
  for (const value of ["area:Never existed", "missionary:missing", "area:", "no colon"]) assert.equal(parseTags(value, registry).errors.length, 1);
});
test("one photo can appear in multiple galleries, never twice in one", () => {
  const tags = parseTags("area:gramado;zone:caxias do sul;event:reunion", registry).tags;
  const photos = [{ src: "images/example.jpg", tags }, { src: "images/example.jpg", tags }, { src: "images/untagged.jpg", tags: [] }];
  const index = indexPhotos(photos);
  assert.deepEqual(index.area.gramado, ["images/example.jpg"]);
  assert.deepEqual(index.zone["caxias do sul"], index.area.gramado);
  assert.deepEqual(index.event.reunion, index.area.gramado);
});
