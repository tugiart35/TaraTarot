#!/usr/bin/env node

/**
 * Fast WebP Conversion Script
 * Quickly converts all images to WebP format for better performance
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = 'public';
const OUTPUT_DIR = 'public-optimized';

async function ensureDirectory(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function convertToWebP(inputPath, outputPath) {
  try {
    // Get relative path for output
    const relativePath = path.relative(INPUT_DIR, inputPath);
    const outputFilePath = path.join(OUTPUT_DIR, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    // Ensure output directory exists
    await ensureDirectory(path.dirname(outputFilePath));
    
    // Convert to WebP with high quality
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 4 // Faster conversion
      })
      .toFile(outputFilePath);
    
    console.log(`✅ ${relativePath} → ${path.relative(OUTPUT_DIR, outputFilePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Starting fast WebP conversion...');
    
    // Find all image files
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    const imageFiles = [];
    
    async function findImages(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await findImages(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (imageExtensions.includes(ext)) {
            imageFiles.push(fullPath);
          }
        }
      }
    }
    
    await findImages(INPUT_DIR);
    
    console.log(`📊 Found ${imageFiles.length} images to convert`);
    
    // Convert images in parallel batches
    const batchSize = 10;
    let converted = 0;
    let failed = 0;
    
    for (let i = 0; i < imageFiles.length; i += batchSize) {
      const batch = imageFiles.slice(i, i + batchSize);
      const promises = batch.map(file => convertToWebP(file, ''));
      
      const results = await Promise.all(promises);
      converted += results.filter(r => r).length;
      failed += results.filter(r => !r).length;
      
      console.log(`📈 Progress: ${Math.min(i + batchSize, imageFiles.length)}/${imageFiles.length} (${converted} converted, ${failed} failed)`);
    }
    
    console.log('✅ Fast WebP conversion completed!');
    console.log(`📊 Results: ${converted} converted, ${failed} failed`);
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('🎯 Next step: Replace original images with WebP versions');
    
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { convertToWebP };
