import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'public', 'images', 'CJC‑1295 with DAC.jpeg');
const outputPath = path.join(__dirname, '..', 'public', 'images', 'standardized-v2', 'bronchogen-standard.jpg');

const label = Buffer.from(`
  <svg width="760" height="250" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="744" height="234" rx="18" fill="#f7f7f5" stroke="#263344" stroke-width="5"/>
    <text x="380" y="86" text-anchor="middle" font-family="Arial, sans-serif" font-size="62" font-weight="700" fill="#263344">Product: Bronchogen</text>
    <text x="380" y="145" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#34414a">RESEARCH COMPOUND</text>
    <text x="380" y="190" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#34414a">FOR LABORATORY USE ONLY</text>
  </svg>
`);

async function main() {
  await sharp(inputPath)
    .modulate({ hue: -85, saturation: 0.95, brightness: 1.02 })
    .resize(1408, 768, { fit: 'cover', position: 'centre' })
    .composite([{ input: label, left: 324, top: 420 }])
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(outputPath);

  console.log(`Created ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});