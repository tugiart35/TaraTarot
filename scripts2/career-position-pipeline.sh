#!/bin/bash
# Career Spread için tek pozisyonu baştan sona işler
# Kullanım: bash scripts/career-position-pipeline.sh <position_number>

if [ -z "$1" ]; then
  echo "❌ Kullanım: bash scripts/career-position-pipeline.sh <position_number>"
  echo "   Örnek: bash scripts/career-position-pipeline.sh 1"
  exit 1
fi

POSITION=$1

echo "🔮 CAREER POSITION-${POSITION} PIPELINE"
echo "========================================================================"

# 1. Extraction
echo ""
echo "📝 ADIM 1/6: Türkçe Extraction"
echo "----------------------------------------"
node scripts/extract-career-position${POSITION}-tr.js
if [ $? -ne 0 ]; then
  echo "❌ Extraction başarısız!"
  exit 1
fi

# 2. Translation
echo ""
echo "🌐 ADIM 2/6: Google Translate (EN + SR)"
echo "----------------------------------------"
echo "⏱️  Tahmini: 25-30 dakika"
python3 scripts/translate-career-position${POSITION}.py
if [ $? -ne 0 ]; then
  echo "❌ Translation başarısız!"
  exit 1
fi

# 3. Keywords fix
echo ""
echo "🔧 ADIM 3/6: Keywords Format"
echo "----------------------------------------"
python3 scripts/fix-keywords-to-json-string.py

# 4. Cyrillic to Latin
echo ""
echo "🔤 ADIM 4/6: Cyrillic → Latin"
echo "----------------------------------------"
python3 scripts/transliterate-serbian.py

# 5. Sentence spacing
echo ""
echo "📏 ADIM 5/6: Cümle Boşlukları"
echo "----------------------------------------"
python3 scripts/fix-sentence-spacing.py

# 6. Embedded code cleanup
echo ""
echo "🧹 ADIM 6/6: Embedded Kod Temizliği"
echo "----------------------------------------"
python3 scripts/fix-embedded-code-in-json.py

# Final validation
echo ""
echo "========================================================================"
echo "✅ CAREER POSITION-${POSITION} TAMAMLANDI!"
echo "========================================================================"
echo ""
echo "📊 Doğrulama:"
python3 -c "
import json
en = json.load(open('messages/en.json'))
sr = json.load(open('messages/sr.json'))
tr = json.load(open('messages/tr.json'))

tr_count = len([k for k,v in tr.get('career',{}).get('meanings',{}).items() if 'position${POSITION}' in v])
en_count = len([k for k,v in en.get('career',{}).get('meanings',{}).items() if 'position${POSITION}' in v])
sr_count = len([k for k,v in sr.get('career',{}).get('meanings',{}).items() if 'position${POSITION}' in v])

print(f'  TR: {tr_count}/78')
print(f'  EN: {en_count}/78')
print(f'  SR: {sr_count}/78')

if tr_count == en_count == sr_count == 78:
    print('  ✅ Tüm kartlar hazır!')
else:
    print('  ⚠️  Eksik kartlar var!')
"

echo ""
echo "🚀 Sonraki adım: Position-$((POSITION+1))"
echo "   bash scripts/career-position-pipeline.sh $((POSITION+1))"
echo ""
