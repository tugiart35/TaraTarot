#!/usr/bin/env python3
"""
Sırpça Cyrillic → Latin dönüşümü
messages/sr.json dosyasındaki tüm Cyrillic metinleri Latin alfabesine çevirir
"""

import json
import re

# Cyrillic → Latin mapping (Sırpça)
CYRILLIC_TO_LATIN = {
    # Büyük harfler
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
    """Cyrillic → Latin transliteration"""
    if not isinstance(text, str):
        return text
    
    for cyr, lat in CYRILLIC_TO_LATIN.items():
        text = text.replace(cyr, lat)
    return text

def transliterate_recursive(obj):
    """Recursive transliteration for nested objects"""
    if isinstance(obj, str):
        return transliterate(obj)
    elif isinstance(obj, list):
        return [transliterate_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: transliterate_recursive(v) for k, v in obj.items()}
    return obj

def main():
    print("=" * 70)
    print("🔤 SירPÇA CYR ILLIC → LATIN DÖNÜŞÜMÜ")
    print("=" * 70)
    
    # messages/sr.json oku
    print("\n📖 messages/sr.json okunuyor...")
    try:
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/sr.json bulunamadı!")
        return
    
    # Cyrillic var mı kontrol et
    sample_text = json.dumps(data, ensure_ascii=False)[:1000]
    cyrillic_pattern = re.compile('[А-Яа-яЁё]')
    has_cyrillic = bool(cyrillic_pattern.search(sample_text))
    
    if not has_cyrillic:
        print("✅ Cyrillic karakter bulunamadı, dönüşüm gerekmiyor!")
        return
    
    print("⚠️  Cyrillic karakterler tespit edildi, dönüştürülüyor...")
    
    # Translitere et
    data = transliterate_recursive(data)
    
    # Kaydet
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print("\n✅ Sırpça Cyrillic → Latin dönüşümü tamamlandı!")
    print("=" * 70)
    
    # Örnek göster
    if 'love' in data and 'meanings' in data['love']:
        first_card = list(data['love']['meanings'].values())[0]
        if 'position2' in first_card:
            sample = first_card['position2']['upright'][:80]
            print(f"\n🔍 Örnek (Latin): {sample}...")
    
    print("\n📁 Dosya: messages/sr.json")
    print("✅ Latin alfabesi kullanılıyor")

if __name__ == '__main__':
    main()

