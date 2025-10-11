#!/usr/bin/env python3
"""
SR.JSON dosyasındaki TÜM Cyrillic metinleri Latin'e çevir
Tüm spread'ler ve tüm position'lar için çalışır
"""

import json
import sys
import re

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
    """Recursive transliteration for nested structures"""
    if isinstance(obj, str):
        return transliterate(obj)
    elif isinstance(obj, list):
        return [transliterate_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: transliterate_recursive(v) for k, v in obj.items()}
    return obj

def has_cyrillic(text):
    """Metinde Cyrillic karakter var mı kontrol et"""
    if not isinstance(text, str):
        return False
    cyrillic_pattern = re.compile('[А-Яа-яЁё]')
    return bool(cyrillic_pattern.search(text))

def count_cyrillic_in_obj(obj):
    """Object içinde kaç string'de Cyrillic var"""
    count = 0
    if isinstance(obj, str):
        return 1 if has_cyrillic(obj) else 0
    elif isinstance(obj, list):
        for item in obj:
            count += count_cyrillic_in_obj(item)
    elif isinstance(obj, dict):
        for value in obj.values():
            count += count_cyrillic_in_obj(value)
    return count

def main():
    print("=" * 80)
    print("🔧 SR.JSON TÜM CYRILLIC → LATIN DÖNÜŞTÜRÜCÜsü")
    print("=" * 80)
    
    # sr.json'u oku
    print("\n📖 messages/sr.json okunuyor...")
    try:
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            sr_data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/sr.json bulunamadı!")
        sys.exit(1)
    
    print(f"✅ Dosya yüklendi")
    print(f"📊 Mevcut spread'ler: {list(sr_data.keys())}")
    
    # Önce Cyrillic sayısını kontrol et
    print("\n🔍 Cyrillic tespit ediliyor...")
    cyrillic_count_before = count_cyrillic_in_obj(sr_data)
    print(f"📌 Cyrillic içeren string sayısı: {cyrillic_count_before}")
    
    if cyrillic_count_before == 0:
        print("\n✅ Zaten tüm metinler Latin alfabesinde!")
        print("=" * 80)
        return
    
    # Örnek Cyrillic metin göster
    print("\n📝 Örnek Cyrillic metin (ÖNCE):")
    for spread_key, spread_data in sr_data.items():
        if 'meanings' in spread_data:
            first_card = list(spread_data['meanings'].values())[0]
            first_pos = list(first_card.values())[0]
            if 'upright' in first_pos:
                sample = first_pos['upright'][:60]
                if has_cyrillic(sample):
                    print(f"  {spread_key}: {sample}...")
                    break
    
    # TÜM sr.json'u translitere et
    print(f"\n🔄 Tüm sr.json translitere ediliyor...")
    sr_data_transliterated = transliterate_recursive(sr_data)
    
    # Sonra Cyrillic sayısını kontrol et
    cyrillic_count_after = count_cyrillic_in_obj(sr_data_transliterated)
    
    print(f"✅ Transliteration tamamlandı")
    print(f"📊 Kalan Cyrillic string sayısı: {cyrillic_count_after}")
    
    # Örnek Latin metin göster
    print("\n📝 Örnek Latin metin (SONRA):")
    for spread_key, spread_data in sr_data_transliterated.items():
        if 'meanings' in spread_data:
            first_card = list(spread_data['meanings'].values())[0]
            first_pos = list(first_card.values())[0]
            if 'upright' in first_pos:
                sample = first_pos['upright'][:60]
                print(f"  {spread_key}: {sample}...")
                break
    
    # Kaydet
    print("\n💾 messages/sr.json kaydediliyor...")
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(sr_data_transliterated, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 80)
    print("✅ CYRILLIC → LATIN DÖNÜŞTÜRMESİ TAMAMLANDI!")
    print("=" * 80)
    print(f"📊 İstatistikler:")
    print(f"   • Önce Cyrillic: {cyrillic_count_before} string")
    print(f"   • Sonra Cyrillic: {cyrillic_count_after} string")
    print(f"   • Dönüştürülen: {cyrillic_count_before - cyrillic_count_after} string")
    print(f"   • Spread'ler: {', '.join(sr_data.keys())}")
    print(f"\n📁 Dosya: messages/sr.json")
    print("🎉 Artık TÜM metinler Latin alfabesinde!")
    print("=" * 80)

if __name__ == '__main__':
    main()

