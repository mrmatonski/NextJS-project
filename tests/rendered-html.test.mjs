import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the Atelier dashboard with Vercel-native Next.js output", async () => {
  await access(new URL("../.next/BUILD_ID", import.meta.url));

  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Good afternoon, Michael/);
  assert.match(page, /Priority projects/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(layout, /Atelier — Creative Studio Command Center/);
  assert.match(layout, /openGraph/);
});

test("ships responsive and accessible product styling", async () => {
  const [page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-label="Search workspace"/);
  assert.match(page, /menuOpen|setView/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(packageJson, /"build": "next build"/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|cloudflare/);
});
