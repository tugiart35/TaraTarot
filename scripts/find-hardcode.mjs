#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

console.log('🔍 Hardcode String Bulucu Başlatılıyor...\n');

let totalFiles = 0;
let totalStrings = 0;

function scanDirectory(dirPath) {
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'dist', 'build', '__tests__'].includes(item)) {
        scanDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = extname(item);
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
        if (!item.includes('.test.') && !item.includes('.spec.')) {
          scanFile(fullPath);
        }
      }
    }
  }
}

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    totalFiles++;
    
    // JSX içinde Türkçe metinler
    const jsxMatches = content.match(/>([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{2,})</g);
    
    if (jsxMatches && jsxMatches.length > 0) {
      console.log(`📄 ${filePath}:`);
      
      for (const match of jsxMatches.slice(0, 5)) {
        const text = match.replace(/[><]/g, '');
        
        // Basit filtreleme
        if (text.length > 2 && 
            !text.includes('className') && 
            !text.includes('id') && 
            !text.includes('http') &&
            !text.includes('@') &&
            !/^\d+$/.test(text) &&
            !text.includes('t(') &&
            !text.includes('useTranslations')) {
          
          console.log(`   "${text}"`);
          totalStrings++;
        }
      }
      
      if (jsxMatches.length > 5) {
        console.log(`   ... ve ${jsxMatches.length - 5} tane daha`);
      }
      console.log('');
    }
  } catch (error) {
    // Dosya okuma hatası
  }
}

// Sadece src/app dizinini tara
scanDirectory('src/app');

console.log(`\n📊 Sonuçlar:`);
console.log(`   📁 Kontrol edilen dosya sayısı: ${totalFiles}`);
console.log(`   🔤 Bulunan hardcode string sayısı: ${totalStrings}`);

if (totalStrings > 0) {
  console.log('\n💡 Bu stringleri i18n sistemine taşımanız önerilir!');
} else {
  console.log('\n✅ Hardcode string bulunamadı!');
}
