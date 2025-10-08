#!/usr/bin/env python3
"""
messages/*.json dosyalarındaki love.meanings.*.position1.keywords 
array'lerini JSON string formatına çevirir
"""

import json

def fix_keywords_format(file_path):
    """Keywords array'lerini JSON string'e çevir"""
    print(f"\n📝 {file_path} düzeltiliyor...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'love' not in data or 'meanings' not in data['love']:
        print(f"  ⚠️  love.meanings bulunamadı, atlanıyor")
        return
    
    fixed_count = 0
    for card_key, card_data in data['love']['meanings'].items():
        if 'position1' in card_data and 'keywords' in card_data['position1']:
            keywords = card_data['position1']['keywords']
            
            # Eğer keywords bir array ise, JSON string'e çevir
            if isinstance(keywords, list):
                data['love']['meanings'][card_key]['position1']['keywords'] = json.dumps(keywords, ensure_ascii=False)
                fixed_count += 1
    
    # Dosyayı kaydet
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"  ✅ {fixed_count} kart düzeltildi")

# Ana fonksiyon
def main():
    print("=" * 70)
    print("🔧 KEYWORDS ARRAY → JSON STRING DÖNÜŞÜMÜ")
    print("=" * 70)
    
    files = [
        'messages/tr.json',
        'messages/en.json',
        'messages/sr.json'
    ]
    
    for file in files:
        fix_keywords_format(file)
    
    print("\n" + "=" * 70)
    print("✅ TÜM DOSYALAR DÜZELTİLDİ!")
    print("=" * 70)
    print("\n🔍 Örnek format:")
    print('  Önce: "keywords": ["yeni başlangıçlar", "masumiyet"]')
    print('  Sonra: "keywords": "[\\"yeni başlangıçlar\\", \\"masumiyet\\"]"')
    print("\n⏭️  Sonraki adım: npm run dev ile test edin")

if __name__ == '__main__':
    main()

