#!/usr/bin/env python3
"""
Google Translate kullanarak marriage position-1 anahtarlarını
Türkçe'den İngilizce ve Sırpça (Latin)'ya çevirir
Log takipli, hata yönetimli ve resume destekli
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

SPREAD_KEY = 'marriage'
POSITION_NUM = 1
LOG_FILE = f'translation-{SPREAD_KEY}-position{POSITION_NUM}.log'
PROGRESS_FILE = f'translation-{SPREAD_KEY}-position{POSITION_NUM}-progress.json'

def log(message, level='INFO'):
    """Log mesajı hem ekrana hem dosyaya yaz"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_message = f'[{timestamp}] [{level}] {message}'
    print(message)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(log_message + '\n')

def save_progress(card_key, current, total):
    """İlerlemeyi kaydet"""
    progress = {
        'last_card': card_key,
        'current': current,
        'total': total,
        'timestamp': datetime.now().isoformat()
    }
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2)

def load_progress():
    """Önceki ilerlemeyi yükle"""
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return None
    return None

def translate_text(text, target_lang, retry=3):
    """Metni hedef dile çevir (retry mekanizmalı)"""
    if not text or len(text.strip()) == 0:
        return text
    
    for attempt in range(retry):
        try:
            result = translator.translate(text, dest=target_lang, src='tr')
            return result.text
        except Exception as e:
            if attempt < retry - 1:
                wait_time = (attempt + 1) * 2
                log(f"    ⚠️  Çeviri hatası (deneme {attempt + 1}/{retry}): {e}", 'WARN')
                log(f"    ⏳ {wait_time} saniye bekleniyor...", 'WARN')
                time.sleep(wait_time)
            else:
                log(f"    ❌ Çeviri başarısız oldu: {e}", 'ERROR')
                return text
    return text

def translate_keywords(keywords_str, target_lang):
    """Anahtar kelimeleri çevir (JSON string formatında)"""
    if not keywords_str:
        return keywords_str
    
    # Eğer string ise parse et
    try:
        if isinstance(keywords_str, str):
            keywords = json.loads(keywords_str)
        else:
            keywords = keywords_str
    except:
        log(f"    ⚠️  Keywords parse edilemedi, orijinal döndürülüyor", 'WARN')
        return keywords_str
    
    if not isinstance(keywords, list):
        return keywords_str
    
    translated = []
    for keyword in keywords:
        result = translate_text(keyword, target_lang, retry=2)
        translated.append(result)
        time.sleep(0.3)
    
    # JSON string olarak döndür
    return json.dumps(translated, ensure_ascii=False)

