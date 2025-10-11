#!/usr/bin/env node
/**
 * 🚀 SMART EXTRACTION - TÜM SPREAD'LER & TÜM POZISYONLAR
 * - lib/ klasöründeki tüm spread'leri otomatik tespit et
 * - Her spread'deki tüm position-X-*.ts dosyalarını bul
 * - TR metinleri çıkar ve messages/tr.json'a ekle
 * - GÜVENLI: Duplicate önleme + Field validation + Backup
 * - DRY-RUN: Önce ne yapacağını göster
 */

const fs = require('fs');
const path = require('path');

// Renk kodları
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function validateField(field, fieldName, cardKey, spreadName, positionNum) {
  /**
   * Field validasyonu:
   * - Boş olmamalı
   * - En az 10 karakter olmalı (anlamlı metin)
   * - JavaScript kodu içermemeli
   */
  const issues = [];
  
  if (!field || field.trim().length === 0) {
    issues.push(`${fieldName} boş`);
  } else if (field.length < 10) {
    issues.push(`${fieldName} çok kısa (${field.length} karakter)`);
  }
  
  // JavaScript kodu kontrolü (embedded code)
  const codePatterns = [
    /reversed:\s*['"`]/i,
    /keywords:\s*\[/i,
    /context:\s*['"`]/i,
    /upright:\s*['"`]/i
  ];
  
  for (const pattern of codePatterns) {
    if (pattern.test(field)) {
      issues.push(`${fieldName} JavaScript kodu içeriyor`);
      break;
    }
  }
  
  return issues;
}

function validateKeywords(keywords, cardKey, spreadName, positionNum) {
  const issues = [];
  
  if (!Array.isArray(keywords)) {
    issues.push('keywords array değil');
  } else if (keywords.length === 0) {
    issues.push('keywords boş');
  } else if (keywords.length < 3) {
    issues.push(`keywords çok az (${keywords.length} adet)`);
  }
  
  // Her keyword kontrol et
  for (const kw of keywords) {
    if (typeof kw !== 'string' || kw.length === 0) {
      issues.push('geçersiz keyword');
      break;
    }
  }
  
  return issues;
}

function discoverSpreadPositions() {
  log('\n🔍 Spread\'ler ve position dosyaları tespit ediliyor...', 'blue');
  
  const libPath = path.join(__dirname, '../src/features/tarot/lib');
  const spreads = [];
  
  // lib/ klasöründeki tüm klasörleri oku
  const entries = fs.readdirSync(libPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const spreadName = entry.name;
    
    // Shared klasörünü atla
    if (spreadName === 'shared') continue;
    
    const spreadPath = path.join(libPath, spreadName);
    
    // position-X-*.ts dosyalarını bul
    const files = fs.readdirSync(spreadPath);
    const positionFiles = files.filter(f => f.match(/^position-\d+.*\.ts$/));
    
    if (positionFiles.length > 0) {
      spreads.push({
        name: spreadName,
        path: spreadPath,
        positionFiles: positionFiles.map(f => {
          const posMatch = f.match(/position-(\d+)/);
          return {
            file: f,
            number: posMatch ? parseInt(posMatch[1]) : null,
            fullPath: path.join(spreadPath, f)
          };
        }).filter(p => p.number !== null)
      });
    }
  }
  
  return spreads;
}

function extractPositionMeanings(filePath, spreadName, positionNum) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Array adını bul
  const arrayNamePattern = `position${positionNum}Meanings`;
  
  // Array'i bul - daha esnek regex
  const regex = new RegExp(`export const ${arrayNamePattern}[^=]*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const arrayMatch = fileContent.match(regex);
  
  if (!arrayMatch) {
    return { success: false, error: 'Array bulunamadı', cards: 0, validationIssues: [] };
  }
  
  const arrayContent = arrayMatch[1];
  
  // Her bir kart objesini parse et
  const cardObjects = [];
  let currentObject = '';
  let braceCount = 0;
  let inObject = false;
  
  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    
    if (char === '{') {
      if (braceCount === 0) {
        inObject = true;
        currentObject = '{';
      } else {
        currentObject += char;
      }
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      currentObject += char;
      
      if (braceCount === 0 && inObject) {
        cardObjects.push(currentObject);
        currentObject = '';
        inObject = false;
      }
    } else if (inObject) {
      currentObject += char;
    }
  }
  
  if (cardObjects.length === 0) {
    return { success: false, error: 'Kart objesi bulunamadı', cards: 0, validationIssues: [] };
  }
  
  // Her kart için i18n yapısını oluştur
  const meanings = {};
  const validationIssues = [];
  let successCount = 0;
  
  cardObjects.forEach((objStr, index) => {
    try {
      // Kart adını çıkar
      const cardMatch = objStr.match(/card:\s*['"]([^'"]+)['"]/);
      if (!cardMatch) {
        validationIssues.push(`Kart ${index + 1}: card name bulunamadı`);
        return;
      }
      
      const cardName = cardMatch[1];
      
      // cardKey oluştur (normalized)
      const cardKey = cardName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
      
      // ⚠️ GELİŞTİRİLMİŞ REGEX - Lookahead assertion ile field'ları DOĞRU çıkar
      // Upright: Son tırnak işaretine kadar al, sonraki field'ın başlangıcına bakmadan
      const uprightMatch = objStr.match(/upright:\s*['"`]([\s\S]*?)['"`]\s*,\s*(?=reversed:)/);
      const upright = uprightMatch ? uprightMatch[1].trim() : '';
      
      // Reversed: Son tırnak işaretine kadar al
      const reversedMatch = objStr.match(/reversed:\s*['"`]([\s\S]*?)['"`]\s*,\s*(?=keywords:)/);
      const reversed = reversedMatch ? reversedMatch[1].trim() : '';
      
      // Context: Son tırnak işaretine kadar al
      const contextMatch = objStr.match(/context:\s*['"`]([\s\S]*?)['"`]\s*,?\s*(?=group:|$)/);
      const context = contextMatch ? contextMatch[1].trim() : '';
      
      // Keywords: Array'i çıkar
      const keywordsMatch = objStr.match(/keywords:\s*\[([\s\S]*?)\]\s*,\s*(?=context:)/);
      let keywords = [];
      if (keywordsMatch) {
        const keywordsStr = keywordsMatch[1];
        keywords = keywordsStr
          .split(',')
          .map(k => k.trim().replace(/^['"`]|['"`]$/g, ''))
          .filter(k => k.length > 0);
      }
      
      // ✅ VALIDATION
      const uprightIssues = validateField(upright, 'upright', cardKey, spreadName, positionNum);
      const reversedIssues = validateField(reversed, 'reversed', cardKey, spreadName, positionNum);
      const contextIssues = validateField(context, 'context', cardKey, spreadName, positionNum);
      const keywordsIssues = validateKeywords(keywords, cardKey, spreadName, positionNum);
      
      const allIssues = [...uprightIssues, ...reversedIssues, ...contextIssues, ...keywordsIssues];
      
      if (allIssues.length > 0) {
        validationIssues.push(`${cardName} (${cardKey}): ${allIssues.join(', ')}`);
        // Kritik hata değilse devam et
        if (uprightIssues.length > 0 && upright.length < 5) {
          return; // Çok kötü, atla
        }
      }
      
      if (!meanings[cardKey]) {
        meanings[cardKey] = {};
      }
      
      meanings[cardKey][`position${positionNum}`] = {
        upright,
        reversed,
        keywords,
        context
      };
      
      successCount++;
      
    } catch (error) {
      validationIssues.push(`Kart ${index + 1}: Parse hatası - ${error.message}`);
    }
  });
  
  return { 
    success: true, 
    meanings, 
    cards: successCount,
    validationIssues,
    totalObjects: cardObjects.length
  };
}

function checkIfAlreadyExtracted(trData, spreadName, positionNum) {
  try {
    if (!trData[spreadName] || !trData[spreadName].meanings) {
      return { extracted: false, count: 0, complete: false };
    }
    
    const meanings = trData[spreadName].meanings;
    let count = 0;
    
    for (const cardData of Object.values(meanings)) {
      if (cardData[`position${positionNum}`]) {
        count++;
      }
    }
    
    // 78 kart varsa extraction tamamlanmış sayılır
    const complete = count >= 78;
    
    return { extracted: complete, count, complete };
  } catch (error) {
    return { extracted: false, count: 0, complete: false };
  }
}

function createBackup(trJsonPath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = trJsonPath.replace('.json', `.backup-${timestamp}.json`);
  
  try {
    fs.copyFileSync(trJsonPath, backupPath);
    log(`💾 Backup oluşturuldu: ${path.basename(backupPath)}`, 'green');
    return backupPath;
  } catch (error) {
    log(`⚠️  Backup oluşturulamadı: ${error.message}`, 'yellow');
    return null;
  }
}

function main() {
  log('='.repeat(80), 'bright');
  log('🚀 SMART EXTRACTION - TÜM SPREAD\'LER & POZİSYONLAR', 'bright');
  log('='.repeat(80), 'bright');
  
  // Spread'leri keşfet
  const spreads = discoverSpreadPositions();
  
  if (spreads.length === 0) {
    log('\n❌ Hiç spread bulunamadı!', 'red');
    process.exit(1);
  }
  
  log(`\n✅ ${spreads.length} spread bulundu:`, 'green');
  spreads.forEach(s => {
    log(`  • ${s.name}: ${s.positionFiles.length} position`, 'blue');
  });
  
  // Toplam position sayısı
  const totalPositions = spreads.reduce((sum, s) => sum + s.positionFiles.length, 0);
  log(`\n📍 Toplam: ${totalPositions} position dosyası`, 'magenta');
  
  // TR.json'u oku
  const trJsonPath = path.join(__dirname, '../messages/tr.json');
  let trData = {};
  let trJsonExists = false;
  
  try {
    trData = JSON.parse(fs.readFileSync(trJsonPath, 'utf-8'));
    trJsonExists = true;
    log('\n📖 Mevcut tr.json okundu', 'green');
  } catch (error) {
    log('\n⚠️  Mevcut tr.json bulunamadı, yeni oluşturulacak', 'yellow');
  }
  
  // Hangi position'lar eksik kontrol et
  const toExtract = [];
  const alreadyExtracted = [];
  const partiallyExtracted = [];
  
  for (const spread of spreads) {
    for (const posFile of spread.positionFiles) {
      const check = checkIfAlreadyExtracted(trData, spread.name, posFile.number);
      
      if (check.complete) {
        alreadyExtracted.push({
          spread: spread.name,
          position: posFile.number,
          count: check.count
        });
      } else if (check.count > 0 && check.count < 78) {
        partiallyExtracted.push({
          spread: spread.name,
          position: posFile.number,
          count: check.count,
          file: posFile.file,
          path: posFile.fullPath
        });
      } else {
        toExtract.push({
          spread: spread.name,
          position: posFile.number,
          file: posFile.file,
          path: posFile.fullPath,
          existingCount: check.count
        });
      }
    }
  }
  
  log('\n📊 DURUM ANALİZİ:', 'blue');
  log('='.repeat(80));
  
  if (alreadyExtracted.length > 0) {
    log(`\n✅ Tamamlanmış: ${alreadyExtracted.length} position`, 'green');
    for (const item of alreadyExtracted.slice(0, 3)) {
      log(`  • ${item.spread}/position${item.position}: ${item.count} kart ✓`, 'green');
    }
    if (alreadyExtracted.length > 3) {
      log(`  ... ve ${alreadyExtracted.length - 3} position daha`, 'green');
    }
  }
  
  if (partiallyExtracted.length > 0) {
    log(`\n⚠️  Kısmi: ${partiallyExtracted.length} position (eksik kartlar var)`, 'yellow');
    for (const item of partiallyExtracted) {
      log(`  • ${item.spread}/position${item.position}: ${item.count}/78 kart`, 'yellow');
    }
    
    // Kısmi olanları tekrar çıkar
    toExtract.push(...partiallyExtracted);
  }
  
  if (toExtract.length > 0) {
    log(`\n📦 Çıkarılacak: ${toExtract.length} position`, 'magenta');
    for (const item of toExtract) {
      const status = item.existingCount > 0 ? `(${item.existingCount}/78 mevcut)` : '(yok)';
      log(`  • ${item.spread}/position${item.position}: ${status}`, 'magenta');
    }
  } else {
    log('\n✅ TÜM POSITION\'LAR ZATEN TAMAMLANMIŞ!', 'green');
    log('='.repeat(80));
    process.exit(0);
  }
  
  log('\n' + '='.repeat(80));
  log(`📦 ${toExtract.length} position çıkarılacak`, 'bright');
  log(`🔒 Duplicate önleme: AKTIF`, 'green');
  log(`✅ Field validation: AKTIF`, 'green');
  log(`💾 Backup: ${trJsonExists ? 'Oluşturulacak' : 'Gerekli değil'}`, 'blue');
  
  // Kullanıcı onayı
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('\n🚀 Extraction başlasın mı? (y/N): ', (answer) => {
    readline.close();
    
    if (answer.toLowerCase() !== 'y') {
      log('\n❌ İptal edildi', 'yellow');
      process.exit(0);
    }
    
    // Backup oluştur
    if (trJsonExists) {
      createBackup(trJsonPath);
    }
    
    // Extraction işlemi
    log('\n🃏 EXTRACTION BAŞLIYOR...', 'blue');
    log('='.repeat(80));
    
    let successCount = 0;
    let failedCount = 0;
    let totalCards = 0;
    const allValidationIssues = [];
    
    for (let i = 0; i < toExtract.length; i++) {
      const item = toExtract[i];
      const current = i + 1;
      
      process.stdout.write(`\r[${current}/${toExtract.length}] ${item.spread}/position${item.position}...`);
      
      const result = extractPositionMeanings(item.path, item.spread, item.position);
      
      if (result.success) {
        // TR.json'a merge et
        if (!trData[item.spread]) {
          trData[item.spread] = {};
        }
        if (!trData[item.spread].meanings) {
          trData[item.spread].meanings = {};
        }
        
        // ⚠️ DUPLICATE ÖNLEME: Sadece eksik kartları ekle
        let addedCount = 0;
        for (const [cardKey, cardData] of Object.entries(result.meanings)) {
          if (!trData[item.spread].meanings[cardKey]) {
            trData[item.spread].meanings[cardKey] = {};
          }
          
          // Pozisyon zaten varsa atla
          const posKey = `position${item.position}`;
          if (!trData[item.spread].meanings[cardKey][posKey]) {
            trData[item.spread].meanings[cardKey][posKey] = cardData[posKey];
            addedCount++;
          }
        }
        
        successCount++;
        totalCards += addedCount;
        
        log(`\r[${current}/${toExtract.length}] ${item.spread}/position${item.position}: ✅ ${addedCount}/${result.totalObjects} kart`, 'green');
        
        // Validation uyarıları
        if (result.validationIssues.length > 0) {
          allValidationIssues.push({
            spread: item.spread,
            position: item.position,
            issues: result.validationIssues
          });
        }
      } else {
        failedCount++;
        log(`\r[${current}/${toExtract.length}] ${item.spread}/position${item.position}: ❌ ${result.error}`, 'red');
      }
    }
    
    // TR.json'u kaydet
    if (successCount > 0) {
      log('\n💾 messages/tr.json kaydediliyor...', 'blue');
      fs.writeFileSync(trJsonPath, JSON.stringify(trData, null, 2), 'utf-8');
      log('✅ Kaydedildi!', 'green');
    }
    
    // Validation uyarıları göster
    if (allValidationIssues.length > 0) {
      log('\n⚠️  VALIDATION UYARILARI:', 'yellow');
      log('='.repeat(80));
      for (const item of allValidationIssues.slice(0, 3)) {
        log(`\n${item.spread}/position${item.position}:`, 'yellow');
        for (const issue of item.issues.slice(0, 3)) {
          log(`  • ${issue}`, 'yellow');
        }
        if (item.issues.length > 3) {
          log(`  ... ve ${item.issues.length - 3} uyarı daha`, 'yellow');
        }
      }
      if (allValidationIssues.length > 3) {
        log(`\n... ve ${allValidationIssues.length - 3} position daha uyarı içeriyor`, 'yellow');
      }
    }
    
    // Özet
    log('\n' + '='.repeat(80), 'bright');
    log('✅ EXTRACTION TAMAMLANDI!', 'bright');
    log('='.repeat(80), 'bright');
    log(`\n📊 SONUÇLAR:`, 'blue');
    log(`  ✅ Başarılı: ${successCount}/${toExtract.length} position`);
    log(`  ❌ Başarısız: ${failedCount}/${toExtract.length} position`);
    log(`  🃏 Eklenen kart: ${totalCards}`);
    log(`  ⚠️  Validation uyarısı: ${allValidationIssues.length} position`);
    log(`\n📁 Dosya: messages/tr.json`);
    log('='.repeat(80));
    
    if (failedCount > 0) {
      log('\n⚠️  Bazı position\'lar başarısız oldu. Dosya yapısını kontrol edin.', 'yellow');
    }
    
    if (allValidationIssues.length > 0) {
      log('⚠️  Bazı kartlarda validation uyarıları var. Kontrol edilmeli.', 'yellow');
    }
  });
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    log(`\n❌ Hata: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}
