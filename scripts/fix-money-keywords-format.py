#!/usr/bin/env python3
"""
Money meanings keywords formatını düzeltir
Array formatından JSON string formatına çevirir

Kullanım:
    python3 scripts/fix-money-keywords-format.py
"""

import json
import sys

def main():
    print("=" * 70)
    print("🔧 MONEY KEYWORDS FORMAT DÜZELTMESİ")
    print("=" * 70)
    print()
    
    languages = ['tr', 'en', 'sr']
    total_fixed = 0
    
    for lang in languages:
        file_path = f'messages/{lang}.json'
        print(f"📝 {lang.upper()} dosyası işleniyor...")
        
        try:
            # Dosyayı oku
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Money meanings var mı kontrol et
            if 'money' not in data or 'meanings' not in data.get('money', {}):
                print(f"  ⚠️  {lang}.json'da money.meanings bulunamadı, atlanıyor")
                print()
                continue
            
            # Keywords'leri düzelt
            fixed_count = 0
            for card_key, card_data in data['money']['meanings'].items():
                for pos_key, pos_data in card_data.items():
                    if 'keywords' in pos_data and isinstance(pos_data['keywords'], list):
                        # Array → JSON string
                        pos_data['keywords'] = json.dumps(pos_data['keywords'], ensure_ascii=False)
                        fixed_count += 1
            
            # Dosyayı kaydet
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"  ✅ {fixed_count} keywords düzeltildi")
            total_fixed += fixed_count
            
        except FileNotFoundError:
            print(f"  ❌ {file_path} bulunamadı!")
        except Exception as e:
            print(f"  ❌ Hata: {e}")
        
        print()
    
    print("=" * 70)
    print("✅ TAMAMLANDI!")
    print("=" * 70)
    print(f"📊 Toplam {total_fixed} keywords array'den JSON string'e çevrildi")
    print()

if __name__ == '__main__':
    main()

