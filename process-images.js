const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = 'public/images';
const accessoryFiles = ['research-accessory-1.avif', 'research-accessory-2.avif'];

// Dark teal background similar to product images - RGB values for #1a3d3a
const darkBg = { r: 26, g: 61, b: 58 };

async function processImage(filename) {
  const inputPath = path.join(imgDir, filename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`  File not found: ${filename}`);
    return;
  }

  console.log(`Processing ${filename}...`);
  
  try {
    // Read input image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original size: ${metadata.width}x${metadata.height}`);
    
    // Create dark background image
    const background = await sharp({
      create: {
        width: metadata.width,
        height: metadata.height,
        channels: 3,
        background: darkBg
      }
    }).toBuffer();
    
    // Composite: original image over dark background
    const outputName = filename.replace('.avif', '.png');
    const outputPath = path.join(imgDir, outputName);
    
    await sharp(inputPath)
      .composite([
        { 
          input: background, 
          blend: 'dest-over'
        }
      ])
      .png()
      .toFile(outputPath);
    
    console.log(`  Saved as ${outputName}`);
  } catch (err) {
    console.error(`  Error processing ${filename}:`, err.message);
  }
}

async function main() {
  for (const file of accessoryFiles) {
    await processImage(file);
  }
  console.log('\nAccessory images recreated with dark background style!');
}

main();