def main():
    # Log dosyasını temizle
    if os.path.exists(LOG_FILE):
        os.remove(LOG_FILE)
    
    log("=" * 70)
    log(f"🔮 MARRIAGE POSITION-{POSITION_NUM} GOOGLE TRANSLATE ÇEVİRİ ARACI")
    log("=" * 70)
    
    # Önceki ilerlemeyi kontrol et
    progress = load_progress()
    start_from = 0
    if progress:
        log(f"\n📋 Önceki ilerleme bulundu: {progress['current']}/{progress['total']} kart")
        log(f"   Son işlenen kart: {progress['last_card']}")
        log(f"✓ Otomatik olarak kaldığı yerden devam ediliyor...")
        start_from = progress['current']
    
    # Türkçe dosyayı oku
    log("\n📖 Türkçe dosya okunuyor...")
    try:
        with open('messages/tr.json', 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
    except FileNotFoundError:
        log("❌ messages/tr.json bulunamadı!", 'ERROR')
        sys.exit(1)
    
    if SPREAD_KEY not in tr_data or 'meanings' not in tr_data[SPREAD_KEY]:
        log(f"❌ {SPREAD_KEY}.meanings bulunamadı!", 'ERROR')
        sys.exit(1)
    
    en_data = {SPREAD_KEY: {"meanings": {}}}
    sr_data = {SPREAD_KEY: {"meanings": {}}}
    
    # Position kartlarını çevir
    log(f"\n🃏 Position-{POSITION_NUM} kart anlamları çeviriliyor (78 kart)...")
    log("⏱️  Tahmini süre: 30-45 dakika")
    log("🔤 Sırpça: Latin alfabesi")
    log("📁 Log dosyası: " + LOG_FILE)
    log("=" * 70)
    
    total_cards = len(tr_data[SPREAD_KEY]['meanings'])
    current = 0
    start_time = time.time()
    cards_list = list(tr_data[SPREAD_KEY]['meanings'].items())
    
    for card_key, card_data in cards_list:
        current += 1
        
        # Eğer resume ediliyorsa ve henüz o kartaya gelmediyse atla
        if current <= start_from:
            continue
        
        elapsed = time.time() - start_time
        
        log(f"\n[{current}/{total_cards}] {card_key}")
        
        # Süre tahmini (sadece işlem yapılmışsa)
        if current > start_from + 1:
            avg_time = elapsed / (current - start_from)
            remaining = avg_time * (total_cards - current)
            log(f"⏱️  Geçen: {int(elapsed/60)}dk {int(elapsed%60)}sn | Kalan: ~{int(remaining/60)}dk {int(remaining%60)}sn")
        
        pos_key = f'position{POSITION_NUM}'
        if pos_key not in card_data:
            log(f"  ⚠️  {pos_key} bulunamadı, atlanıyor", 'WARN')
            continue
        
        pos_data = card_data[pos_key]
        
        try:
            # İngilizce
            log("  → İngilizce çeviriliyor...")
            en_upright = translate_text(pos_data.get('upright', ''), 'en')
            time.sleep(0.5)
            en_reversed = translate_text(pos_data.get('reversed', ''), 'en')
            time.sleep(0.5)
            en_keywords = translate_keywords(pos_data.get('keywords', ''), 'en')
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
            log("  → Sırpça (Latin) çeviriliyor...")
            sr_upright = translate_text(pos_data.get('upright', ''), 'sr')
            time.sleep(0.5)
            sr_reversed = translate_text(pos_data.get('reversed', ''), 'sr')
            time.sleep(0.5)
            sr_keywords = translate_keywords(pos_data.get('keywords', ''), 'sr')
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
            
            log(f"  ✅ {card_key} tamamlandı")
            
            # İlerlemeyi kaydet
            save_progress(card_key, current, total_cards)
            
            # Her 10 kartta bir ara dosya kaydet
            if current % 10 == 0:
                log(f"\n💾 Ara kayıt yapılıyor (Kart {current}/{total_cards})...")
                save_intermediate_files(en_data, sr_data)
                
        except Exception as e:
            log(f"  ❌ HATA: {card_key} işlenirken hata oluştu: {e}", 'ERROR')
            log(f"  ⚠️  Bu kart atlanıyor, devam ediliyor...", 'WARN')
            continue

def save_intermediate_files(en_data, sr_data):
    """Ara kayıt yap"""
    try:
        # Mevcut dosyaları oku ve merge et
        try:
            with open('messages/en.json', 'r', encoding='utf-8') as f:
                existing_en = json.load(f)
        except:
            existing_en = {}
        
        try:
            with open('messages/sr.json', 'r', encoding='utf-8') as f:
                existing_sr = json.load(f)
        except:
            existing_sr = {}
        
        # Merge
        if SPREAD_KEY not in existing_en:
            existing_en[SPREAD_KEY] = {}
        if 'meanings' not in existing_en[SPREAD_KEY]:
            existing_en[SPREAD_KEY]['meanings'] = {}
        
        for card_key, card_data in en_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_en[SPREAD_KEY]['meanings']:
                existing_en[SPREAD_KEY]['meanings'][card_key] = {}
            existing_en[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        if SPREAD_KEY not in existing_sr:
            existing_sr[SPREAD_KEY] = {}
        if 'meanings' not in existing_sr[SPREAD_KEY]:
            existing_sr[SPREAD_KEY]['meanings'] = {}
        
        for card_key, card_data in sr_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_sr[SPREAD_KEY]['meanings']:
                existing_sr[SPREAD_KEY]['meanings'][card_key] = {}
            existing_sr[SPREAD_KEY]['meanings'][card_key].update(card_data)
        
        # Kaydet
        with open('messages/en.json', 'w', encoding='utf-8') as f:
            json.dump(existing_en, f, ensure_ascii=False, indent=2)
        
        with open('messages/sr.json', 'w', encoding='utf-8') as f:
            json.dump(existing_sr, f, ensure_ascii=False, indent=2)
        
        log("  ✓ Ara kayıt başarılı")
    except Exception as e:
        log(f"  ⚠️  Ara kayıt hatası: {e}", 'WARN')

# save_intermediate_files fonksiyonu burada bitiyor, main() devam ediyor

    # Son kayıt
    log("\n📝 Son dosyalar merge ediliyor...")
    save_intermediate_files(en_data, sr_data)
    
    total_time = time.time() - start_time
    
    log("\n" + "=" * 70)
    log("✅ TÜM ÇEVİRİLER TAMAMLANDI!")
    log("=" * 70)
    log(f"📊 İngilizce: {len(en_data[SPREAD_KEY]['meanings'])} kart")
    log(f"📊 Sırpça (Latin): {len(sr_data[SPREAD_KEY]['meanings'])} kart")
    log(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    log(f"\n📁 Dosyalar:")
    log(f"  - messages/en.json")
    log(f"  - messages/sr.json")
    log(f"  - {LOG_FILE} (log)")
    log(f"\n🎉 Position-{POSITION_NUM} çevirileri başarıyla tamamlandı!")
    log("=" * 70)
    
    # Progress dosyasını temizle
    if os.path.exists(PROGRESS_FILE):
        os.remove(PROGRESS_FILE)

if __name__ == '__main__':
    main()

