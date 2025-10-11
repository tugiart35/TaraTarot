#!/usr/bin/env python3
"""
🔧 MARRIAGE EXTRACTION SCRIPT'LERİNİ DÜZELT
Tüm position script'lerindeki FILE_NAME değerlerini düzeltir
"""

import os
import re

# Gerçek dosya isimleri
POSITION_FILES = {
    1: 'position-1-sonuc-ne-olacak.ts',
    2: 'position-2-esimi-beklerken-benim-ne-yapmam-gerekiyor.ts',
    3: 'position-3-mali-kaynaklarimizi-birbirimizle-paylasacakmiyiz.ts',
    4: 'position-4-her-ikimizde-baglanmak-isteyecekmiyiz.ts',
    5: 'position-5-benzer-yanlarimiz-olacak-mi.ts',
    6: 'position-6-bu-kisinin-ailesi-beni-kabul-edecek-mi.ts',
    7: 'position-7-birbirimizi-nasil-bulacagiz.ts',
    8: 'position-8-anlasabilecek-miyim.ts',
    9: 'position-9-benim-icin-nasil-bir-es-uygundur.ts',
    10: 'position-10-evlenebilecek-miyim.ts',
}

print("="*70)
print("🔧 MARRIAGE EXTRACTION SCRIPT FIX")
print("="*70)
print()

fixed_count = 0

for pos, correct_filename in POSITION_FILES.items():
    script_path = f'scripts/extract-marriage-position{pos}-tr.js'
    
    if not os.path.exists(script_path):
        print(f"⚠️  Position-{pos}: Script bulunamadı - {script_path}")
        continue
    
    # Script'i oku
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Mevcut FILE_NAME'i bul
    current_match = re.search(r"const FILE_NAME = '([^']+)';", content)
    
    if not current_match:
        print(f"❌ Position-{pos}: FILE_NAME bulunamadı!")
        continue
    
    current_filename = current_match.group(1)
    
    if current_filename == correct_filename:
        print(f"✅ Position-{pos}: Zaten doğru ({correct_filename})")
        continue
    
    # Düzelt
    new_content = re.sub(
        r"const FILE_NAME = '[^']+';",
        f"const FILE_NAME = '{correct_filename}';",
        content
    )
    
    # Yaz
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"🔧 Position-{pos}: Düzeltildi!")
    print(f"   Eski: {current_filename}")
    print(f"   Yeni: {correct_filename}")
    fixed_count += 1

print()
print("="*70)
print(f"✅ {fixed_count} script düzeltildi!")
print("="*70)

