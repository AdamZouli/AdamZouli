import { Resvg } from "@resvg/resvg-js";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "assets");

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".svg")) continue;
  const svg = readFileSync(join(dir, file), "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1280 },
    background: "#1C1915",
  });
  const png = resvg.render().asPng();
  const out = file.replace(/\.svg$/, ".png");
  writeFileSync(join(dir, out), png);
  console.log(out, png.length);
}
