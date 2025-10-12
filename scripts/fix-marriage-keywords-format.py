#!/usr/bin/env python3
"""
Marriage meanings keywords formatını düzeltir
Array formatından JSON string formatına çevirir

Kullanım:
    python3 scripts/fix-marriage-keywords-format.py
"""

import json
import sys

def fix_keywords_format(data, path=""):
    """Recursively fix keywords from array to JSON string"""
    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            if key == "keywords" and isinstance(value, list):
                # Array → JSON string
                new_dict[key] = json.dumps(value, ensure_ascii=False)
                print(f"  ✓ Fixed keywords at {path}.{key}")
            else:
                new_dict[key] = fix_keywords_format(value, f"{path}.{key}" if path else key)
        return new_dict
    elif isinstance(data, list):
        return [fix_keywords_format(item, f"{path}[{i}]") for i, item in enumerate(data)]
    else:
        return data

def main():
    print("=" * 70)
    print("🔧 MARRIAGE KEYWORDS FORMAT DÜZELTMESİ")
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
            
            # Marriage meanings var mı kontrol et
            if 'marriage' not in data or 'meanings' not in data.get('marriage', {}):
                print(f"  ⚠️  {lang}.json'da marriage.meanings bulunamadı, atlanıyor")
                print()
                continue
            
            # Keywords'leri düzelt
            fixed_count = 0
            for card_key, card_data in data['marriage']['meanings'].items():
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


