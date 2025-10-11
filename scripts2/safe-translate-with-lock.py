#!/usr/bin/env python3
"""
GÜVENLI ÇEVİRİ SCRIPT'İ
- File lock ile aynı anda sadece 1 script dosyaya yazabilir
- Duplicate önleme
- Veri bütünlüğü kontrolü
"""

import json
import time
import sys
import os
import fcntl
from datetime import datetime

try:
    from googletrans import Translator
except ImportError:
    print("❌ googletrans kütüphanesi bulunamadı!")
    print("📦 Yüklemek için: pip install googletrans==4.0.0rc1")
    sys.exit(1)

# ═══════════════════════════════════════════════════════════
# BURASI ÖZELLEŞTİRİLECEK
# ═══════════════════════════════════════════════════════════
SPREAD_KEY = 'money'
POSITION_NUM = 1  # ← DEĞİŞTİR
# ═══════════════════════════════════════════════════════════

LOCK_FILE = '/tmp/tarot-i18n-translation.lock'

translator = Translator()

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

def check_if_already_translated(filepath, spread_key, position_num):
    """Zaten çevrilmiş mi kontrol et"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if spread_key not in data or 'meanings' not in data[spread_key]:
            return False, 0
        
        cards = data[spread_key]['meanings']
        pos_key = f'position{position_num}'
        count = sum(1 for c in cards.values() if pos_key in c)
        
        return count == 78, count
    except:
        return False, 0

def main():
    start_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("=" * 80)
    print(f"🔮 MONEY POSITION-{POSITION_NUM} GÜVENLİ ÇEVİRİ (v3.0)")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    print(f"🔒 Lock mekanizması: AKTIF")
    print(f"🔄 Duplicate önleme: AKTIF")
    
    # Duplicate kontrolü
    print(f"\n🔍 Mevcut durum kontrol ediliyor...")
    
    en_exists, en_count = check_if_already_translated('messages/en.json', SPREAD_KEY, POSITION_NUM)
    sr_exists, sr_count = check_if_already_translated('messages/sr.json', SPREAD_KEY, POSITION_NUM)
    
    if en_exists and sr_exists:
        print(f"⚠️  Position {POSITION_NUM} zaten çevrilmiş!")
        print(f"   EN: {en_count}/78 kart ✅")
        print(f"   SR: {sr_count}/78 kart ✅")
        print(f"\n❓ Yeniden çevirmek istiyor musunuz? (y/n)")
        print(f"   Script durduruluyor. Devam etmek için manuel onay gerekir.")
        sys.exit(0)
    elif en_count > 0 or sr_count > 0:
        print(f"⚠️  Kısmi çeviri mevcut:")
        print(f"   EN: {en_count}/78 kart")
        print(f"   SR: {sr_count}/78 kart")
        print(f"✅ Eksik kartlar çevrilecek (safe merge)")
    else:
        print(f"✅ Yeni çeviri - tüm kartlar işlenecek")
    
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
    
    # Final progress bar
    print_progress_bar(total_cards, total_cards, 
                      prefix=f'[{total_cards}/{total_cards}]', 
                      suffix='Tamamlandı! ✨')
    
    # 🔒 FILE LOCK ile güvenli yazma
    print("\n📝 Dosyalar güvenli şekilde merge ediliyor...")
    print("🔒 Lock alınıyor...")
    
    lock = open(LOCK_FILE, 'w')
    try:
        # Exclusive lock al
        fcntl.flock(lock.fileno(), fcntl.LOCK_EX)
        print("✅ Lock alındı - dosyalar yazılıyor")
        
        # İngilizce
        with open('messages/en.json', 'r', encoding='utf-8') as f:
            existing_en = json.load(f)
        
        if SPREAD_KEY not in existing_en:
            existing_en[SPREAD_KEY] = {}
        if 'meanings' not in existing_en[SPREAD_KEY]:
            existing_en[SPREAD_KEY]['meanings'] = {}
        
        # SAFE MERGE: Sadece bu position için update
        for card_key, card_data in en_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_en[SPREAD_KEY]['meanings']:
                existing_en[SPREAD_KEY]['meanings'][card_key] = {}
            
            # 🔄 DUPLICATE ÖNLEME: Mevcut varsa atla
            if f'position{POSITION_NUM}' in existing_en[SPREAD_KEY]['meanings'][card_key]:
                print(f"\n  ⚠️ EN {card_key} position{POSITION_NUM} zaten var, atlanıyor")
            else:
                existing_en[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        # Sırpça
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            existing_sr = json.load(f)
        
        if SPREAD_KEY not in existing_sr:
            existing_sr[SPREAD_KEY] = {}
        if 'meanings' not in existing_sr[SPREAD_KEY]:
            existing_sr[SPREAD_KEY]['meanings'] = {}
        
        for card_key, card_data in sr_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_sr[SPREAD_KEY]['meanings']:
                existing_sr[SPREAD_KEY]['meanings'][card_key] = {}
            
            # 🔄 DUPLICATE ÖNLEME
            if f'position{POSITION_NUM}' in existing_sr[SPREAD_KEY]['meanings'][card_key]:
                print(f"\n  ⚠️ SR {card_key} position{POSITION_NUM} zaten var, atlanıyor")
            else:
                existing_sr[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        # Kaydet
        with open('messages/en.json', 'w', encoding='utf-8') as f:
            json.dump(existing_en, f, ensure_ascii=False, indent=2)
        print("  ✅ messages/en.json")
        
        with open('messages/sr.json', 'w', encoding='utf-8') as f:
            json.dump(existing_sr, f, ensure_ascii=False, indent=2)
        print("  ✅ messages/sr.json (Latin alfabesi ✓)")
        
    finally:
        # Lock'u serbest bırak
        fcntl.flock(lock.fileno(), fcntl.LOCK_UN)
        lock.close()
        os.remove(LOCK_FILE)
        print("🔓 Lock serbest bırakıldı")
    
    total_time = time.time() - start_time
    end_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print("\n" + "=" * 80)
    print("✅ GÜVENLİ ÇEVİRİ TAMAMLANDI!")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    print(f"⏰ Bitiş:     {end_time_str}")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"📊 İngilizce: {len(en_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Sırpça (Latin): {len(sr_data[SPREAD_KEY]['meanings'])} kart")
    print(f"🔒 Duplicate önlendi: ✅")
    print(f"🔤 Latin alfabesi: ✅")
    print("=" * 80)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Kullanıcı tarafından durduruldu!")
        # Lock temizle
        if os.path.exists(LOCK_FILE):
            os.remove(LOCK_FILE)
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Hata: {e}")
        if os.path.exists(LOCK_FILE):
            os.remove(LOCK_FILE)
        import traceback
        traceback.print_exc()
        sys.exit(1)

