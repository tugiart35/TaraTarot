#!/usr/bin/env python3
"""
Google Translate kullanarak money position-1 anahtarlarını
Türkçe'den İngilizce ve Sırpça (Latin)'ya çevirir
✨ DUPLICATE-SAFE VERSİYON - Sadece eksik çevirileri yapar
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

# ÇEVİRİ MODU: 'only_missing', 'overwrite', 'ask'
TRANSLATE_MODE = 'only_missing'  # Varsayılan: sadece eksikleri çevir

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
        json_string = json.dumps(data, ensure_ascii=False, indent=2)
        json.loads(json_string)
        
        with open(temp_path, 'w', encoding='utf-8') as f:
            f.write(json_string)
        
        with open(temp_path, 'r', encoding='utf-8') as f:
            json.load(f)
        
        shutil.move(temp_path, file_path)
        
        print(f"  ✅ {os.path.basename(file_path)} güvenli şekilde kaydedildi")
        return True
    except Exception as e:
        print(f"  ❌ Yazma hatası: {e}")
        
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return False

def cleanup_old_backups(directory, base_name, keep_count=5):
    """Eski backup'ları temizle"""
    try:
        backup_pattern = f"{base_name}.backup-"
        backups = sorted(
            [f for f in os.listdir(directory) if f.startswith(backup_pattern)],
            key=lambda x: os.path.getmtime(os.path.join(directory, x)),
            reverse=True
        )
        
        for backup in backups[keep_count:]:
            backup_path = os.path.join(directory, backup)
            os.remove(backup_path)
            print(f"🗑️  Eski backup silindi: {backup}")
    except Exception as e:
        print(f"⚠️  Backup temizleme hatası: {e}")

def save_progress(data, lang, card_count):
    """İlerleme durumunu kaydet"""
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

def cleanup_progress_files():
    """Progress dosyalarını temizle"""
    for lang in ['en', 'sr']:
        progress_file = f"messages/.progress-{lang}-pos{POSITION_NUM}.json"
        if os.path.exists(progress_file):
            os.remove(progress_file)
            print(f"🗑️  Progress dosyası temizlendi: {os.path.basename(progress_file)}")

# ═══════════════════════════════════════════════════════════
# DUPLICATE KONTROL FONKSİYONLARI
# ═══════════════════════════════════════════════════════════

def is_translated(pos_data):
    """Position verisinin çevrilmiş olup olmadığını kontrol et"""
    if not pos_data:
        return False
    
    # En az bir alan doluysa çevrilmiş sayılır
    has_upright = pos_data.get('upright', '').strip() != ''
    has_reversed = pos_data.get('reversed', '').strip() != ''
    has_keywords = len(pos_data.get('keywords', [])) > 0
    
    return has_upright or has_reversed or has_keywords

