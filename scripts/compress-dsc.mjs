import sharp from "sharp";
import { readdirSync, renameSync } from "fs";
import { join, extname, basename } from "path";

const dir = "public/images/gallery";

for (const file of readdirSync(dir)) {
  if (!file.startsWith("DSC")) continue;
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg"].includes(ext)) continue;

  const src = join(dir, file);
  const tmp = join(dir, "_tmp_" + file);

  const { size: before } = (await import("fs")).statSync(src);
  await sharp(src).jpeg({ quality: 82, mozjpeg: true }).toFile(tmp);
  const { size: after } = (await import("fs")).statSync(tmp);

  renameSync(tmp, src);
  const saved = Math.round((1 - after / before) * 100);
  console.log(`✓ ${file}  ${(before/1e6).toFixed(1)}MB → ${(after/1e6).toFixed(1)}MB  (-${saved}%)`);
}
