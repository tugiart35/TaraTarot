#!/bin/bash
# Career Spread için 7 pozisyonun script'lerini otomatik oluşturur

echo "🔮 CAREER SPREAD SCRIPT GENERATOR"
echo "========================================================================"

# Career spread position bilgileri
declare -a POSITIONS=(
  "1:gercekten-istedigim-kariyer-bumu"
  "2:kariyer-gelistirmek-icin-hangi-adımlar-atabilirim"
  "3:kariyerimde-degisteremedigigim-taraflar"
  "4:kariyerimde-elimden-gelenin-en-iyisi-yapıyormuyum"
  "5:kariyerimde-yardimci-olacak-ne-gibi-degisikler"
  "6:gecmisimdeki-hangi-engeller"
  "7:sonuc-ne-olacak"
)

for pos_info in "${POSITIONS[@]}"; do
  IFS=':' read -r POS_NUM FILE_SUFFIX <<< "$pos_info"
  
  echo ""
  echo "📝 Position-${POS_NUM}: ${FILE_SUFFIX}"
  
  # Extraction script oluştur
  EXTRACT_FILE="scripts/extract-career-position${POS_NUM}-tr.js"
  cp scripts/TEMPLATE-extract-position-tr.js "$EXTRACT_FILE"
  
  # Özelleştir
  sed -i '' "s/const SPREAD_NAME = 'love'/const SPREAD_NAME = 'career'/" "$EXTRACT_FILE"
  sed -i '' "s/const POSITION_NUMBER = 2/const POSITION_NUMBER = ${POS_NUM}/" "$EXTRACT_FILE"
  sed -i '' "s/const FILE_NAME = 'position-2-fiziksel.ts'/const FILE_NAME = 'position-${POS_NUM}-${FILE_SUFFIX}.ts'/" "$EXTRACT_FILE"
  sed -i '' "s/const TYPE_NAME = \`LovePositionMeaning\`/const TYPE_NAME = \`CareerPositionMeaning\`/" "$EXTRACT_FILE"
  
  echo "  ✅ ${EXTRACT_FILE}"
  
  # Translation script oluştur
  TRANSLATE_FILE="scripts/translate-career-position${POS_NUM}.py"
  cp scripts/translate-love-position2.py "$TRANSLATE_FILE"
  
  # Özelleştir
  sed -i '' "s/SPREAD_KEY = 'love'/SPREAD_KEY = 'career'/" "$TRANSLATE_FILE"
  sed -i '' "s/POSITION_NUM = 2/POSITION_NUM = ${POS_NUM}/" "$TRANSLATE_FILE"
  sed -i '' "s/Google Translate ile Love Spread Position-2/Google Translate ile Career Spread Position-${POS_NUM}/" "$TRANSLATE_FILE"
  
  chmod +x "$TRANSLATE_FILE"
  
  echo "  ✅ ${TRANSLATE_FILE}"
done

echo ""
echo "========================================================================"
echo "✅ 7 EXTRACTION + 7 TRANSLATION SCRIPT OLUŞTURULDU!"
echo "📁 Toplam: 14 script"
echo ""
echo "📋 KULLANIM:"
echo "  Sırayla çalıştırın:"
echo "  1. node scripts/extract-career-position1-tr.js"
echo "  2. python3 scripts/translate-career-position1.py"
echo "  3. python3 scripts/fix-keywords-to-json-string.py"
echo "  4. python3 scripts/transliterate-serbian.py"
echo "  5. python3 scripts/fix-sentence-spacing.py"
echo "  6. python3 scripts/fix-embedded-code-in-json.py"
echo "  7. Sonraki pozisyona geç (position2, position3...)"
echo ""
