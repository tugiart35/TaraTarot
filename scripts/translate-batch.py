#!/usr/bin/env python3
"""
Batch Translation - 1000'erlik parçalara bölerek çeviri
EN ve SR'yi aynı anda çevirir ve her adımda kaydı onaylar
"""

import json
import os
import time
from pathlib import Path
from deep_translator import GoogleTranslator
from collections import OrderedDict
import sys

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

class BatchTranslator:
    def __init__(self):
        self.batch_size = 1000
        self.delay = 0.1  # Google Translate rate limit
        self.cache = {}  # Duplicate çeviri önleme
        self.cache_hits = 0  # Cache kullanım sayısı
        
    def cyrillic_to_latin(self, text):
        """Kiril'den Latin'e çevir (Sırpça için)"""
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
        return ''.join(cyrillic_to_latin_map.get(c, c) for c in text)
    
    def translate_text(self, text, target_lang, existing_translation=None):
        """Tek metni çevir - duplicate kontrolü ve retry ile"""
        if not isinstance(text, str) or not text.strip():
            return text
        
        # Özel metinleri atla
        if text.startswith('{') or text.startswith('%') or text.startswith('$'):
            return text
        
        # Eğer mevcut çeviri varsa kullan (duplicate önleme)
        if existing_translation and isinstance(existing_translation, str) and existing_translation.strip():
            self.cache_hits += 1
            return existing_translation
        
        # Cache kontrolü
        cache_key = f"{text}:{target_lang}"
        if cache_key in self.cache:
            self.cache_hits += 1
            return self.cache[cache_key]
        
        # Retry mekanizması
        max_retries = 3
        for attempt in range(max_retries):
            try:
                translator = GoogleTranslator(source='tr', target=target_lang)
                translated = translator.translate(text)
                
                if target_lang == 'sr':
                    translated = self.cyrillic_to_latin(translated)
                
                # Cache'e ekle
                self.cache[cache_key] = translated
                
                time.sleep(self.delay)
                return translated
                
            except Exception as e:
                if attempt < max_retries - 1:
                    # Retry - biraz daha uzun bekle
                    time.sleep(2 * (attempt + 1))
                else:
                    # Son deneme başarısız, orijinal metni kullan
                    print_warning(f"Çeviri hatası (3 deneme): {text[:30]}...")
                    return text
        
        return text
    
    def get_all_strings(self, obj, path=""):
        """Tüm string'leri path ile birlikte topla"""
        strings = []
        
        if isinstance(obj, dict):
            for key, value in obj.items():
                current_path = f"{path}.{key}" if path else key
                strings.extend(self.get_all_strings(value, current_path))
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                strings.extend(self.get_all_strings(item, f"{path}[{i}]"))
        elif isinstance(obj, str):
            strings.append((path, obj))
        
        return strings
    
    def set_by_path(self, obj, path, value):
        """Path ile değer ata - liste ve dict desteği ile"""
        parts = path.replace('[', '.').replace(']', '').split('.')
        parts = [p for p in parts if p]
        
        current = obj
        for i, part in enumerate(parts[:-1]):
            if part.isdigit():
                idx = int(part)
                # Liste olduğundan emin ol
                while len(current) <= idx:
                    current.append(None)
                if current[idx] is None:
                    # Bir sonraki part'a bak
                    next_part = parts[i + 1] if i + 1 < len(parts) else None
                    if next_part and next_part.isdigit():
                        current[idx] = []
                    else:
                        current[idx] = OrderedDict()
                current = current[idx]
            else:
                if part not in current:
                    # Bir sonraki part'a bak
                    next_part = parts[i + 1] if i + 1 < len(parts) else None
                    if next_part and next_part.isdigit():
                        current[part] = []
                    else:
                        current[part] = OrderedDict()
                current = current[part]
        
        last = parts[-1]
        if last.isdigit():
            idx = int(last)
            # Liste olduğundan emin ol
            if isinstance(current, list):
                while len(current) <= idx:
                    current.append(None)
                current[idx] = value
            else:
                current[idx] = value
        else:
            current[last] = value
    
    def get_value_by_path(self, obj, path):
        """Path ile değer al (mevcut çeviri için)"""
        try:
            parts = path.replace('[', '.').replace(']', '').split('.')
            parts = [p for p in parts if p]
            
            current = obj
            for part in parts:
                if part.isdigit():
                    current = current[int(part)]
                else:
                    current = current.get(part) if isinstance(current, dict) else None
                    if current is None:
                        return None
            return current
        except:
            return None
    
    def translate_batch(self, strings, start_idx, end_idx, target_lang, existing_data=None):
        """Belirli aralıktaki string'leri çevir - duplicate kontrolü ile"""
        batch = strings[start_idx:end_idx]
        translated = []
        batch_start = time.time()
        skipped = 0
        
        for i, (path, text) in enumerate(batch):
            # Mevcut çeviriyi al
            existing_trans = self.get_value_by_path(existing_data, path) if existing_data else None
            
            trans = self.translate_text(text, target_lang, existing_trans)
            
            if existing_trans and trans == existing_trans:
                skipped += 1
            
            translated.append((path, trans))
            
            # Canlı ilerleme
            current = i + 1
            total = len(batch)
            progress = (current / total) * 100
            
            # Hız ve ETA hesapla
            elapsed = time.time() - batch_start
            speed = current / elapsed if elapsed > 0 else 0
            remaining = total - current
            eta = remaining / speed if speed > 0 else 0
            
            # Progress bar
            bar_length = 30
            filled = int(bar_length * current / total)
            bar = '█' * filled + '░' * (bar_length - filled)
            
            # Her çeviride güncelle
            if current % 5 == 0 or current == total:
                skip_info = f"[Atlandı: {skipped}]" if skipped > 0 else ""
                print(f"  {Colors.OKBLUE}{target_lang.upper()}: [{bar}] {progress:.1f}% ({current}/{total}) {speed:.1f} çev/sn ETA: {int(eta)}s {skip_info}{Colors.ENDC}", end='\r')
            
            # Her 100 çeviride detay göster
            if current % 100 == 0 and not existing_trans:
                print(f"\n  🔹 {path[:60]}: '{text[:40]}...'", end='')
        
        print()  # Yeni satır
        
        return translated, skipped
    
    def apply_translations(self, base_data, translations):
        """Çevirileri base data'ya uygula - doğrudan çevirileri kullan"""
        import copy
        result = copy.deepcopy(base_data) if base_data else OrderedDict()
        
        for path, value in translations:
            try:
                self.set_by_path(result, path, value)
            except Exception as e:
                print_warning(f"Path uygulama hatası: {path} -> {str(e)}")
        
        return result
    
    def deep_merge(self, target, source):
        """İki dictionary'yi deep merge et"""
        for key, value in source.items():
            if key in target:
                if isinstance(target[key], dict) and isinstance(value, dict):
                    self.deep_merge(target[key], value)
                else:
                    target[key] = value
            else:
                target[key] = value
        return target
    
    def verify_save(self, file_path, data):
        """Dosyayı kaydet ve doğrula"""
        # Kaydet
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        # Doğrula
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                loaded = json.load(f)
            
            file_size = file_path.stat().st_size / 1024  # KB
            print_success(f"✓ {file_path.name} kaydedildi ve doğrulandı ({file_size:.1f} KB)")
            return True
        except:
            print_error(f"✗ {file_path.name} doğrulama BAŞARISIZ!")
            return False

