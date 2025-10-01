#!/usr/bin/env node

/**
 * Advanced Image Optimization Script
 * Optimizes images for web with multiple formats and sizes
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = 'public/cards';
const OUTPUT_DIR = 'public/cards-optimized';

// Image optimization settings
const QUALITY_SETTINGS = {
  high: { quality: 90, format: 'webp' },
  medium: { quality: 85, format: 'webp' },
  low: { quality: 80, format: 'webp' },
  avif: { quality: 85, format: 'avif' },
  jpeg: { quality: 90, format: 'jpeg' }
};

const SIZE_PRESETS = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
  xlarge: { width: 1920, height: 1920 }
};

// Tarot card specific sizes
const TAROT_CARD_SIZES = {
  thumbnail: { width: 100, height: 167 },
  preview: { width: 200, height: 333 },
  detail: { width: 300, height: 500 },
  print: { width: 600, height: 1000 }
};

async function ensureDirectory(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, filename) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`Optimizing ${filename} (${metadata.width}x${metadata.height})`);
  
  const optimizations = [];
  
  // Generate different formats and qualities
  for (const [qualityName, qualityConfig] of Object.entries(QUALITY_SETTINGS)) {
    const outputPath = path.join(outputDir, `${qualityName}`, filename.replace(/\.[^/.]+$/, `.${qualityConfig.format}`));
    await ensureDirectory(path.dirname(outputPath));
    
    let pipeline = image.clone()
      .resize(metadata.width, metadata.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .quality(qualityConfig.quality);
    
    if (qualityConfig.format === 'webp') {
      pipeline = pipeline.webp({ quality: qualityConfig.quality });
    } else if (qualityConfig.format === 'avif') {
      pipeline = pipeline.avif({ quality: qualityConfig.quality });
    } else if (qualityConfig.format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: qualityConfig.quality, progressive: true });
    }
    
    optimizations.push(pipeline.toFile(outputPath));
  }
  
  // Generate different sizes for tarot cards
  if (filename.includes('card') || filename.includes('tarot')) {
    for (const [sizeName, sizeConfig] of Object.entries(TAROT_CARD_SIZES)) {
      const outputPath = path.join(outputDir, 'sizes', sizeName, filename.replace(/\.[^/.]+$/, '.webp'));
      await ensureDirectory(path.dirname(outputPath));
      
      optimizations.push(
        image.clone()
          .resize(sizeConfig.width, sizeConfig.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 85 })
          .toFile(outputPath)
      );
    }
  }
  
  // Generate responsive sizes
  for (const [sizeName, sizeConfig] of Object.entries(SIZE_PRESETS)) {
    const outputPath = path.join(outputDir, 'responsive', sizeName, filename.replace(/\.[^/.]+$/, '.webp'));
    await ensureDirectory(path.dirname(outputPath));
    
    optimizations.push(
      image.clone()
        .resize(sizeConfig.width, sizeConfig.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath)
    );
  }
  
  await Promise.all(optimizations);
}

async function generateImageManifest() {
  const manifest = {
    generated: new Date().toISOString(),
    formats: QUALITY_SETTINGS,
    sizes: SIZE_PRESETS,
    tarotCardSizes: TAROT_CARD_SIZES,
    images: {}
  };
  
  try {
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      manifest.images[file] = {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size,
        hasAlpha: metadata.hasAlpha,
        optimized: true
      };
    }
    
    const manifestPath = path.join(OUTPUT_DIR, 'image-manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`✅ Image manifest generated: ${manifestPath}`);
  } catch (error) {
    console.error('Error generating manifest:', error);
  }
}

async function main() {
  try {
    console.log('🚀 Starting advanced image optimization...');
    
    // Ensure output directory exists
    await ensureDirectory(OUTPUT_DIR);
    
    // Read input directory
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    console.log(`📁 Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      await optimizeImage(inputPath, OUTPUT_DIR, file);
    }
    
    // Generate manifest
    await generateImageManifest();
    
    console.log('✅ Advanced image optimization completed!');
    console.log(`📊 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('📋 Generated formats: WebP, AVIF, JPEG');
    console.log('📐 Generated sizes: Thumbnail, Small, Medium, Large, XLarge');
    console.log('🃏 Tarot card specific sizes: Thumbnail, Preview, Detail, Print');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, generateImageManifest };
