const fs = require('fs');
const path = require('path');

// Sharp kütüphanesini dinamik olarak yükle
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('Sharp kütüphanesi bulunamadı. Yüklemek için: npm install sharp');
  process.exit(1);
}

// JPG/JPEG dosyalarını WebP'ye dönüştür
async function convertToWebP() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imageFiles = [];
  
  // Tüm JPG/JPEG dosyalarını bul
  function findImageFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findImageFiles(filePath);
      } else if (file.match(/\.(jpg|jpeg)$/i)) {
        imageFiles.push(filePath);
      }
    });
  }
  
  findImageFiles(publicDir);
  
  console.log(`Bulunan ${imageFiles.length} JPG/JPEG dosyası:`);
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (const filePath of imageFiles) {
    try {
      // Orijinal dosya boyutu
      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;
      
      // WebP dosya yolu
      const webpPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp');
      
      // WebP dönüşümü (85% kalite)
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      
      // WebP dosya boyutu
      const webpStats = fs.statSync(webpPath);
      const webpSize = webpStats.size;
      totalWebPSize += webpSize;
      
      const savings = originalSize - webpSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${path.relative(publicDir, filePath)}: ${(originalSize/1024).toFixed(1)}KB → ${(webpSize/1024).toFixed(1)}KB (${savingsPercent}% tasarruf)`);
      
    } catch (error) {
      console.error(`✗ ${path.relative(publicDir, filePath)} dönüştürülemedi:`, error.message);
    }
  }
  
  const totalSavings = totalOriginalSize - totalWebPSize;
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
  
  console.log('\n=== DÖNÜŞÜM ÖZETİ ===');
  console.log(`Toplam orijinal boyut: ${(totalOriginalSize/1024/1024).toFixed(2)} MB`);
  console.log(`Toplam WebP boyut: ${(totalWebPSize/1024/1024).toFixed(2)} MB`);
  console.log(`Toplam tasarruf: ${(totalSavings/1024/1024).toFixed(2)} MB (${totalSavingsPercent}%)`);
  
  // Bundle size etkisini hesapla
  const bundleSizeReduction = (totalSavings / 1024 / 1024).toFixed(2);
  console.log(`\nBundle size azalması: ~${bundleSizeReduction} MB`);
  console.log(`Yeni tahmini bundle size: ${(1.69 - parseFloat(bundleSizeReduction)).toFixed(2)} MB`);
}

// Script çalıştır
convertToWebP().catch(console.error);
