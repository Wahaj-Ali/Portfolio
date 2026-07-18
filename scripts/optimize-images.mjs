import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

async function optimizeHero() {
  const src = path.join(root, "public/assets/bg-hero.webp");
  if (!fs.existsSync(src)) {
    console.log("Skip hero: public/assets/bg-hero.webp not found");
    return;
  }

  const before = fs.statSync(src).size;
  const buffer = await sharp(src)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toBuffer();

  fs.writeFileSync(src, buffer);
  console.log(`Hero: ${Math.round(before / 1024)}KB → ${Math.round(buffer.length / 1024)}KB`);
}

optimizeHero().catch((error) => {
  console.error(error);
  process.exit(1);
});
