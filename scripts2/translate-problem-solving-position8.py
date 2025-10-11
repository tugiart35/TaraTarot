#!/usr/bin/env python3
"""
Google Translate kullanarak love position-2 anahtarlarını
Türkçe'den İngilizce ve Sırpça (Latin)'ya çevirir
"""

import json
import time
import sys

try:
    from googletrans import Translator
except ImportError:
    print("❌ googletrans kütüphanesi bulunamadı!")
    print("📦 Yüklemek için: pip install googletrans==4.0.0rc1")
    sys.exit(1)

translator = Translator()

SPREAD_KEY = 'problem-solving'
POSITION_NUM = 8

def translate_text(text, target_lang):
    """Metni hedef dile çevir"""
    try:
        if not text or len(text.strip()) == 0:
            return text
        
        result = translator.translate(text, dest=target_lang, src='tr')
        print(f"    ✓ Çevrildi ({len(text)} → {len(result.text)} karakter)")
        return result.text
    except Exception as e:
        print(f"    ❌ Çeviri hatası: {e}")
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
            print(f"    ❌ Keyword çeviri hatası: {e}")
            translated.append(keyword)
    
    return translated

def main():
    print("=" * 70)
    print(f"🔮 LOVE POSITION-2 GOOGLE TRANSLATE ÇEVİRİ ARACI")
    print("=" * 70)
    
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
    
    en_data = {SPREAD_KEY: {"meanings": {}}}
    sr_data = {SPREAD_KEY: {"meanings": {}}}
    
    # Position-2 kartlarını çevir
    print(f"\n🃏 Position-{POSITION_NUM} kart anlamları çeviriliyor (78 kart)...")
    print("⏱️  Tahmini süre: 30-45 dakika")
    print("🔤 Sırpça: Latin alfabesi")
    print("=" * 70)
    
    total_cards = len(tr_data[SPREAD_KEY]['meanings'])
    current = 0
    start_time = time.time()
    
    for card_key, card_data in tr_data[SPREAD_KEY]['meanings'].items():
        current += 1
        elapsed = time.time() - start_time
        
        if current > 1:
            avg_time = elapsed / (current - 1)
            remaining = avg_time * (total_cards - current)
            print(f"\n[{current}/{total_cards}] {card_key}")
            print(f"⏱️  Geçen: {int(elapsed/60)}dk {int(elapsed%60)}sn | Kalan: ~{int(remaining/60)}dk {int(remaining%60)}sn")
        else:
            print(f"\n[{current}/{total_cards}] {card_key}")
        
        pos_key = f'position{POSITION_NUM}'
        if pos_key not in card_data:
            print(f"  ⚠️  {pos_key} bulunamadı, atlanıyor")
            continue
        
        pos_data = card_data[pos_key]
        
        # İngilizce
        print("  → İngilizce çeviriliyor...")
        en_upright = translate_text(pos_data.get('upright', ''), 'en')
        time.sleep(0.5)
        en_reversed = translate_text(pos_data.get('reversed', ''), 'en')
        time.sleep(0.5)
        en_keywords = translate_keywords(pos_data.get('keywords', []), 'en')
        time.sleep(0.5)
        en_context = translate_text(pos_data.get('context', ''), 'en')
        time.sleep(0.5)
        
        if card_key not in en_data[SPREAD_KEY]['meanings']:
            en_data[SPREAD_KEY]['meanings'][card_key] = {}
        
        en_data[SPREAD_KEY]['meanings'][card_key][pos_key] = {
            'upright': en_upright,
            'reversed': en_reversed,
            'keywords': en_keywords,
            'context': en_context
        }
        
        # Sırpça (Latin)
        print("  → Sırpça (Latin) çeviriliyor...")
        sr_upright = translate_text(pos_data.get('upright', ''), 'sr')
        time.sleep(0.5)
        sr_reversed = translate_text(pos_data.get('reversed', ''), 'sr')
        time.sleep(0.5)
        sr_keywords = translate_keywords(pos_data.get('keywords', []), 'sr')
        time.sleep(0.5)
        sr_context = translate_text(pos_data.get('context', ''), 'sr')
        time.sleep(0.5)
        
        if card_key not in sr_data[SPREAD_KEY]['meanings']:
            sr_data[SPREAD_KEY]['meanings'][card_key] = {}
        
        sr_data[SPREAD_KEY]['meanings'][card_key][pos_key] = {
            'upright': sr_upright,
            'reversed': sr_reversed,
            'keywords': sr_keywords,
            'context': sr_context
        }
        
        print(f"  ✅ {card_key} tamamlandı")
    
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
        
        print("  ✓ Mevcut en.json güncellendi")
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
        
        print("  ✓ Mevcut sr.json güncellendi")
    except Exception as e:
        print(f"  ⚠️  sr.json hata: {e}")
        existing_sr = sr_data
    
    # Kaydet
    with open('messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(existing_en, f, ensure_ascii=False, indent=2)
    
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(existing_sr, f, ensure_ascii=False, indent=2)
    
    total_time = time.time() - start_time
    
    print("\n" + "=" * 70)
    print("✅ TÜM ÇEVİRİLER TAMAMLANDI!")
    print("=" * 70)
    print(f"📊 İngilizce: {len(en_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Sırpça (Latin): {len(sr_data[SPREAD_KEY]['meanings'])} kart")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"\n📁 Dosyalar:")
    print(f"  - messages/en.json")
    print(f"  - messages/sr.json")
    print("\n🎉 Position-2 çevirileri başarıyla tamamlandı!")
    print("=" * 70)

if __name__ == '__main__':
    main()

