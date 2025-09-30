#!/bin/bash

# Dosya Koruma Scripti
# Bu script belirtilen dosyaları koruma altına alır

echo "🛡️  Dosya Koruma Scripti Başlatılıyor..."

# Proje dizinine git
cd "/Volumes/XPG_1/Busbuskimki-tarot kopyası"

# Korunacak dosyaları sadece okuma izni ver
echo "📁 Korunacak dosyalar için izinler ayarlanıyor..."

# Hook dosyası
if [ -f "src/hooks/useReadingDetail.ts" ]; then
    chmod 444 "src/hooks/useReadingDetail.ts"
    echo "✅ useReadingDetail.ts korundu"
fi

# Modal dosyası
if [ -f "src/features/shared/ui/ReadingDetailModal.tsx" ]; then
    chmod 444 "src/features/shared/ui/ReadingDetailModal.tsx"
    echo "✅ ReadingDetailModal.tsx korundu"
fi

# lib klasörü
if [ -d "src/lib" ]; then
    find src/lib -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# features/tarot klasörü
if [ -d "src/features/tarot" ]; then
    find src/features/tarot -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# lib/tarotspread klasörü
if [ -d "src/lib/tarotspread" ]; then
    find src/lib/tarotspread -type f | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# numeroloji klasörü
if [ -d "src/app/[locale]/(main)/numeroloji" ]; then
    find src/app/[locale]/(main)/numeroloji -type f | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# Mevcut korumalı dosyalar
echo "📋 Mevcut korumalı dosyalar kontrol ediliyor..."

# Çeviri dosyaları
for file in "messages/tr.json" "messages/en.json" "messages/sr.json" "messages/tr.backup.json"; do
    if [ -f "$file" ]; then
        chmod 444 "$file"
        echo "✅ $file korundu"
    fi
done

# Layout ve sayfa dosyaları
for file in "src/app/[locale]/layout.tsx" "src/app/[locale]/(main)/tarotokumasi/page.tsx"; do
    if [ -f "$file" ]; then
        chmod 444 "$file"
        echo "✅ $file korundu"
    fi
done

# Rehber dosyası
if [ -f "TAROT-ACILIMLARI-REHBERI.md" ]; then
    chmod 444 "TAROT-ACILIMLARI-REHBERI.md"
    echo "✅ TAROT-ACILIMLARI-REHBERI.md korundu"
fi

# Migrasyon dosyaları
if [ -d "migrations" ]; then
    find migrations -name "*.sql" | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# Functions klasörü
if [ -d "functions" ]; then
    find functions -type f | while read file; do
        chmod 444 "$file"
        echo "✅ $file korundu"
    done
fi

# Public klasörleri
for dir in "public/cards" "public/Spread"; do
    if [ -d "$dir" ]; then
        find "$dir" -type f | while read file; do
            chmod 444 "$file"
            echo "✅ $file korundu"
        done
    fi
done

echo ""
echo "🎉 Tüm dosyalar başarıyla koruma altına alındı!"
echo "📝 Bu dosyalar artık sadece okunabilir (read-only) modda"
echo ""
echo "⚠️  UYARI: Bu dosyaları değiştirmek için önce izinleri geri almanız gerekir:"
echo "   chmod 644 dosya_adi"
echo ""
