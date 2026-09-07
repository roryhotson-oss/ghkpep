import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '..', 'public', 'images');
const outputDir = path.join(inputDir, 'standardized-v2');
const outputWidth = 1408;
const outputHeight = 768;
const background = { r: 218, g: 220, b: 222 };
const imageExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const checkerTileSize = 16;

async function removeCheckerboard(inputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const checkerDark = [160, 160, 157];
  const checkerLight = [250, 250, 248];
  const grey = [218, 220, 222];

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const lightTile = (Math.floor(x / checkerTileSize) + Math.floor(y / checkerTileSize)) % 2 === 1;
      const expected = lightTile ? checkerLight : checkerDark;
      const distance = Math.sqrt(
        (red - expected[0]) ** 2 +
        (green - expected[1]) ** 2 +
        (blue - expected[2]) ** 2
      );

      if (distance < 72) {
        data[offset] = grey[0];
        data[offset + 1] = grey[1];
        data[offset + 2] = grey[2];
      }
    }
  }

  return sharp(data, { raw: info }).png().toBuffer();
}

async function standardizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const extension = path.extname(filename).slice(1).toLowerCase();
  const stem = path.basename(filename, path.extname(filename));
  const outputPath = path.join(outputDir, `${stem}--${extension}.jpg`);
  const source = filename === 'bronchogen.jpeg'
    ? await removeCheckerboard(inputPath)
    : inputPath;

  await sharp(source)
    .resize(outputWidth, outputHeight, {
      fit: 'contain',
      background,
    })
    .flatten({ background })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const filenames = fs.readdirSync(inputDir)
    .filter((filename) => imageExtensions.has(path.extname(filename).toLowerCase()))
    .sort();

  for (const filename of filenames) {
    try {
      const outputPath = await standardizeImage(filename);
      console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
    } catch (error) {
      console.error(`Failed ${filename}: ${error.message}`);
      process.exitCode = 1;
    }
  }

  console.log(`Standardized ${filenames.length} images at ${outputWidth}x${outputHeight}.`);
}

main();