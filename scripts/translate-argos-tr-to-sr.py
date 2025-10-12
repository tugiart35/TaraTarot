#!/usr/bin/env python3
"""
Argos Translate ile TR -> SR (Latin) Batch Çeviri
- 1000'erlik batch'lere böler
- Duplicate önler
- Checkpoint/resume desteği
- Sırpça Latin alfabesi kullanır
- Canlı ilerleme takibi
"""

import json
import os
import time
from pathlib import Path
from collections import OrderedDict
import argostranslate.package
import argostranslate.translate

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

class ArgosBatchTranslator:
    def __init__(self):
        self.batch_size = 1000
        self.cache = {}
        self.cache_hits = 0
        self.tr_to_sr = None
        
    def setup_argos(self):
        """Argos Translate paketlerini yükle"""
        print_info("Argos Translate kurulumu kontrol ediliyor...")
        
        try:
            # Mevcut paketleri al
            installed_languages = argostranslate.translate.get_installed_languages()
            
            tr_lang = next((lang for lang in installed_languages if lang.code == "tr"), None)
            sr_lang = next((lang for lang in installed_languages if lang.code == "sr"), None)
            
            # TR ve SR paketlerini kontrol et
            if not tr_lang or not sr_lang:
                print_info("Dil paketleri indiriliyor...")
                
                # Paket deposunu güncelle (ama hata verirse devam et)
                try:
                    argostranslate.package.update_package_index()
                except:
                    print_warning("Paket index güncellenemedi, mevcut paketlerle devam ediliyor")
                
                available_packages = argostranslate.package.get_available_packages()
                
                # TR -> SR paketi
                tr_sr_pkg = next((p for p in available_packages if p.from_code == "tr" and p.to_code == "sr"), None)
                
                if tr_sr_pkg and not tr_sr_pkg.is_installed():
                    print_info("TR -> SR paketi indiriliyor...")
                    argostranslate.package.install_from_path(tr_sr_pkg.download())
                
                # Tekrar yükle
                installed_languages = argostranslate.translate.get_installed_languages()
                tr_lang = next((lang for lang in installed_languages if lang.code == "tr"), None)
                sr_lang = next((lang for lang in installed_languages if lang.code == "sr"), None)
            
            if tr_lang and sr_lang:
                self.tr_to_sr = tr_lang.get_translation(sr_lang)
                print_success("✓ TR -> SR çevirici hazır")
                return True
            else:
                print_error("TR veya SR dil paketi bulunamadı")
                return False
                
        except Exception as e:
            print_error(f"Argos kurulum hatası: {str(e)}")
            return False
    
    def cyrillic_to_latin(self, text):
        """Kiril'den Latin'e çevir"""
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
    
    def translate_text(self, text, existing_translation=None):
        """Tek metni çevir - Argos ile"""
        if not isinstance(text, str) or not text.strip():
            return text
        
        # Özel metinleri atla
        if text.startswith('{') or text.startswith('%') or text.startswith('$'):
            return text
        
        # Mevcut çeviri varsa kullan (duplicate önleme)
        if existing_translation and isinstance(existing_translation, str) and existing_translation.strip():
            self.cache_hits += 1
            return existing_translation
        
        # Cache kontrolü
        if text in self.cache:
            self.cache_hits += 1
            return self.cache[text]
        
        # Argos ile çevir
        try:
            if not self.tr_to_sr:
                return text
            
            translated = self.tr_to_sr.translate(text)
            
            # Kiril'den Latin'e çevir
            translated = self.cyrillic_to_latin(translated)
            
            # Cache'e ekle
            self.cache[text] = translated
            
            return translated
            
        except Exception as e:
            print_warning(f"Çeviri hatası: {text[:30]}...")
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
        """Path ile değer ata"""
        parts = path.replace('[', '.').replace(']', '').split('.')
        parts = [p for p in parts if p]
        
        current = obj
        for i, part in enumerate(parts[:-1]):
            if part.isdigit():
                idx = int(part)
                while len(current) <= idx:
                    current.append(None)
                if current[idx] is None:
                    next_part = parts[i + 1] if i + 1 < len(parts) else None
                    if next_part and next_part.isdigit():
                        current[idx] = []
                    else:
                        current[idx] = OrderedDict()
                current = current[idx]
            else:
                if part not in current:
                    next_part = parts[i + 1] if i + 1 < len(parts) else None
                    if next_part and next_part.isdigit():
                        current[part] = []
                    else:
                        current[part] = OrderedDict()
                current = current[part]
        
        last = parts[-1]
        if last.isdigit():
            idx = int(last)
            if isinstance(current, list):
                while len(current) <= idx:
                    current.append(None)
                current[idx] = value
            else:
                current[idx] = value
        else:
            current[last] = value
    
    def get_value_by_path(self, obj, path):
        """Path ile değer al"""
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
    
    def translate_batch(self, strings, start_idx, end_idx, existing_data=None):
        """Belirli aralıktaki string'leri çevir"""
        batch = strings[start_idx:end_idx]
        translated = []
        batch_start = time.time()
        skipped = 0
        
        for i, (path, text) in enumerate(batch):
            # Mevcut çeviriyi al
            existing_trans = self.get_value_by_path(existing_data, path) if existing_data else None
            
            trans = self.translate_text(text, existing_trans)
            
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
            
            # Her 5 çeviride güncelle
            if current % 5 == 0 or current == total:
                skip_info = f"[Atlandı: {skipped}]" if skipped > 0 else ""
                print(f"  {Colors.OKBLUE}SR: [{bar}] {progress:.1f}% ({current}/{total}) {speed:.1f} çev/sn ETA: {int(eta)}s {skip_info}{Colors.ENDC}", end='\r')
            
            # Her 100 çeviride detay göster
            if current % 100 == 0 and not existing_trans:
                print(f"\n  🔹 {path[:60]}: '{text[:40]}...'", end='')
        
        print()  # Yeni satır
        return translated, skipped
    
    def verify_save(self, file_path, data):
        """Dosyayı kaydet ve doğrula"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                loaded = json.load(f)
            
            file_size = file_path.stat().st_size / 1024
            print_success(f"✓ {file_path.name} kaydedildi ({file_size:.1f} KB)")
            return True
        except:
            print_error(f"✗ {file_path.name} doğrulama BAŞARISIZ!")
            return False

def main():
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}   🇷🇸 Argos TR -> SR (Latin) Batch Çeviri{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}\n")
    
    # Dosya yolları
    base_path = Path(__file__).parent.parent
    messages_path = base_path / "messages"
    batches_path = messages_path / "batches"
    
    # Batches klasörünü oluştur
    batches_path.mkdir(exist_ok=True)
    
    tr_json = messages_path / "tr.json"
    sr_json = messages_path / "sr.json"
    
    # Kaynak dosyayı oku
    print_info(f"📁 Kaynak: {tr_json}")
    with open(tr_json, 'r', encoding='utf-8') as f:
        tr_data = json.load(f, object_pairs_hook=OrderedDict)
    
    file_size_mb = tr_json.stat().st_size / (1024 * 1024)
    print_info(f"📏 Dosya boyutu: {file_size_mb:.2f} MB")
    
    # Translator oluştur ve Argos'u kur
    translator = ArgosBatchTranslator()
    
    if not translator.setup_argos():
        print_error("Argos Translate kurulamadı!")
        return
    
    # Mevcut batch dosyalarını kontrol et
    existing_batches = {}
    
    for batch_file in batches_path.glob("batch_*_sr.json"):
        batch_num = int(batch_file.stem.split('_')[1])
        with open(batch_file, 'r', encoding='utf-8') as f:
            existing_batches[batch_num] = json.load(f, object_pairs_hook=OrderedDict)
        print_info(f"📂 Batch {batch_num} SR yüklendi")
    
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
        batch_sr_file = batches_path / f"batch_{batch_num+1:04d}_sr.json"
        
        if batch_sr_file.exists():
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
        
        # Mevcut batch çevirisi varsa al
        existing_sr = existing_batches.get(batch_num + 1, None)
        
        # SR çevirisi
        print_info("🇷🇸 Sırpça (Latin) çevirisi başlıyor...")
        sr_translations, sr_skipped = translator.translate_batch(all_strings, start_idx, end_idx, existing_sr)
        print()
        
        # Batch JSON dosyası oluştur
        batch_sr_data = OrderedDict()
        
        for path, value in sr_translations:
            translator.set_by_path(batch_sr_data, path, value)
        
        # Batch dosyasını kaydet
        print()
        print_info("💾 Batch dosyası kaydediliyor...")
        
        sr_ok = translator.verify_save(batch_sr_file, batch_sr_data)
        
        # Batch'i existing_batches'e ekle
        existing_batches[batch_num + 1] = batch_sr_data
        
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
        if sr_ok:
            print_success(f"✨ Batch {batch_num + 1}/{num_batches} tamamlandı!")
            print_info(f"   ⏱️  Batch süresi: {elapsed:.1f}s ({speed:.1f} çev/sn)")
            print_info(f"   📊 Toplam: {completed_strings}/{total} (%{(completed_strings/total)*100:.1f})")
            print_info(f"   ♻️  Duplicate: {sr_skipped} atlandı")
            print_info(f"   🔄 Cache: {translator.cache_hits} çeviri")
            print_info(f"   ⚡ Ortalama hız: {avg_speed:.1f} çev/sn")
            print_info(f"   ⏳ Tahmini kalan: {eta_min}d {eta_sec}s")
        else:
            print_error(f"⚠️ Batch {batch_num + 1} doğrulama hatası!")
            return
    
    # Tüm batch'leri birleştir
    print(f"\n{Colors.OKGREEN}{Colors.BOLD}{'='*70}{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}   ✨ TÜM BATCH'LER TAMAMLANDI!{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}{'='*70}{Colors.ENDC}\n")
    
    print_info("🔄 Batch dosyaları birleştiriliyor...")
    
    final_sr_data = OrderedDict()
    
    def deep_merge(target, source):
        """Deep merge"""
        for key, value in source.items():
            if key in target:
                if isinstance(target[key], dict) and isinstance(value, dict):
                    deep_merge(target[key], value)
                else:
                    target[key] = value
            else:
                target[key] = value
        return target
    
    # Tüm batch'leri sıralı birleştir
    for i in range(1, num_batches + 1):
        batch_file = batches_path / f"batch_{i:04d}_sr.json"
        
        if batch_file.exists():
            with open(batch_file, 'r', encoding='utf-8') as f:
                batch_data = json.load(f, object_pairs_hook=OrderedDict)
                deep_merge(final_sr_data, batch_data)
            print(f"  ✓ Batch {i:04d} birleştirildi")
    
    # Ana dosyayı kaydet
    print()
    print_info("💾 sr.json kaydediliyor...")
    translator.verify_save(sr_json, final_sr_data)
    
    print()
    print_success(f"✨ Çeviri tamamlandı!")
    print_info(f"   📄 Sırpça (Latin): {sr_json}")
    print_info(f"   📦 Batch klasörü: {batches_path}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.WARNING}İşlem kullanıcı tarafından iptal edildi{Colors.ENDC}")
    except Exception as e:
        print_error(f"Hata: {str(e)}")
        import traceback
        traceback.print_exc()



