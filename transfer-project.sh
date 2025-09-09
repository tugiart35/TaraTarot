#!/bin/bash

# Tarot Projesi Transfer Scripti
# Bu script projeyi başka bir Next.js projesine transfer eder

set -e

# Renkli çıktı için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔮 Tarot Projesi Transfer Scripti${NC}"
echo "=================================="

# Hedef proje yolunu al
if [ -z "$1" ]; then
    echo -e "${YELLOW}Kullanım: ./transfer-project.sh <hedef-proje-yolu>${NC}"
    echo "Örnek: ./transfer-project.sh /path/to/new-project"
    exit 1
fi

TARGET_PATH="$1"
SOURCE_PATH="/Volumes/XPG_1/Busbuskimki-tarot kopyası"

# Hedef klasörün var olup olmadığını kontrol et
if [ ! -d "$TARGET_PATH" ]; then
    echo -e "${RED}❌ Hedef klasör bulunamadı: $TARGET_PATH${NC}"
    exit 1
fi

# Hedef projede package.json var mı kontrol et
if [ ! -f "$TARGET_PATH/package.json" ]; then
    echo -e "${RED}❌ Hedef klasörde package.json bulunamadı. Bu bir Next.js projesi değil!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Hedef proje bulundu: $TARGET_PATH${NC}"

# Yedek oluştur
echo -e "${YELLOW}📦 Yedek oluşturuluyor...${NC}"
BACKUP_DIR="$TARGET_PATH/backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Mevcut dosyaları yedekle
if [ -d "$TARGET_PATH/src" ]; then
    cp -r "$TARGET_PATH/src" "$BACKUP_DIR/"
    echo -e "${GREEN}✅ src/ klasörü yedeklendi${NC}"
fi

if [ -d "$TARGET_PATH/public" ]; then
    cp -r "$TARGET_PATH/public" "$BACKUP_DIR/"
    echo -e "${GREEN}✅ public/ klasörü yedeklendi${NC}"
fi

# Tarot projesi dosyalarını kopyala
echo -e "${YELLOW}🔄 Tarot projesi dosyaları kopyalanıyor...${NC}"

# Ana klasörleri kopyala
cp -r "$SOURCE_PATH/src" "$TARGET_PATH/"
echo -e "${GREEN}✅ src/ klasörü kopyalandı${NC}"

cp -r "$SOURCE_PATH/public" "$TARGET_PATH/"
echo -e "${GREEN}✅ public/ klasörü kopyalandı${NC}"

# Konfigürasyon dosyalarını kopyala
cp "$SOURCE_PATH/tailwind.config.ts" "$TARGET_PATH/"
echo -e "${GREEN}✅ tailwind.config.ts kopyalandı${NC}"

cp "$SOURCE_PATH/next.config.js" "$TARGET_PATH/"
echo -e "${GREEN}✅ next.config.js kopyalandı${NC}"

cp "$SOURCE_PATH/tsconfig.json" "$TARGET_PATH/"
echo -e "${GREEN}✅ tsconfig.json kopyalandı${NC}"

cp "$SOURCE_PATH/postcss.config.js" "$TARGET_PATH/"
echo -e "${GREEN}✅ postcss.config.js kopyalandı${NC}"

# package.json'u birleştir
echo -e "${YELLOW}📋 package.json birleştiriliyor...${NC}"
node -e "
const fs = require('fs');
const sourcePkg = JSON.parse(fs.readFileSync('$SOURCE_PATH/package.json', 'utf8'));
const targetPkg = JSON.parse(fs.readFileSync('$TARGET_PATH/package.json', 'utf8'));

// Tarot projesi bağımlılıklarını ekle
const newDeps = {...targetPkg.dependencies, ...sourcePkg.dependencies};
const newDevDeps = {...targetPkg.devDependencies, ...sourcePkg.devDependencies};

// Scripts'i birleştir
const newScripts = {...targetPkg.scripts, ...sourcePkg.scripts};

const mergedPkg = {
    ...targetPkg,
    dependencies: newDeps,
    devDependencies: newDevDeps,
    scripts: newScripts
};

fs.writeFileSync('$TARGET_PATH/package.json', JSON.stringify(mergedPkg, null, 2));
console.log('✅ package.json başarıyla birleştirildi');
"

# Bağımlılıkları yükle
echo -e "${YELLOW}📦 Bağımlılıklar yükleniyor...${NC}"
cd "$TARGET_PATH"
npm install

echo -e "${GREEN}🎉 Transfer tamamlandı!${NC}"
echo -e "${BLUE}📁 Yedek klasörü: $BACKUP_DIR${NC}"
echo -e "${YELLOW}💡 Sonraki adımlar:${NC}"
echo "   1. npm run dev ile projeyi test edin"
echo "   2. Gerekirse environment variables'ları ayarlayın"
echo "   3. Veritabanı bağlantılarını kontrol edin"
echo ""
echo -e "${GREEN}✨ Tarot uygulamanız hazır!${NC}"
