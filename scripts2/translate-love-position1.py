#!/usr/bin/env python3
"""
Google Translate kullanarak love.meanings anahtarlarını
Türkçe'den İngilizce ve Sırpça'ya çevirir
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
    for i, keyword in enumerate(keywords):
        try:
            result = translate_text(keyword, target_lang)
            translated.append(result)
            time.sleep(0.2)  # Rate limiting
        except Exception as e:
            print(f"    ❌ Keyword çeviri hatası: {e}")
            translated.append(keyword)
    
    return translated

def main():
    print("=" * 70)
    print("🔮 LOVE POSITION-1 GOOGLE TRANSLATE ÇEVİRİ ARACI")
    print("=" * 70)
    
    # Türkçe dosyayı oku
    print("\n📖 Türkçe dosya okunuyor...")
    try:
        with open('messages/tr.json', 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/tr.json bulunamadı!")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse hatası: {e}")
        sys.exit(1)
    
    # love anahtarını kontrol et
    if 'love' not in tr_data:
        print("❌ tr.json'da 'love' anahtarı bulunamadı!")
        sys.exit(1)
    
    # İngilizce ve Sırpça yapıları oluştur
    en_data = {"love": {"meanings": {}, "cardGroups": {}}}
    sr_data = {"love": {"meanings": {}, "cardGroups": {}}}
    
    # cardGroups çevir
    print("\n🔮 Kart grupları çeviriliyor...")
    if 'cardGroups' in tr_data.get('love', {}):
        for group_key, group_value in tr_data['love']['cardGroups'].items():
            print(f"  📌 {group_key}...")
            en_data['love']['cardGroups'][group_key] = translate_text(group_value, 'en')
            time.sleep(0.3)
            sr_data['love']['cardGroups'][group_key] = translate_text(group_value, 'sr')
            time.sleep(0.3)
    else:
        print("  ⚠️  cardGroups bulunamadı")
    
    # Kart anlamlarını çevir
    if 'meanings' not in tr_data.get('love', {}):
        print("\n❌ love.meanings bulunamadı!")
        sys.exit(1)
    
    print("\n🃏 Kart anlamları çeviriliyor (78 kart)...")
    print("⏱️  Tahmini süre: 30-45 dakika")
    print("=" * 70)
    
    total_cards = len(tr_data['love']['meanings'])
    current = 0
    start_time = time.time()
    
    for card_key, card_data in tr_data['love']['meanings'].items():
        current += 1
        elapsed = time.time() - start_time
        if current > 1:
            avg_time = elapsed / (current - 1)
            remaining = avg_time * (total_cards - current)
            print(f"\n[{current}/{total_cards}] {card_key}")
            print(f"⏱️  Geçen: {int(elapsed/60)}dk {int(elapsed%60)}sn | Kalan: ~{int(remaining/60)}dk {int(remaining%60)}sn")
        else:
            print(f"\n[{current}/{total_cards}] {card_key}")
        
        if 'position1' not in card_data:
            print("  ⚠️  position1 bulunamadı, atlanıyor")
            continue
        
        pos1 = card_data['position1']
        
        # İngilizce çeviri
        print("  → İngilizce çeviriliyor...")
        en_upright = translate_text(pos1.get('upright', ''), 'en')
        time.sleep(0.5)
        en_reversed = translate_text(pos1.get('reversed', ''), 'en')
        time.sleep(0.5)
        en_keywords = translate_keywords(pos1.get('keywords', []), 'en')
        time.sleep(0.5)
        en_context = translate_text(pos1.get('context', ''), 'en')
        time.sleep(0.5)
        
        en_data['love']['meanings'][card_key] = {
            'position1': {
                'upright': en_upright,
                'reversed': en_reversed,
                'keywords': en_keywords,
                'context': en_context
            }
        }
        
        # Sırpça çeviri
        print("  → Sırpça çeviriliyor...")
        sr_upright = translate_text(pos1.get('upright', ''), 'sr')
        time.sleep(0.5)
        sr_reversed = translate_text(pos1.get('reversed', ''), 'sr')
        time.sleep(0.5)
        sr_keywords = translate_keywords(pos1.get('keywords', []), 'sr')
        time.sleep(0.5)
        sr_context = translate_text(pos1.get('context', ''), 'sr')
        time.sleep(0.5)
        
        sr_data['love']['meanings'][card_key] = {
            'position1': {
                'upright': sr_upright,
                'reversed': sr_reversed,
                'keywords': sr_keywords,
                'context': sr_context
            }
        }
        
        print(f"  ✅ {card_key} tamamlandı")
    
    # Mevcut dosyaları oku ve merge et
    print("\n📝 Dosyalar merge ediliyor...")
    
    # İngilizce
    try:
        with open('messages/en.json', 'r', encoding='utf-8') as f:
            existing_en = json.load(f)
        existing_en['love'] = en_data['love']
        print("  ✓ Mevcut en.json güncellendi")
    except FileNotFoundError:
        existing_en = en_data
        print("  ⚠️  en.json bulunamadı, yeni oluşturulacak")
    except json.JSONDecodeError:
        existing_en = en_data
        print("  ⚠️  en.json hatalı, yeni oluşturulacak")
    
    # Sırpça
    try:
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            existing_sr = json.load(f)
        existing_sr['love'] = sr_data['love']
        print("  ✓ Mevcut sr.json güncellendi")
    except FileNotFoundError:
        existing_sr = sr_data
        print("  ⚠️  sr.json bulunamadı, yeni oluşturulacak")
    except json.JSONDecodeError:
        existing_sr = sr_data
        print("  ⚠️  sr.json hatalı, yeni oluşturulacak")
    
    # Dosyaları kaydet
    with open('messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(existing_en, f, ensure_ascii=False, indent=2)
    
    with open('messages/sr.json', 'w', encoding='utf-8') as f:
        json.dump(existing_sr, f, ensure_ascii=False, indent=2)
    
    total_time = time.time() - start_time
    
    print("\n" + "=" * 70)
    print("✅ TÜM ÇEVİRİLER TAMAMLANDI!")
    print("=" * 70)
    print(f"📊 İngilizce: {len(en_data['love']['meanings'])} kart")
    print(f"📊 Sırpça: {len(sr_data['love']['meanings'])} kart")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"\n📁 Dosyalar:")
    print(f"  - messages/en.json")
    print(f"  - messages/sr.json")
    print("\n🎉 Çeviriler başarıyla tamamlandı!")
    print("=" * 70)

if __name__ == '__main__':
    main()

