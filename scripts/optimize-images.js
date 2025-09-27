#!/usr/bin/env node

/**
 * Image optimization script
 * Kart resimlerini WebP formatına dönüştürür ve optimize eder
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CARDS_DIR = path.join(__dirname, '../public/cards');
const OUTPUT_DIR = path.join(__dirname, '../public/cards-optimized');

// WebP quality settings
const QUALITY_SETTINGS = {
  high: 85,
  medium: 75,
  low: 60,
};

// Image sizes for different use cases
const IMAGE_SIZES = {
  thumbnail: { width: 100, height: 150 },
  preview: { width: 200, height: 300 },
  detail: { width: 400, height: 600 },
  print: { width: 800, height: 1200 },
};

async function optimizeImage(inputPath, outputDir, filename) {
  const baseName = path.parse(filename).name;
  
  try {
    // WebP formatında optimize et
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: QUALITY_SETTINGS.medium })
      .toFile(webpPath);
    
    console.log(`✓ Optimized: ${filename} -> ${baseName}.webp`);
    
    // Farklı boyutlarda versiyonlar oluştur
    for (const [sizeName, dimensions] of Object.entries(IMAGE_SIZES)) {
      const sizePath = path.join(outputDir, `${baseName}-${sizeName}.webp`);
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: QUALITY_SETTINGS.medium })
        .toFile(sizePath);
      
      console.log(`✓ Created ${sizeName} version: ${baseName}-${sizeName}.webp`);
    }
    
    return true;
  } catch (error) {
    console.error(`✗ Failed to optimize ${filename}:`, error.message);
    return false;
  }
}

async function optimizeAllImages() {
  console.log('🔄 Starting image optimization...');
  
  // Output directory oluştur
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // RWS klasörü oluştur
  const rwsOutputDir = path.join(OUTPUT_DIR, 'rws');
  if (!fs.existsSync(rwsOutputDir)) {
    fs.mkdirSync(rwsOutputDir, { recursive: true });
  }
  
  let processedCount = 0;
  let successCount = 0;
  
  // Ana kart resimlerini işle
  const cardBackPath = path.join(CARDS_DIR, 'CardBack.jpg');
  if (fs.existsSync(cardBackPath)) {
    processedCount++;
    const success = await optimizeImage(cardBackPath, OUTPUT_DIR, 'CardBack.jpg');
    if (success) successCount++;
  }
  
  // RWS kartlarını işle
  const rwsDir = path.join(CARDS_DIR, 'rws');
  if (fs.existsSync(rwsDir)) {
    const files = fs.readdirSync(rwsDir).filter(file => 
      file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );
    
    for (const file of files) {
      const filePath = path.join(rwsDir, file);
      processedCount++;
      const success = await optimizeImage(filePath, rwsOutputDir, file);
      if (success) successCount++;
    }
  }
  
  console.log(`\n📊 Optimization complete!`);
  console.log(`   Processed: ${processedCount} images`);
  console.log(`   Successful: ${successCount} images`);
  console.log(`   Failed: ${processedCount - successCount} images`);
  console.log(`   Output directory: ${OUTPUT_DIR}`);
  
  // Boyut karşılaştırması
  const originalSize = getDirectorySize(CARDS_DIR);
  const optimizedSize = getDirectorySize(OUTPUT_DIR);
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  console.log(`\n💾 Size comparison:`);
  console.log(`   Original: ${formatBytes(originalSize)}`);
  console.log(`   Optimized: ${formatBytes(optimizedSize)}`);
  console.log(`   Savings: ${savings}%`);
}

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function calculateSize(itemPath) {
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(itemPath);
      files.forEach(file => {
        calculateSize(path.join(itemPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }
  
  if (fs.existsSync(dirPath)) {
    calculateSize(dirPath);
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Script'i çalıştır
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeAllImages };
