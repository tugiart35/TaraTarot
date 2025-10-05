const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// WebP dönüşümü için gerekli paketleri kontrol et
function checkDependencies() {
  try {
    execSync('which cwebp', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.log('cwebp bulunamadı. Yüklemek için: brew install webp');
    return false;
  }
}

// JPG/JPEG dosyalarını WebP'ye dönüştür
function convertToWebP() {
  if (!checkDependencies()) {
    console.log('WebP dönüşümü için cwebp gerekli. Lütfen yükleyin: brew install webp');
    return;
  }

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
  
  imageFiles.forEach(filePath => {
    try {
      // Orijinal dosya boyutu
      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;
      
      // WebP dosya yolu
      const webpPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp');
      
      // WebP dönüşümü
      execSync(`cwebp -q 85 "${filePath}" -o "${webpPath}"`, { stdio: 'pipe' });
      
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
  });
  
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
convertToWebP();