def main():
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}   🚀 Batch Translation - 1000'erlik Parçalı Çeviri{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}\n")
    
    # Dosya yolları
    base_path = Path(__file__).parent.parent
    messages_path = base_path / "messages"
    
    tr_json = messages_path / "tr.json"
    en_json = messages_path / "en.json"
    sr_json = messages_path / "sr.json"
    
    # Kaynak dosyayı oku
    print_info(f"📁 Kaynak: {tr_json}")
    with open(tr_json, 'r', encoding='utf-8') as f:
        tr_data = json.load(f, object_pairs_hook=OrderedDict)
    
    # Mevcut batch dosyalarını kontrol et (duplicate önleme için)
    existing_batches = {}
    
    for batch_file in messages_path.glob("batch_*_en.json"):
        batch_num = int(batch_file.stem.split('_')[1])
        with open(batch_file, 'r', encoding='utf-8') as f:
            existing_batches[f'en_{batch_num}'] = json.load(f, object_pairs_hook=OrderedDict)
        print_info(f"📂 Batch {batch_num} EN yüklendi")
    
    for batch_file in messages_path.glob("batch_*_sr.json"):
        batch_num = int(batch_file.stem.split('_')[1])
        with open(batch_file, 'r', encoding='utf-8') as f:
            existing_batches[f'sr_{batch_num}'] = json.load(f, object_pairs_hook=OrderedDict)
        print_info(f"📂 Batch {batch_num} SR yüklendi")
    
    # Translator oluştur
    translator = BatchTranslator()
    
    # Tüm string'leri topla
    print_info("📊 String'ler toplanıyor...")
    all_strings = translator.get_all_strings(tr_data)
    total = len(all_strings)
    print_success(f"✓ Toplam {total} metin bulundu")
    
    # Batch'lere böl
    batch_size = 1000
    num_batches = (total + batch_size - 1) // batch_size
    
    print(f"\n{Colors.BOLD}📦 {num_batches} batch'te işlenecek (her batch {batch_size} metin){Colors.ENDC}\n")
    
    # Toplam ilerleme takibi
    total_start_time = time.time()
    completed_strings = 0
    
    # Her batch'i işle
    for batch_num in range(num_batches):
        # Bu batch zaten var mı kontrol et
        batch_en_file = messages_path / f"batch_{batch_num+1:02d}_en.json"
        batch_sr_file = messages_path / f"batch_{batch_num+1:02d}_sr.json"
        
        if batch_en_file.exists() and batch_sr_file.exists():
            print_info(f"⏭️  Batch {batch_num + 1}/{num_batches} zaten tamamlanmış - atlanıyor")
            completed_strings += min((batch_num + 1) * batch_size, total) - batch_num * batch_size
            continue
        
        start_idx = batch_num * batch_size
        end_idx = min(start_idx + batch_size, total)
        batch_size_actual = end_idx - start_idx
        
        # Toplam ilerleme
        overall_progress = (start_idx / total) * 100
        
        print(f"\n{Colors.BOLD}{'='*70}{Colors.ENDC}")
        print(f"{Colors.BOLD}📦 BATCH {batch_num + 1}/{num_batches} - Metinler {start_idx+1} - {end_idx}{Colors.ENDC}")
        print(f"{Colors.BOLD}   📊 Toplam İlerleme: %{overall_progress:.1f} ({start_idx}/{total}){Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*70}{Colors.ENDC}\n")
        
        start_time = time.time()
        
        # Bu batch için mevcut çevirileri al (varsa)
        batch_key_en = f'en_{batch_num + 1}'
        batch_key_sr = f'sr_{batch_num + 1}'
        
        existing_en = existing_batches.get(batch_key_en, None)
        existing_sr = existing_batches.get(batch_key_sr, None)
        
        # EN çevirisi
        print_info("🇬🇧 İngilizce çevirisi başlıyor...")
        en_translations, en_skipped = translator.translate_batch(all_strings, start_idx, end_idx, 'en', existing_en)
        print()
        
        # SR çevirisi
        print_info("🇷🇸 Sırpça (Latin) çevirisi başlıyor...")
        sr_translations, sr_skipped = translator.translate_batch(all_strings, start_idx, end_idx, 'sr', existing_sr)
        print()
        
        # Batch JSON dosyaları oluştur
        batch_en_data = OrderedDict()
        batch_sr_data = OrderedDict()
        
        for path, value in en_translations:
            translator.set_by_path(batch_en_data, path, value)
        
        for path, value in sr_translations:
            translator.set_by_path(batch_sr_data, path, value)
        
        # Batch dosyalarını kaydet
        print()
        print_info("💾 Batch dosyaları kaydediliyor...")
        
        batch_en_file = messages_path / f"batch_{batch_num+1:02d}_en.json"
        batch_sr_file = messages_path / f"batch_{batch_num+1:02d}_sr.json"
        
        en_ok = translator.verify_save(batch_en_file, batch_en_data)
        sr_ok = translator.verify_save(batch_sr_file, batch_sr_data)
        
        # Batch'i existing_batches'e ekle (bir sonraki batch için)
        existing_batches[batch_key_en] = batch_en_data
        existing_batches[batch_key_sr] = batch_sr_data
        
        elapsed = time.time() - start_time
        speed = batch_size_actual / elapsed
        completed_strings += batch_size_actual
        
        # Toplam ilerleme özeti
        total_elapsed = time.time() - total_start_time
        avg_speed = completed_strings / total_elapsed if total_elapsed > 0 else 0
        remaining = total - completed_strings
        eta_total = remaining / avg_speed if avg_speed > 0 else 0
        eta_min = int(eta_total // 60)
        eta_sec = int(eta_total % 60)
        
        print()
        if en_ok and sr_ok:
            print_success(f"✨ Batch {batch_num + 1}/{num_batches} tamamlandı!")
            print_info(f"   ⏱️  Batch süresi: {elapsed:.1f}s ({speed:.1f} çev/sn)")
            print_info(f"   📊 Toplam: {completed_strings}/{total} (%{(completed_strings/total)*100:.1f})")
            print_info(f"   ♻️  EN Duplicate: {en_skipped} atlandı | SR Duplicate: {sr_skipped} atlandı")
            print_info(f"   🔄 Cache kullanımı: {translator.cache_hits} çeviri")
            print_info(f"   ⚡ Ortalama hız: {avg_speed:.1f} çev/sn")
            print_info(f"   ⏳ Tahmini kalan: {eta_min}d {eta_sec}s")
        else:
            print_error(f"⚠️ Batch {batch_num + 1} doğrulama hatası!")
            return
        
        # Onay mekanizması kaldırıldı - otomatik devam eder
    
    print(f"\n{Colors.OKGREEN}{Colors.BOLD}{'='*70}{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}   ✨ TÜM BATCH'LER BAŞARIYLA TAMAMLANDI!{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}{'='*70}{Colors.ENDC}\n")
    
    # Tüm batch'leri birleştir
    print_info("🔄 Batch dosyaları birleştiriliyor...")
    
    final_en_data = OrderedDict()
    final_sr_data = OrderedDict()
    
    # Tüm batch dosyalarını sıralı şekilde birleştir
    for i in range(1, num_batches + 1):
        batch_en_file = messages_path / f"batch_{i:02d}_en.json"
        batch_sr_file = messages_path / f"batch_{i:02d}_sr.json"
        
        if batch_en_file.exists():
            with open(batch_en_file, 'r', encoding='utf-8') as f:
                batch_data = json.load(f, object_pairs_hook=OrderedDict)
                # Deep merge
                translator.deep_merge(final_en_data, batch_data)
        
        if batch_sr_file.exists():
            with open(batch_sr_file, 'r', encoding='utf-8') as f:
                batch_data = json.load(f, object_pairs_hook=OrderedDict)
                # Deep merge
                translator.deep_merge(final_sr_data, batch_data)
    
    # Ana dosyaları kaydet
    print_info("💾 Ana dosyalar kaydediliyor...")
    translator.verify_save(en_json, final_en_data)
    translator.verify_save(sr_json, final_sr_data)
    
    print()
    print_success(f"✨ Ana dosyalar oluşturuldu!")
    print_info(f"   📄 İngilizce: {en_json}")
    print_info(f"   📄 Sırpça (Latin): {sr_json}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.WARNING}İşlem kullanıcı tarafından iptal edildi{Colors.ENDC}")
    except Exception as e:
        print_error(f"Hata: {str(e)}")
        import traceback
        traceback.print_exc()