def needs_translation(card_key, pos_key, existing_data):
    """Kartın çevrilmeye ihtiyacı olup olmadığını kontrol et"""
    if SPREAD_KEY not in existing_data:
        return True
    
    if 'meanings' not in existing_data[SPREAD_KEY]:
        return True
    
    if card_key not in existing_data[SPREAD_KEY]['meanings']:
        return True
    
    if pos_key not in existing_data[SPREAD_KEY]['meanings'][card_key]:
        return True
    
    # Varolan veriyi kontrol et
    existing_pos = existing_data[SPREAD_KEY]['meanings'][card_key][pos_key]
    
    if TRANSLATE_MODE == 'overwrite':
        return True  # Her zaman çevir
    elif TRANSLATE_MODE == 'only_missing':
        return not is_translated(existing_pos)  # Sadece boşsa çevir
    
    return True

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
    print(f"🔮 MONEY POSITION-{POSITION_NUM} ÇEVİRİ ARACI (Duplicate-Safe)")
    print(f"🛡️  Çeviri Modu: {TRANSLATE_MODE}")
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
    
    # Mevcut çevirileri oku
    print("📖 Mevcut çeviriler kontrol ediliyor...")
    
    existing_en = {}
    if os.path.exists('messages/en.json'):
        with open('messages/en.json', 'r', encoding='utf-8') as f:
            existing_en = json.load(f)
    
    existing_sr = {}
    if os.path.exists('messages/sr.json'):
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            existing_sr = json.load(f)
    
    # Çevrilecek kartları filtrele
    pos_key = f'position{POSITION_NUM}'
    cards_to_translate = {}
    
    for card_key, card_data in tr_data[SPREAD_KEY]['meanings'].items():
        if pos_key not in card_data:
            continue
        
        # EN veya SR'de eksikse çevrilecekler listesine ekle
        needs_en = needs_translation(card_key, pos_key, existing_en)
        needs_sr = needs_translation(card_key, pos_key, existing_sr)
        
        if needs_en or needs_sr:
            cards_to_translate[card_key] = {
                'data': card_data,
                'needs_en': needs_en,
                'needs_sr': needs_sr
            }
    
    total_cards_source = len([k for k, v in tr_data[SPREAD_KEY]['meanings'].items() if pos_key in v])
    total_to_translate = len(cards_to_translate)
    
    print(f"✅ Toplam kart (TR): {total_cards_source}")
    print(f"📝 Çevrilecek kart: {total_to_translate}")
    print(f"⏭️  Atlanan (zaten çevrilmiş): {total_cards_source - total_to_translate}")
    
    if total_to_translate == 0:
        print(f"\n🎉 Tüm kartlar zaten çevrilmiş! İşlem tamamlandı.")
        print(f"💡 İpucu: Üzerine yazmak için TRANSLATE_MODE='overwrite' kullanın.")
        sys.exit(0)
    
    # 🛡️ BACKUP OLUŞTUR
    print("\n🛡️  Güvenlik önlemleri alınıyor...")
    create_backup('messages/en.json')
    create_backup('messages/sr.json')
    
    # Yapıları hazırla
    if SPREAD_KEY not in existing_en:
        existing_en[SPREAD_KEY] = {}
    if 'meanings' not in existing_en[SPREAD_KEY]:
        existing_en[SPREAD_KEY]['meanings'] = {}
    
    if SPREAD_KEY not in existing_sr:
        existing_sr[SPREAD_KEY] = {}
    if 'meanings' not in existing_sr[SPREAD_KEY]:
        existing_sr[SPREAD_KEY]['meanings'] = {}
    
    print(f"\n🃏 Çeviriler başlıyor...")
    print(f"⏱️  Tahmini süre: {int(total_to_translate * 0.5)} - {int(total_to_translate * 0.7)} dakika")
    print("=" * 80)
    
    start_time = time.time()
    current = 0
    stats = {'en_translated': 0, 'en_skipped': 0, 'sr_translated': 0, 'sr_skipped': 0}
    
    for card_key, card_info in cards_to_translate.items():
        current += 1
        elapsed = time.time() - start_time
        
        print_progress_bar(current - 1, total_to_translate, 
                          prefix=f'[{current}/{total_to_translate}]', 
                          suffix=f'{card_key[:15]:<15}')
        
        if current > 1:
            avg_time = elapsed / (current - 1)
            remaining = avg_time * (total_to_translate - current)
            time_info = f"⏱️  {int(elapsed/60)}:{int(elapsed%60):02d} / ~{int(remaining/60)}:{int(remaining%60):02d}"
        else:
            time_info = "⏱️  Başlıyor..."
        
        print(f"\n{time_info} | [{current}/{total_to_translate}] 📌 {card_key}")
        
        pos_data = card_info['data'][pos_key]
        needs_en = card_info['needs_en']
        needs_sr = card_info['needs_sr']
        
        # İngilizce
        if needs_en:
            print("  🇬🇧 EN: Çevriliyor... ", end='', flush=True)
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
            
            if card_key not in existing_en[SPREAD_KEY]['meanings']:
                existing_en[SPREAD_KEY]['meanings'][card_key] = {}
            
            existing_en[SPREAD_KEY]['meanings'][card_key][pos_key] = {
                'upright': en_upright,
                'reversed': en_reversed,
                'keywords': en_keywords,
                'context': en_context
            }
            stats['en_translated'] += 1
        else:
            print("  🇬🇧 EN: ⏭️  Zaten çevrilmiş, atlandı")
            stats['en_skipped'] += 1
        
        # Sırpça
        if needs_sr:
            print("  🇷🇸 SR: Çevriliyor... ", end='', flush=True)
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
            
            if card_key not in existing_sr[SPREAD_KEY]['meanings']:
                existing_sr[SPREAD_KEY]['meanings'][card_key] = {}
            
            existing_sr[SPREAD_KEY]['meanings'][card_key][pos_key] = {
                'upright': sr_upright,
                'reversed': sr_reversed,
                'keywords': sr_keywords,
                'context': sr_context
            }
            stats['sr_translated'] += 1
        else:
            print("  🇷🇸 SR: ⏭️  Zaten çevrilmiş, atlandı")
            stats['sr_skipped'] += 1
        
        # Her 10 kartta bir progress kaydet
        if current % 10 == 0:
            print(f"  💾 İlerleme kaydediliyor... ({current}/{total_to_translate})")
            save_progress(existing_en, 'en', current)
            save_progress(existing_sr, 'sr', current)
    
    print_progress_bar(total_to_translate, total_to_translate, 
                      prefix=f'[{total_to_translate}/{total_to_translate}]', 
                      suffix='Tamamlandı! ✨')
    
    # 🛡️ ATOMIC WRITE ile kaydet
    print("\n💾 Dosyalar güvenli şekilde kaydediliyor...")
    
    en_success = safe_write_json('messages/en.json', existing_en)
    sr_success = safe_write_json('messages/sr.json', existing_sr)
    
    if not (en_success and sr_success):
        print("\n❌ Bazı dosyalar kaydedilemedi! Backup dosyaları korundu.")
        sys.exit(1)
    
    # Temizlik
    cleanup_old_backups('messages', 'en.json', 5)
    cleanup_old_backups('messages', 'sr.json', 5)
    cleanup_progress_files()
    
    total_time = time.time() - start_time
    end_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print("\n" + "=" * 80)
    print("✅ ÇEVİRİLER GÜVENLİ ŞEKİLDE TAMAMLANDI!")
    print("=" * 80)
    print(f"⏰ Başlangıç: {start_time_str}")
    print(f"⏰ Bitiş:     {end_time_str}")
    print(f"⏱️  Toplam süre: {int(total_time/60)} dakika {int(total_time%60)} saniye")
    print(f"\n📊 İstatistikler:")
    print(f"  🇬🇧 İngilizce:")
    print(f"     ✅ Çevrilen: {stats['en_translated']}")
    print(f"     ⏭️  Atlanan: {stats['en_skipped']}")
    print(f"  🇷🇸 Sırpça:")
    print(f"     ✅ Çevrilen: {stats['sr_translated']}")
    print(f"     ⏭️  Atlanan: {stats['sr_skipped']}")
    
    if total_to_translate > 0:
        print(f"\n⚡ Ortalama: {total_time/total_to_translate:.1f} saniye/kart")
    
    print(f"\n📁 Dosyalar:")
    print(f"  - messages/en.json")
    print(f"  - messages/sr.json")
    print(f"\n🎉 Position-{POSITION_NUM} çevirileri tamamlandı!")
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