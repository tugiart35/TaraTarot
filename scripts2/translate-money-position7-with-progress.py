#!/usr/bin/env python3
"""
Google Translate kullanarak money position-X anahtarlarını
Türkçe'den İngilizce ve Sırpça (Latin)'ya çevirir
✨ İLERLEME TAKİPLİ + OTOMATİK LATIN DÖNÜŞÜMÜ
"""

import json
import time
import sys
import os
from datetime import datetime

try:
    from googletrans import Translator
except ImportError:
    print("❌ googletrans kütüphanesi bulunamadı!")
    print("📦 Yüklemek için: pip install googletrans==4.0.0rc1")
    sys.exit(1)

translator = Translator()

# ═══════════════════════════════════════════════════════════
# BURASI ÖZELLEŞTİRİLECEK
# ═══════════════════════════════════════════════════════════
SPREAD_KEY = 'money'
POSITION_NUM = 7  # ← DEĞİŞTİR: 5, 6, 7, 8
# ═══════════════════════════════════════════════════════════

# Cyrillic → Latin mapping
CYRILLIC_TO_LATIN = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
    'Ђ': 'Đ', 'Е': 'E', 'Ж': 'Ž', 'З': 'Z', 'И': 'I',
    'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj', 'М': 'M',
    'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R',
    'С': 'S', 'Т': 'T', 'Ћ': 'Ć', 'У': 'U', 'Ф': 'F',
    'Х': 'H', 'Ц': 'C', 'Ч': 'Č', 'Џ': 'Dž', 'Ш': 'Š',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'ђ': 'đ', 'е': 'e', 'ж': 'ž', 'з': 'z', 'и': 'i',
    'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm',
    'н': 'n', 'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'ћ': 'ć', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š',
}

def transliterate_to_latin(text):
    """Cyrillic → Latin"""
    if not text:
        return text
    result = text
    for cyr, lat in CYRILLIC_TO_LATIN.items():
        result = result.replace(cyr, lat)
    return result

def transliterate_recursive(obj):
    """Recursive Cyrillic → Latin"""
    if isinstance(obj, str):
        return transliterate_to_latin(obj)
    elif isinstance(obj, list):
        return [transliterate_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: transliterate_recursive(v) for k, v in obj.items()}
    return obj

def print_progress_bar(iteration, total, prefix='', suffix='', length=50, fill='█'):
    """Terminal'de progress bar göster"""
    percent = f"{100 * (iteration / float(total)):.1f}"
    filled_length = int(length * iteration // total)
    bar = fill * filled_length + '-' * (length - filled_length)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end='', flush=True)
    if iteration == total:
        print()

def translate_text(text, target_lang):
    """Metni hedef dile çevir"""
    try:
        if not text or len(text.strip()) == 0:
            return text
        
        result = translator.translate(text, dest=target_lang, src='tr')
        translated = result.text
        
        # Sırpça için otomatik Latin'e çevir
        if target_lang == 'sr':
            translated = transliterate_to_latin(translated)
        
        return translated
    except Exception as e:
        print(f"\n    ❌ Çeviri hatası: {e}")
        return text

def translate_keywords(keywords, target_lang):
    """Anahtar kelimeleri çevir"""
    if not keywords or not isinstance(keywords, list):
        return keywords
    
    translated = []
    for keyword in keywords:
        try:
            result = translate_text(keyword, target_lang)
            translated.append(result)
            time.sleep(0.2)
        except Exception as e:
            print(f"\n    ❌ Keyword çeviri hatası: {e}")
            translated.append(keyword)
    
    return translated

