const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const largeImages = [
  {
    input: 'public/images/bg-3card-tarot.jpg',
    output: 'public/images/bg-3card-tarot.webp',
    width: 1920,
    quality: 80
  },
  {
    input: 'public/images/bg-love-tarot.jpg', 
    output: 'public/images/bg-love-tarot.webp',
    width: 1920,
    quality: 80
  }
];

async function optimizeImage(config) {
  try {
    // Check if input exists
    await fs.access(config.input);
    
    // Get original size
    const originalStats = await fs.stat(config.input);
    const originalSizeKB = Math.round(originalStats.size / 1024);
    
    // Convert to WebP
    await sharp(config.input)
      .resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: config.quality })
      .toFile(config.output);
    
    // Get optimized size
    const optimizedStats = await fs.stat(config.output);
    const optimizedSizeKB = Math.round(optimizedStats.size / 1024);
    
    const savings = Math.round(((originalSizeKB - optimizedSizeKB) / originalSizeKB) * 100);
    
    console.log(`✅ ${path.basename(config.input)}: ${originalSizeKB}KB → ${optimizedSizeKB}KB (${savings}% savings)`);
    
    return {
      input: config.input,
      output: config.output,
      originalSize: originalSizeKB,
      optimizedSize: optimizedSizeKB,
      savings: savings
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${config.input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Optimizing large images...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const image of largeImages) {
    const result = await optimizeImage(image);
    if (result) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    }
  }
  
  const totalSavings = Math.round(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100);
  
  console.log('\n📊 SUMMARY:');
  console.log(`   Original total: ${totalOriginalSize}KB`);
  console.log(`   Optimized total: ${totalOptimizedSize}KB`);
  console.log(`   Total savings: ${totalSavings}%`);
  console.log('\n🎯 Next step: Update image references in code to use .webp files');
}

main().catch(console.error);
