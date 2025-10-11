#!/usr/bin/env python3
"""
Google Translate kullanarak money position-1 anahtarlarını
Türkçe'den İngilizce ve Sırpça (Latin)'ya çevirir
✨ GÜVENLİK İYİLEŞTİRMELERİ EKLENMIŞ VERSİYON
"""

import json
import time
import sys
import os
import shutil
from datetime import datetime
from pathlib import Path

try:
    from googletrans import Translator
except ImportError:
    print("❌ googletrans kütüphanesi bulunamadı!")
    print("📦 Yüklemek için: pip install googletrans==4.0.0rc1")
    sys.exit(1)

translator = Translator()

SPREAD_KEY = 'money'
POSITION_NUM = 1

# ═══════════════════════════════════════════════════════════
# GÜVENLİK FONKSİYONLARI
# ═══════════════════════════════════════════════════════════

def create_backup(file_path):
    """Timestamp ile backup oluştur"""
    if not os.path.exists(file_path):
        return None
    
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_path = f"{file_path}.backup-{timestamp}"
    
    try:
        shutil.copy2(file_path, backup_path)
        print(f"💾 Backup: {os.path.basename(backup_path)}")
        return backup_path
    except Exception as e:
        print(f"❌ Backup hatası: {e}")
        return None

def safe_write_json(file_path, data):
    """Atomic write: temp dosyaya yaz, sonra rename et"""
    temp_path = f"{file_path}.tmp"
    
    try:
        # 1. JSON string oluştur
        json_string = json.dumps(data, ensure_ascii=False, indent=2)
        
        # 2. JSON geçerliliğini test et
        json.loads(json_string)
        
        # 3. Temp dosyaya yaz
        with open(temp_path, 'w', encoding='utf-8') as f:
            f.write(json_string)
        
        # 4. Temp dosyayı oku ve tekrar validate et
        with open(temp_path, 'r', encoding='utf-8') as f:
            json.load(f)
        
        # 5. Başarılıysa, atomic rename
        shutil.move(temp_path, file_path)
        
        print(f"  ✅ {os.path.basename(file_path)} güvenli şekilde kaydedildi")
        return True
    except Exception as e:
        print(f"  ❌ Yazma hatası: {e}")
        
        # Temp dosyayı temizle
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return False

def deep_merge(target, source):
    """Deep merge: nested dict'leri dikkatlice birleştir"""
    result = target.copy()
    
    for key, value in source.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    
    return result

def cleanup_old_backups(directory, base_name, keep_count=5):
    """Eski backup'ları temizle (son keep_count'u koru)"""
    try:
        backup_pattern = f"{base_name}.backup-"
        backups = sorted(
            [f for f in os.listdir(directory) if f.startswith(backup_pattern)],
            key=lambda x: os.path.getmtime(os.path.join(directory, x)),
            reverse=True
        )
        
        # Son keep_count'u koru, gerisini sil
        for backup in backups[keep_count:]:
            backup_path = os.path.join(directory, backup)
            os.remove(backup_path)
            print(f"🗑️  Eski backup silindi: {backup}")
    except Exception as e:
        print(f"⚠️  Backup temizleme hatası: {e}")

def save_progress(data, lang, card_count):
    """İlerleme durumunu kaydet (crash recovery için)"""
    progress_file = f"messages/.progress-{lang}-pos{POSITION_NUM}.json"
    try:
        with open(progress_file, 'w', encoding='utf-8') as f:
            json.dump({
                'data': data,
                'card_count': card_count,
                'timestamp': datetime.now().isoformat(),
                'spread': SPREAD_KEY,
                'position': POSITION_NUM
            }, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"  ⚠️  Progress kayıt hatası: {e}")

