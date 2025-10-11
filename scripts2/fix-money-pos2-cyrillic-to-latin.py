#!/usr/bin/env python3
"""
Money Position 2 Sırpça çevirilerini Cyrillic'den Latin'e çevir
"""

import json
import sys

# Cyrillic → Latin mapping (Sırpça)
CYRILLIC_TO_LATIN = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
    'Ђ': 'Đ', 'Е': 'E', 'Ж': 'Ž', 'З': 'Z', 'И': 'I',
    'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj', 'М': 'M',
    'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R',
    'С': 'S', 'Т': 'T', 'Ћ': 'Ć', 'У': 'U', 'Ф': 'F',
    'Х': 'H', 'Ц': 'C', 'Ч': 'Č', 'Џ': 'Dž', 'Ш': 'Š',
    # Küçük harfler
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'ђ': 'đ', 'е': 'e', 'ж': 'ž', 'з': 'z', 'и': 'i',
    'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm',
    'н': 'n', 'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'ћ': 'ć', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š',
}

def transliterate(text):
    """Cyrillic → Latin"""
    if not text:
        return text
    result = text
    for cyr, lat in CYRILLIC_TO_LATIN.items():
        result = result.replace(cyr, lat)
    return result

def transliterate_recursive(obj):
    """Recursive transliteration"""
    if isinstance(obj, str):
        return transliterate(obj)
    elif isinstance(obj, list):
        return [transliterate_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: transliterate_recursive(v) for k, v in obj.items()}
    return obj

def main():
    print("=" * 70)
    print("🔧 MONEY POSITION-2 CYRILLIC → LATIN DÖNÜŞTÜRÜCÜsü")
    print("=" * 70)
    
    # sr.json'u oku
    print("\n📖 messages/sr.json okunuyor...")
    try:
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            sr_data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/sr.json bulunamadı!")
        sys.exit(1)
    
    # Money.meanings.position2'yi kontrol et
    if 'money' not in sr_data or 'meanings' not in sr_data['money']:
        print("❌ money.meanings bulunamadı!")
        sys.exit(1)
    
    cards = sr_data['money']['meanings']
    
    # Position2'leri translitere et
    print(f"\n🔄 Position2 translitere ediliyor...")
    converted_count = 0
    
    for card_key, card_data in cards.items():
        if 'position2' in card_data:
            # Position2'yi translitere et
            original = card_data['position2']
            card_data['position2'] = transliterate_recursive(original)
            converted_count += 1
            
            # İlk kartı örnek göster
            if converted_count == 1:
                print(f"\n  📌 Örnek ({card_key}):")
                print(f"    ÖNCE: {original.get('upright', '')[:50]}...")
                print(f"    SONRA: {card_data['position2'].get('upright', '')[:50]}...")
    
    print(f"\n✅ {converted_count} kart dönüştürüldü")
    
    # Kaydet
    print("\n💾 messages/sr.json kaydediliyor...")
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(sr_data, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 70)
    print("✅ CYRILLIC → LATIN DÖNÜŞTÜRMESİ TAMAMLANDI!")
    print("=" * 70)
    print(f"📊 Dönüştürülen: {converted_count} kart (position2)")
    print("📁 Dosya: messages/sr.json")
    print("\n🎉 Position-2 artık Latin alfabesinde!")
    print("=" * 70)

if __name__ == '__main__':
    main()

