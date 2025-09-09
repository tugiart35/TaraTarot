#!/bin/bash

echo "🚀 Admin Dashboard Kurulumu Başlatılıyor..."

# Dosyaları kopyala
echo "📁 Dosyalar kopyalanıyor..."
mkdir -p src/app/admin
mkdir -p src/components/admin
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/lib/constants

cp -r src/app/admin/* ../../src/app/admin/
cp -r src/components/admin/* ../../src/components/admin/
cp -r src/lib/* ../../src/lib/
cp -r src/hooks/* ../../src/hooks/
cp -r src/lib/constants/* ../../src/lib/constants/

# NPM paketlerini yükle
echo "📦 NPM paketleri yükleniyor..."
cd ../../
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs lucide-react recharts framer-motion react-icons

echo "✅ Kurulum tamamlandı!"
echo "📝 Sonraki adımlar:"
echo "1. .env.local dosyasında Supabase ayarlarını yapın"
echo "2. Supabase'de database-setup.sql dosyasını çalıştırın"
echo "3. Admin kullanıcısını admins tablosuna ekleyin"
echo "4. Projeyi test edin"