def load_progress(lang):
    """Önceki ilerleme durumunu yükle"""
    progress_file = f"messages/.progress-{lang}-pos{POSITION_NUM}.json"
    if os.path.exists(progress_file):
        try:
            with open(progress_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return None
    return None

def cleanup_progress_files():
    """Progress dosyalarını temizle"""
    for lang in ['en', 'sr']:
        progress_file = f"messages/.progress-{lang}-pos{POSITION_NUM}.json"
        if os.path.exists(progress_file):
            os.remove(progress_file)
            print(f"🗑️  Progress dosyası temizlendi: {os.path.basename(progress_file)}")

# ═══════════════════════════════════════════════════════════
# ÇEVİRİ FONKSİYONLARI
# ═══════════════════════════════════════════════════════════

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
        return result.text
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

# ═══════════════════════════════════════════════════════════
# ANA PROGRAM
# ═══════════════════════════════════════════════════════════

def main():
    start_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("=" * 80)
    print(f"🔮 MONEY POSITION-{POSITION_NUM} ÇEVİRİ ARACI (Güvenli Versiyon)")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    
    # Türkçe dosyayı oku
    print("\n📖 Türkçe dosya okunuyor...")
    tr_json_path = 'messages/tr.json'
    
    try:
        with open(tr_json_path, 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
    except FileNotFoundError:
        print("❌ messages/tr.json bulunamadı!")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ tr.json parse hatası: {e}")
        sys.exit(1)
    
    if SPREAD_KEY not in tr_data or 'meanings' not in tr_data[SPREAD_KEY]:
        print(f"❌ {SPREAD_KEY}.meanings bulunamadı!")
        sys.exit(1)
    
    # Filtreleme: Sadece position verisi olan kartları al
    cards_to_translate = {}
    for card_key, card_data in tr_data[SPREAD_KEY]['meanings'].items():
        if f'position{POSITION_NUM}' in card_data:
            cards_to_translate[card_key] = card_data
    
    total_cards = len(cards_to_translate)
    print(f"✅ {total_cards} kart bulundu (position{POSITION_NUM})")
    
    if total_cards == 0:
        print(f"⚠️  Position{POSITION_NUM} verisi bulunamadı!")
        sys.exit(1)
    
    # 🛡️ BACKUP OLUŞTUR
    print("\n🛡️  Güvenlik önlemleri alınıyor...")
    create_backup('messages/en.json')
    create_backup('messages/sr.json')
    
    en_data = {SPREAD_KEY: {"meanings": {}}}
    sr_data = {SPREAD_KEY: {"meanings": {}}}
    
    print(f"\n🃏 Çeviriler başlıyor...")
    print(f"⏱️  Tahmini süre: {int(total_cards * 0.5)} - {int(total_cards * 0.7)} dakika")
    print(f"🔤 Hedef diller: İngilizce (EN), Sırpça Latin (SR)")
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
        
        # Sırpça (Latin)
        print("  🇷🇸 SR: ", end='', flush=True)
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
        
        # 🛡️ Her 10 kartta bir progress kaydet
        if current % 10 == 0:
            print(f"  💾 İlerleme kaydediliyor... ({current}/{total_cards})")
            save_progress(en_data, 'en', current)
            save_progress(sr_data, 'sr', current)
    
    # Final progress bar
    print_progress_bar(total_cards, total_cards, 
                      prefix=f'[{total_cards}/{total_cards}]', 
                      suffix='Tamamlandı! ✨')
    
    # 🛡️ Mevcut dosyalarla DEEP MERGE et
    print("\n📝 Dosyalar güvenli şekilde merge ediliyor...")
    
    # İngilizce
    try:
        existing_en = {}
        if os.path.exists('messages/en.json'):
            with open('messages/en.json', 'r', encoding='utf-8') as f:
                existing_en = json.load(f)
        
        if SPREAD_KEY not in existing_en:
            existing_en[SPREAD_KEY] = {}
        if 'meanings' not in existing_en[SPREAD_KEY]:
            existing_en[SPREAD_KEY]['meanings'] = {}
        
        # 🛡️ DEEP MERGE: Sadece bu position'ı güncelle
        for card_key, card_data in en_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_en[SPREAD_KEY]['meanings']:
                existing_en[SPREAD_KEY]['meanings'][card_key] = {}
            # Diğer position'ları koru
            existing_en[SPREAD_KEY]['meanings'][card_key][f'position{POSITION_NUM}'] = card_data[f'position{POSITION_NUM}']
        
        print("  ✅ en.json merge edildi")
    except Exception as e:
        print(f"  ⚠️  en.json hata: {e}")
        existing_en = en_data
    
    # Sırpça
    try:
        existing_sr = {}
        if os.path.exists('messages/sr.json'):
            with open('messages/sr.json', 'r', encoding='utf-8') as f:
                existing_sr = json.load(f)
        
        if SPREAD_KEY not in existing_sr:
            existing_sr[SPREAD_KEY] = {}
        if 'meanings' not in existing_sr[SPREAD_KEY]:
            existing_sr[SPREAD_KEY]['meanings'] = {}
        
        # 🛡️ DEEP MERGE: Sadece bu position'ı güncelle
        for card_key, card_data in sr_data[SPREAD_KEY]['meanings'].items():
            if card_key not in existing_sr[SPREAD_KEY]['meanings']:
                existing_sr[SPREAD_KEY]['meanings'][card_key] = {}
            # Diğer position'ları koru
            existing_sr[SPREAD_KEY]['meanings'][card_key][f'position{POSITION_NUM}'] = card_data[f'position{POSITION_NUM}']
        
        print("  ✅ sr.json merge edildi")
    except Exception as e:
        print(f"  ⚠️  sr.json hata: {e}")
        existing_sr = sr_data
    
    # 🛡️ ATOMIC WRITE ile kaydet
    print("\n💾 Dosyalar güvenli şekilde kaydediliyor...")
    
    en_success = safe_write_json('messages/en.json', existing_en)
    sr_success = safe_write_json('messages/sr.json', existing_sr)
    
    if not (en_success and sr_success):
        print("\n❌ Bazı dosyalar kaydedilemedi! Backup dosyaları korundu.")
        sys.exit(1)
    
    # 🛡️ Eski backup'ları temizle
    cleanup_old_backups('messages', 'en.json', 5)
    cleanup_old_backups('messages', 'sr.json', 5)
    
    # 🛡️ Progress dosyalarını temizle
    cleanup_progress_files()
    
    total_time = time.time() - start_time
    end_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print("\n" + "=" * 80)
    print("✅ TÜM ÇEVİRİLER GÜVENLİ ŞEKİLDE TAMAMLANDI!")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    print(f"⏰ Bitiş:     {end_time_str}")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"📊 İngilizce: {len(en_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Sırpça (Latin): {len(sr_data[SPREAD_KEY]['meanings'])} kart")
    print(f"📊 Ortalama: {total_time/total_cards:.1f} saniye/kart")
    print(f"\n📁 Dosyalar:")
    print(f"  - messages/en.json")
    print(f"  - messages/sr.json")
    print(f"\n💾 Backup dosyaları korundu (son 5 backup)")
    print(f"\n🎉 Position-{POSITION_NUM} çevirileri başarıyla tamamlandı!")
    print("=" * 80)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Kullanıcı tarafından durduruldu!")
        print("💡 İpucu: Progress dosyalarından kurtarma yapılabilir.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Beklenmeyen hata: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)