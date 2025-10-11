#!/usr/bin/env python3
"""
Marriage spread için keywords array'lerini JSON string'e çevirir
Tüm dillerde (tr/en/sr) 78 kart x 10 pozisyon için çalışır
"""

import json
import sys

def fix_keywords_in_file(file_path, lang_code):
    """Bir JSON dosyasındaki tüm keywords array'lerini JSON string'e çevir"""
    print(f"\n📁 {file_path} işleniyor...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Dosya bulunamadı: {file_path}")
        return False
    
    if 'marriage' not in data or 'meanings' not in data['marriage']:
        print(f"⚠️  marriage.meanings bulunamadı, atlanıyor")
        return False
    
    fixed_count = 0
    total_positions = 0
    
    for card_key, card_data in data['marriage']['meanings'].items():
        # Her pozisyon için keywords'ü kontrol et
        for position_key in [f'position{i}' for i in range(1, 11)]:
            if position_key not in card_data:
                continue
            
            total_positions += 1
            pos_data = card_data[position_key]
            
            if 'keywords' not in pos_data:
                continue
            
            keywords = pos_data['keywords']
            
            # Eğer array ise JSON string'e çevir
            if isinstance(keywords, list):
                json_string = json.dumps(keywords, ensure_ascii=False)
                data['marriage']['meanings'][card_key][position_key]['keywords'] = json_string
                fixed_count += 1
    
    # Dosyayı kaydet
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"  ✓ {fixed_count}/{total_positions} keywords JSON string'e çevrildi")
    return True

def main():
    print("=" * 70)
    print("🔧 MARRIAGE KEYWORDS ARRAY → JSON STRING DÖNÜŞTÜRÜCÜ")
    print("=" * 70)
    print("📋 Hedef: 78 kart × 10 pozisyon × 3 dil = 2,340 keywords")
    print("=" * 70)
    
    files = [
        ('messages/tr.json', 'tr'),
        ('messages/en.json', 'en'),
        ('messages/sr.json', 'sr'),
    ]
    
    success_count = 0
    for file_path, lang_code in files:
        if fix_keywords_in_file(file_path, lang_code):
            success_count += 1
    
    print("\n" + "=" * 70)
    if success_count == 3:
        print("✅ TÜM DOSYALAR BAŞARIYLA GÜNCELLENDİ!")
        print("=" * 70)
        print("📊 Özet:")
        print("  - TR, EN, SR dosyaları güncellendi")
        print("  - Keywords artık JSON string formatında")
        print("  - i18n sistemi ile uyumlu hale geldi")
        print("\n🎉 Marriage spread keywords formatı düzeltildi!")
    else:
        print(f"⚠️  {success_count}/3 dosya başarılı")
    
    print("=" * 70)

if __name__ == '__main__':
    main()

