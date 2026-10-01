// Guards the committed data the site renders from, so a hand edit or a bad sync fails CI
// instead of shipping a broken page.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { trimRepo } from "../lib/repos.mjs";
import { problems } from "./sync-resume.mjs";

const read = (f) => JSON.parse(readFileSync(new URL(`../${f}`, import.meta.url), "utf8"));
const resume = read("content/resume.json");
const github = read("content/github.json");

test("committed résumé passes the sync's own sanity check", () => {
  assert.deepEqual(problems(resume), []);
  assert.match(resume.updated, /^\d{4}-\d{2}-\d{2}$/);
});

test("résumé project ids are unique and every project has a link", () => {
  const ids = resume.projects.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate ids: ${ids}`);
  for (const p of resume.projects) assert.ok(p.links.length > 0, `${p.id} has no links`);
});

test("résumé links are absolute https URLs", () => {
  for (const [name, url] of Object.entries(resume.links)) assert.match(url, /^https:\/\//, name);
});

test("GitHub snapshot has the same shape as the live feed", () => {
  assert.ok(Array.isArray(github) && github.length > 0);
  const keys = Object.keys(trimRepo({})).sort();
  for (const r of github) assert.deepEqual(Object.keys(r).sort(), keys, r.name);
});

test("résumé PDF is a real PDF", () => {
  const pdf = readFileSync(new URL("../public/resume.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});
