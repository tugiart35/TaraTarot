#!/usr/bin/env python3
"""
Deep Translator kullanarak tr.json'u en.json ve sr.json'a çevirir.
- Anahtarları korur
- Duplicate çevirileri önler (cache kullanır)
- Sırpça Latin alfabesi kullanır (Kiril değil)
- Nested JSON yapısını korur
- Google Translate API ücretsiz kullanır
"""

import json
import os
import time
from pathlib import Path
from deep_translator import GoogleTranslator
from collections import OrderedDict

# Renk kodları
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_info(msg):
    print(f"{Colors.OKCYAN}ℹ️  {msg}{Colors.ENDC}")

def print_success(msg):
    print(f"{Colors.OKGREEN}✅ {msg}{Colors.ENDC}")

def print_error(msg):
    print(f"{Colors.FAIL}❌ {msg}{Colors.ENDC}")

def print_warning(msg):
    print(f"{Colors.WARNING}⚠️  {msg}{Colors.ENDC}")

def print_progress(current, total, lang, speed=0, eta_seconds=0):
    percentage = (current / total) * 100
    bar_length = 40
    filled = int(bar_length * current / total)
    bar = '█' * filled + '░' * (bar_length - filled)
    
    # Hız ve ETA bilgisi
    speed_str = f"{speed:.1f} çev/sn" if speed > 0 else ""
    eta_str = ""
    if eta_seconds > 0:
        minutes = int(eta_seconds // 60)
        seconds = int(eta_seconds % 60)
        eta_str = f"ETA: {minutes}d {seconds}s"
    
    info_str = f"{speed_str} {eta_str}".strip()
    
    print(f"\r{Colors.OKBLUE}{lang}: [{bar}] {percentage:.1f}% ({current}/{total}) {info_str}{Colors.ENDC}", end='', flush=True)

class JSONTranslator:
    def __init__(self):
        self.cache = {}  # Duplicate önleme için cache
        self.total_translations = 0
        self.cache_hits = 0
        self.checkpoint_interval = 100  # Her 100 çeviride bir kaydet
        self.translations_since_save = 0
        
    def translate_text(self, text, target_lang):
        """Metni çevir ve cache'le"""
        if not isinstance(text, str) or not text.strip():
            return text
        
        # Özel metinleri çevirme (değişkenler, placeholders)
        if text.startswith('{') and text.endswith('}'):
            return text
        if text.startswith('{{') and text.endswith('}}'):
            return text
        if text.startswith('%') or text.startswith('$'):
            return text
            
        # Cache kontrolü
        cache_key = f"{text}:{target_lang}"
        if cache_key in self.cache:
            self.cache_hits += 1
            return self.cache[cache_key]
        
        # Çeviri
        try:
            if target_lang == "en":
                translator = GoogleTranslator(source='tr', target='en')
            elif target_lang == "sr":
                # Sırpça Latin alfabesi için
                translator = GoogleTranslator(source='tr', target='sr')
            else:
                return text
            
            translated = translator.translate(text)
            
            # Sırpça için Kiril'den Latin'e dönüşüm (gerekirse)
            if target_lang == "sr":
                translated = self.cyrillic_to_latin(translated)
            
            # Cache'e ekle
            self.cache[cache_key] = translated
            self.total_translations += 1
            
            # Rate limiting - Google Translate'i aşırı yüklememek için
            time.sleep(0.1)
            
            return translated
            
        except Exception as e:
            print_warning(f"Çeviri hatası: {text[:50]}... -> {str(e)}")
            return text
    
    def cyrillic_to_latin(self, text):
        """Kiril alfabesini Latin alfabesine çevir"""
        cyrillic_to_latin_map = {
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
            'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š'
        }
        
        result = []
        for char in text:
            result.append(cyrillic_to_latin_map.get(char, char))
        return ''.join(result)
    
    def count_strings(self, obj):
        """JSON'daki toplam string sayısını say"""
        if isinstance(obj, dict):
            return sum(self.count_strings(v) for v in obj.values())
        elif isinstance(obj, list):
            return sum(self.count_strings(item) for item in obj)
        elif isinstance(obj, str):
            return 1
        else:
            return 0
    
    def merge_translations(self, source, existing):
        """Kaynak ve mevcut çevirileri birleştir - mevcut çevirileri koru"""
        if isinstance(source, dict) and isinstance(existing, dict):
            result = OrderedDict()
            for key in source.keys():
                if key in existing:
                    # Recursive merge
                    result[key] = self.merge_translations(source[key], existing[key])
                else:
                    # Yeni key, kaynak datayı al (henüz çevrilmemiş)
                    result[key] = source[key]
            return result
        elif isinstance(source, list) and isinstance(existing, list):
            # Listeler için index bazlı merge
            result = []
            for i, item in enumerate(source):
                if i < len(existing):
                    result.append(self.merge_translations(item, existing[i]))
                else:
                    result.append(item)
            return result
        elif isinstance(existing, str) and existing.strip():
            # Mevcut çeviri var, onu kullan
            return existing
        else:
            # Mevcut çeviri yok veya boş, kaynağı kullan
            return source
    
    def translate_json_recursive(self, obj, target_lang, progress_callback=None, path="", existing_translation=None):
        """JSON objesini recursive olarak çevir - mevcut çevirileri koru"""
        if isinstance(obj, dict):
            result = OrderedDict()
            for key, value in obj.items():
                current_path = f"{path}.{key}" if path else key
                existing_value = existing_translation.get(key) if isinstance(existing_translation, dict) else None
                result[key] = self.translate_json_recursive(value, target_lang, progress_callback, current_path, existing_value)
            return result
        elif isinstance(obj, list):
            result = []
            for i, item in enumerate(obj):
                existing_item = existing_translation[i] if isinstance(existing_translation, list) and i < len(existing_translation) else None
                result.append(self.translate_json_recursive(item, target_lang, progress_callback, f"{path}[{i}]", existing_item))
            return result
        elif isinstance(obj, str):
            # Eğer mevcut çeviri varsa ve boş değilse, onu kullan
            if isinstance(existing_translation, str) and existing_translation.strip():
                if progress_callback:
                    progress_callback(path, obj[:50], is_cached=True)
                self.cache_hits += 1
                return existing_translation
            else:
                # Yeni çeviri yap
                translated = self.translate_text(obj, target_lang)
                if progress_callback:
                    progress_callback(path, obj[:50], is_cached=False)
                self.translations_since_save += 1
                return translated
        else:
            return obj
    
    def translate_file(self, source_path, target_path, target_lang):
        """JSON dosyasını çevir - checkpoint ile resume desteği"""
        print(f"\n{Colors.BOLD}📝 {target_lang.upper()} Çevirisi Başlıyor...{Colors.ENDC}")
        
        # Kaynak dosyayı oku
        with open(source_path, 'r', encoding='utf-8') as f:
            source_data = json.load(f, object_pairs_hook=OrderedDict)
        
        # Mevcut çeviriyi yükle (varsa - resume için)
        existing_translation = OrderedDict()
        if target_path.exists():
            try:
                with open(target_path, 'r', encoding='utf-8') as f:
                    existing_translation = json.load(f, object_pairs_hook=OrderedDict)
                print_info(f"📂 Mevcut çeviri bulundu - kaldığınız yerden devam edilecek")
            except:
                print_warning(f"Mevcut çeviri okunamadı, baştan başlanacak")
        
        # Toplam string sayısını hesapla
        total_strings = self.count_strings(source_data)
        already_translated = self.count_strings(existing_translation) if existing_translation else 0
        remaining_strings = total_strings - already_translated
        
        print_info(f"📊 Toplam: {total_strings} metin")
        if already_translated > 0:
            print_info(f"✅ Zaten çevrilmiş: {already_translated} metin")
            print_info(f"⏳ Çevrilecek: {remaining_strings} metin")
        
        # Progress tracker
        import time as time_module
        current = [0]  # Liste kullanarak closure içinde değişken güncelleyebiliriz
        new_translations = [0]
        start_time = [time_module.time()]
        current_data = [None]  # Checkpoint için
        
        def save_checkpoint():
            """Ara kayıt yap"""
            if current_data[0]:
                print(f"\n💾 Checkpoint kaydediliyor... ", end='', flush=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    json.dump(current_data[0], f, ensure_ascii=False, indent=2)
                print(f"{Colors.OKGREEN}✓{Colors.ENDC}")
        
        def progress_callback(path, text_preview, is_cached=False):
            current[0] += 1
            if not is_cached:
                new_translations[0] += 1
            
            # Hız ve ETA hesapla
            elapsed = time_module.time() - start_time[0]
            speed = new_translations[0] / elapsed if elapsed > 0 else 0
            remaining = remaining_strings - new_translations[0]
            eta = remaining / speed if speed > 0 else 0
            
            # Her çeviriyi göster
            if current[0] % 5 == 0 or current[0] == total_strings:
                cache_info = f"[Cache: {self.cache_hits}]" if self.cache_hits > 0 else ""
                print_progress(current[0], total_strings, target_lang.upper(), speed, eta)
                
            # Her 50 çeviride bir path'i de göster
            if current[0] % 50 == 0 and not is_cached:
                print(f"\n   🔹 {path[:60]}: '{text_preview}...'")
            
            # Checkpoint kaydet
            if self.translations_since_save >= self.checkpoint_interval:
                save_checkpoint()
                self.translations_since_save = 0
        
        # Çevir
        self.cache.clear()  # Her dil için cache'i temizle
        self.cache_hits = 0
        self.translations_since_save = 0
        print()
        start_time[0] = time_module.time()  # Başlangıç zamanını kaydet
        translated_data = self.translate_json_recursive(source_data, target_lang, progress_callback, existing_translation=existing_translation)
        current_data[0] = translated_data  # Checkpoint için sakla
        
        # Son checkpoint
        if self.translations_since_save > 0:
            save_checkpoint()
        
        print()  # Yeni satır
        
        # Süre hesapla
        total_time = time_module.time() - start_time[0]
        minutes = int(total_time // 60)
        seconds = int(total_time % 60)
        
        # Final save
        print_info(f"💾 Son kayıt yapılıyor: {target_path.name}")
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        
        print_success(f"✨ {target_lang.upper()} çevirisi tamamlandı!")
        print_info(f"   📄 Dosya: {target_path}")
        print_info(f"   ⏱️  Süre: {minutes} dakika {seconds} saniye")
        print_info(f"   📊 Yeni çeviriler: {new_translations[0]}")
        if already_translated > 0:
            print_info(f"   ♻️  Resume edildi: {already_translated} çeviri atlandı")
        print_info(f"   🔄 Duplicate önlendi: {self.cache_hits} çeviri")
        if new_translations[0] > 0:
            print_info(f"   ⚡ Ortalama hız: {new_translations[0]/total_time:.1f} çeviri/saniye")

def main():
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}   🌍 JSON Çeviri Aracı - Google Translate{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")
    
    # Dosya yolları
    base_path = Path(__file__).parent.parent
    messages_path = base_path / "messages"
    
    tr_json_path = messages_path / "tr.json"
    en_json_path = messages_path / "en.json"
    sr_json_path = messages_path / "sr.json"
    
    # Kaynak dosya kontrolü
    if not tr_json_path.exists():
        print_error(f"Kaynak dosya bulunamadı: {tr_json_path}")
        return
    
    # Dosya boyutu hesapla
    file_size_mb = tr_json_path.stat().st_size / (1024 * 1024)
    
    print_info(f"📁 Kaynak dosya: {tr_json_path}")
    print_info(f"📏 Dosya boyutu: {file_size_mb:.2f} MB")
    
    # Yedek oluştur
    if en_json_path.exists():
        backup_path = messages_path / "en.json.backup"
        import shutil
        shutil.copy2(en_json_path, backup_path)
        print_info(f"💾 Yedek oluşturuldu: en.json.backup")
    
    if sr_json_path.exists():
        backup_path = messages_path / "sr.json.backup"
        import shutil
        shutil.copy2(sr_json_path, backup_path)
        print_info(f"💾 Yedek oluşturuldu: sr.json.backup")
    
    # Çevirici oluştur
    translator = JSONTranslator()
    
    # Çevirileri yap
    try:
        # İngilizce çevirisi
        translator.translate_file(tr_json_path, en_json_path, "en")
        
        # Sırpça çevirisi
        translator.translate_file(tr_json_path, sr_json_path, "sr")
        
        print(f"\n{Colors.OKGREEN}{Colors.BOLD}{'='*60}{Colors.ENDC}")
        print(f"{Colors.OKGREEN}{Colors.BOLD}   ✨ TÜM ÇEVİRİLER BAŞARIYLA TAMAMLANDI!{Colors.ENDC}")
        print(f"{Colors.OKGREEN}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")
        
        print_info(f"📄 İngilizce: {en_json_path}")
        print_info(f"📄 Sırpça (Latin): {sr_json_path}")
        
    except KeyboardInterrupt:
        print(f"\n{Colors.WARNING}İşlem kullanıcı tarafından iptal edildi{Colors.ENDC}")
    except Exception as e:
        print_error(f"Hata oluştu: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