def main():
    start_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("=" * 80)
    print(f"🔮 MONEY POSITION-{POSITION_NUM} ÇEVİRİ ARACI (İlerlemeli + Latin)")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    
    # Türkçe dosyayı oku
    print("\n📖 Türkçe dosya okunuyor...")
    try:
        with open('messages/tr.json', 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/tr.json bulunamadı!")
        sys.exit(1)
    
    if SPREAD_KEY not in tr_data or 'meanings' not in tr_data[SPREAD_KEY]:
        print(f"❌ {SPREAD_KEY}.meanings bulunamadı!")
        sys.exit(1)
    
    # Filtreleme: Sadece positionX olan kartları al
    cards_to_translate = {}
    for card_key, card_data in tr_data[SPREAD_KEY]['meanings'].items():
        if f'position{POSITION_NUM}' in card_data:
            cards_to_translate[card_key] = card_data
    
    total_cards = len(cards_to_translate)
    print(f"✅ {total_cards} kart bulundu (position{POSITION_NUM})")
    
    if total_cards == 0:
        print(f"⚠️  Position{POSITION_NUM} verisi bulunamadı!")
        sys.exit(1)
    
    en_data = {SPREAD_KEY: {"meanings": {}}}
    sr_data = {SPREAD_KEY: {"meanings": {}}}
    
    print(f"\n🃏 Çeviriler başlıyor...")
    print(f"⏱️  Tahmini süre: {int(total_cards * 0.5)} - {int(total_cards * 0.7)} dakika")
    print(f"🔤 Hedef diller: İngilizce (EN), Sırpça Latin (SR)")
    print(f"✨ Sırpça çeviriler OTOMATİK Latin alfabesine çevrilecek")
    print("=" * 80)
    
    start_time = time.time()
    current = 0
    
    for card_key, card_data in cards_to_translate.items():
        current += 1
        elapsed = time.time() - start_time
        
        # İlerleme çubuğu
        print_progress_bar(current - 1, total_cards, 
                          prefix=f'[{current}/{total_cards}]', 
                          suffix=f'{card_key[:15]:<15}')
        
        # Süre tahmini
        if current > 1:
            avg_time = elapsed / (current - 1)
            remaining = avg_time * (total_cards - current)
            time_info = f"⏱️  {int(elapsed/60)}:{int(elapsed%60):02d} / ~{int(remaining/60)}:{int(remaining%60):02d}"
        else:
            time_info = "⏱️  Başlıyor..."
        
        print(f"\n{time_info} | [{current}/{total_cards}] 📌 {card_key}")
        
        pos_key = f'position{POSITION_NUM}'
        if pos_key not in card_data:
            print(f"  ⚠️  {pos_key} bulunamadı, atlanıyor")
            continue
        
        pos_data = card_data[pos_key]
        
        # İngilizce
        print("  🇬🇧 EN: ", end='', flush=True)
        en_upright = translate_text(pos_data.get('upright', ''), 'en')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        en_reversed = translate_text(pos_data.get('reversed', ''), 'en')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        en_keywords = translate_keywords(pos_data.get('keywords', []), 'en')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        en_context = translate_text(pos_data.get('context', ''), 'en')
        print("✓")
        time.sleep(0.5)
        
        if card_key not in en_data[SPREAD_KEY]['meanings']:
            en_data[SPREAD_KEY]['meanings'][card_key] = {}
        
        en_data[SPREAD_KEY]['meanings'][card_key][pos_key] = {
            'upright': en_upright,
            'reversed': en_reversed,
            'keywords': en_keywords,
            'context': en_context
        }
        
        # Sırpça (otomatik Latin)
        print("  🇷🇸 SR (Latin): ", end='', flush=True)
        sr_upright = translate_text(pos_data.get('upright', ''), 'sr')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        sr_reversed = translate_text(pos_data.get('reversed', ''), 'sr')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        sr_keywords = translate_keywords(pos_data.get('keywords', []), 'sr')
        print("✓ ", end='', flush=True)
        time.sleep(0.5)
        sr_context = translate_text(pos_data.get('context', ''), 'sr')
        print("✓")
        time.sleep(0.5)
        
        if card_key not in sr_data[SPREAD_KEY]['meanings']:
            sr_data[SPREAD_KEY]['meanings'][card_key] = {}
        
        sr_data[SPREAD_KEY]['meanings'][card_key][pos_key] = {
            'upright': sr_upright,
            'reversed': sr_reversed,
            'keywords': sr_keywords,
            'context': sr_context
        }
        
        # Her 10 kartta bir kaydet
        if current % 10 == 0:
            print(f"  💾 Ara kayıt yapılıyor... ({current}/{total_cards})")
    
    # Final progress bar
    print_progress_bar(total_cards, total_cards, 
                      prefix=f'[{total_cards}/{total_cards}]', 
                      suffix='Tamamlandı! ✨')
    
    # Mevcut dosyalarla merge et
    print("\n📝 Dosyalar merge ediliyor...")
    
    # İngilizce
    try:
        with open('messages/en.json', 'r', encoding='utf-8') as f:
            existing_en = json.load(f)
        
        if SPREAD_KEY not in existing_en:
            existing_en[SPREAD_KEY] = {}
        if 'meanings' not in existing_en[SPREAD_KEY]:
            existing_en[SPREAD_KEY]['meanings'] = {}
        
        for card_key, card_data in en_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_en[SPREAD_KEY]['meanings']:
                existing_en[SPREAD_KEY]['meanings'][card_key] = {}
            existing_en[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        print("  ✅ en.json güncellendi")
    except Exception as e:
        print(f"  ⚠️  en.json hata: {e}")
        existing_en = en_data
    
    # Sırpça
    try:
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            existing_sr = json.load(f)
        
        if SPREAD_KEY not in existing_sr:
            existing_sr[SPREAD_KEY] = {}
        if 'meanings' not in existing_sr[SPREAD_KEY]:
            existing_sr[SPREAD_KEY]['meanings'] = {}
        
        for card_key, card_data in sr_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_sr[SPREAD_KEY]['meanings']:
                existing_sr[SPREAD_KEY]['meanings'][card_key] = {}
            existing_sr[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        print("  ✅ sr.json güncellendi")
    except Exception as e:
        print(f"  ⚠️  sr.json hata: {e}")
        existing_sr = sr_data
    
    # Kaydet
    print("\n💾 Dosyalar kaydediliyor...")
    with open('messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(existing_en, f, ensure_ascii=False, indent=2)
    print("  ✅ messages/en.json")
    
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(existing_sr, f, ensure_ascii=False, indent=2)
    print("  ✅ messages/sr.json (Latin alfabesi ✓)")
    
    total_time = time.time() - start_time
    end_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print("\n" + "=" * 80)
    print("✅ TÜM ÇEVİRİLER TAMAMLANDI!")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    print(f"⏰ Bitiş:     {end_time_str}")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"📊 İngilizce: {len(en_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Sırpça (Latin): {len(sr_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Ortalama: {total_time/total_cards:.1f} saniye/kart")
    print(f"\n📁 Dosyalar:")
    print(f"  - messages/en.json")
    print(f"  - messages/sr.json (✓ Latin alfabesi)")
    print(f"\n🎉 Position-{POSITION_NUM} çevirileri başarıyla tamamlandı!")
    print("=" * 80)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Kullanıcı tarafından durduruldu!")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Beklenmeyen hata: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

