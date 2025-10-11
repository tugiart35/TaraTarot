#!/bin/bash
# Marriage position dosyalarına 'use client' direktifi ekler

echo "========================================================================"
echo "🔧 MARRIAGE POSITION DOSYALARINA 'use client' EKLENİYOR"
echo "========================================================================"

cd /Users/tugi/Desktop/TaraTarot

POSITION_FILES=(
  "src/features/tarot/lib/marriage/position-1-sonuc-ne-olacak.ts"
  "src/features/tarot/lib/marriage/position-2-esimi-beklerken-benim-ne-yapmam-gerekiyor.ts"
  "src/features/tarot/lib/marriage/position-3-mali-kaynaklarimizi-birbirimizle-paylasacakmiyiz.ts"
  "src/features/tarot/lib/marriage/position-4-her-ikimizde-baglanmak-isteyecekmiyiz.ts"
  "src/features/tarot/lib/marriage/position-5-benzer-yanlarimiz-olacak-mi.ts"
  "src/features/tarot/lib/marriage/position-6-bu-kisinin-ailesi-beni-kabul-edecek-mi.ts"
  "src/features/tarot/lib/marriage/position-7-birbirimizi-nasil-bulacagiz.ts"
  "src/features/tarot/lib/marriage/position-8-anlasabilecek-miyim.ts"
  "src/features/tarot/lib/marriage/position-9-benim-icin-nasil-bir-es-uygundur.ts"
  "src/features/tarot/lib/marriage/position-10-evlenebilecek-miyim.ts"
)

for file in "${POSITION_FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ Dosya bulunamadı: $file"
    continue
  fi
  
  # 'use client' zaten var mı kontrol et
  if grep -q "^'use client';" "$file"; then
    echo "⏭️  Zaten var: $(basename $file)"
    continue
  fi
  
  # Dosyanın ilk satırına 'use client' ekle
  echo "'use client';
" | cat - "$file" > temp && mv temp "$file"
  
  echo "✅ Eklendi: $(basename $file)"
done

echo ""
echo "========================================================================"
echo "✅ TÜM DOSYALARA 'use client' EKLENDİ!"
echo "========================================================================"

