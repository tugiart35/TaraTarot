#!/usr/bin/env node

/**
 * Package.json Birleştirme Scripti
 * Tarot projesi bağımlılıklarını hedef projeye güvenli şekilde ekler
 */

const fs = require('fs');
const path = require('path');

// Renkli çıktı için
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function mergePackageJson(sourcePath, targetPath) {
    try {
        // Dosyaları oku
        const sourcePkg = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        const targetPkg = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

        log('📦 Package.json dosyaları okundu', 'blue');

        // Bağımlılıkları birleştir
        const mergedDeps = { ...targetPkg.dependencies, ...sourcePkg.dependencies };
        const mergedDevDeps = { ...targetPkg.devDependencies, ...sourcePkg.devDependencies };

        // Scripts'i birleştir (hedef proje öncelikli)
        const mergedScripts = { ...sourcePkg.scripts, ...targetPkg.scripts };

        // Yeni package.json oluştur
        const mergedPkg = {
            ...targetPkg, // Hedef proje temel bilgileri korunur
            dependencies: mergedDeps,
            devDependencies: mergedDevDeps,
            scripts: mergedScripts,
        };

        // Yedek oluştur
        const backupPath = `${targetPath}.backup.${Date.now()}`;
        fs.copyFileSync(targetPath, backupPath);
        log(`💾 Yedek oluşturuldu: ${backupPath}`, 'yellow');

        // Yeni package.json'u yaz
        fs.writeFileSync(targetPath, JSON.stringify(mergedPkg, null, 2));
        log('✅ Package.json başarıyla birleştirildi', 'green');

        // Eklenen bağımlılıkları listele
        const newDeps = Object.keys(sourcePkg.dependencies || {});
        const newDevDeps = Object.keys(sourcePkg.devDependencies || {});

        if (newDeps.length > 0) {
            log('\n📋 Eklenen bağımlılıklar:', 'blue');
            newDeps.forEach(dep => {
                log(`  • ${dep}@${sourcePkg.dependencies[dep]}`, 'green');
            });
        }

        if (newDevDeps.length > 0) {
            log('\n🛠️  Eklenen dev bağımlılıkları:', 'blue');
            newDevDeps.forEach(dep => {
                log(`  • ${dep}@${sourcePkg.devDependencies[dep]}`, 'green');
            });
        }

        log('\n🎉 Birleştirme tamamlandı!', 'green');
        log('💡 Sonraki adım: npm install', 'yellow');

    } catch (error) {
        log(`❌ Hata: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Komut satırı argümanlarını kontrol et
if (process.argv.length !== 4) {
    log('Kullanım: node package-merge.js <kaynak-package.json> <hedef-package.json>', 'red');
    log('Örnek: node package-merge.js ./package.json /path/to/target/package.json', 'yellow');
    process.exit(1);
}

const sourcePath = process.argv[2];
const targetPath = process.argv[3];

// Dosya varlığını kontrol et
if (!fs.existsSync(sourcePath)) {
    log(`❌ Kaynak dosya bulunamadı: ${sourcePath}`, 'red');
    process.exit(1);
}

if (!fs.existsSync(targetPath)) {
    log(`❌ Hedef dosya bulunamadı: ${targetPath}`, 'red');
    process.exit(1);
}

// Birleştirmeyi başlat
mergePackageJson(sourcePath, targetPath);
