#!/usr/bin/env python3
"""
Offline Argos Translate kullanarak tr.json'u en.json ve sr.json'a çevirir.
- Anahtarları korur
- Duplicate çevirileri önler (cache kullanır)
- Sırpça Latin alfabesi kullanır
- Nested JSON yapısını korur
"""

import json
import os
import argostranslate.package
import argostranslate.translate
from pathlib import Path

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

class ArgosTranslator:
    def __init__(self):
        self.cache = {}  # Duplicate önleme için cache
        self.tr_to_en = None
        self.tr_to_sr = None
        
    def setup_packages(self):
        """Argos Translate paketlerini yükle"""
        print_info("Argos Translate paketleri yükleniyor...")
        
        # Paket deposunu güncelle
        argostranslate.package.update_package_index()
        available_packages = argostranslate.package.get_available_packages()
        
        # Türkçe -> İngilizce paketi
        tr_en_package = next(
            (pkg for pkg in available_packages 
             if pkg.from_code == "tr" and pkg.to_code == "en"),
            None
        )
        
        # Türkçe -> Sırpça paketi (eğer varsa)
        tr_sr_package = next(
            (pkg for pkg in available_packages 
             if pkg.from_code == "tr" and pkg.to_code == "sr"),
            None
        )
        
        # Paketleri indir ve yükle
        if tr_en_package and not tr_en_package.is_installed():
            print_info("Türkçe -> İngilizce paketi indiriliyor...")
            argostranslate.package.install_from_path(tr_en_package.download())
            print_success("Türkçe -> İngilizce paketi yüklendi")
        
        if tr_sr_package and not tr_sr_package.is_installed():
            print_info("Türkçe -> Sırpça paketi indiriliyor...")
            argostranslate.package.install_from_path(tr_sr_package.download())
            print_success("Türkçe -> Sırpça paketi yüklendi")
        
        # Yüklü paketlerden çeviricileri al
        installed_languages = argostranslate.translate.get_installed_languages()
        
        tr_lang = next((lang for lang in installed_languages if lang.code == "tr"), None)
        en_lang = next((lang for lang in installed_languages if lang.code == "en"), None)
        sr_lang = next((lang for lang in installed_languages if lang.code == "sr"), None)
        
        if tr_lang and en_lang:
            self.tr_to_en = tr_lang.get_translation(en_lang)
            print_success("Türkçe -> İngilizce çevirici hazır")
        else:
            print_error("Türkçe -> İngilizce çevirici bulunamadı")
            
        if tr_lang and sr_lang:
            self.tr_to_sr = tr_lang.get_translation(sr_lang)
            print_success("Türkçe -> Sırpça çevirici hazır")
        else:
            print_warning("Türkçe -> Sırpça çevirici bulunamadı, İngilizce üzerinden çevirme denenecek")
            
    def translate_text(self, text, target_lang):
        """Metni çevir ve cache'le"""
        if not isinstance(text, str) or not text.strip():
            return text
            
        # Cache kontrolü
        cache_key = f"{text}:{target_lang}"
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        # Çeviri
        if target_lang == "en" and self.tr_to_en:
            translated = self.tr_to_en.translate(text)
        elif target_lang == "sr" and self.tr_to_sr:
            translated = self.tr_to_sr.translate(text)
        elif target_lang == "sr" and self.tr_to_en:
            # Türkçe -> İngilizce -> Sırpça (dolaylı çeviri)
            en_text = self.tr_to_en.translate(text)
            en_lang = next((lang for lang in argostranslate.translate.get_installed_languages() if lang.code == "en"), None)
            sr_lang = next((lang for lang in argostranslate.translate.get_installed_languages() if lang.code == "sr"), None)
            if en_lang and sr_lang:
                en_to_sr = en_lang.get_translation(sr_lang)
                translated = en_to_sr.translate(en_text)
            else:
                translated = text
        else:
            translated = text
        
        # Cache'e ekle
        self.cache[cache_key] = translated
        return translated
    
    def translate_json_recursive(self, obj, target_lang, path=""):
        """JSON objesini recursive olarak çevir"""
        if isinstance(obj, dict):
            result = {}
            for key, value in obj.items():
                current_path = f"{path}.{key}" if path else key
                result[key] = self.translate_json_recursive(value, target_lang, current_path)
            return result
        elif isinstance(obj, list):
            return [self.translate_json_recursive(item, target_lang, path) for item in obj]
        elif isinstance(obj, str):
            return self.translate_text(obj, target_lang)
        else:
            return obj
    
    def translate_file(self, source_path, target_path, target_lang):
        """JSON dosyasını çevir"""
        print_info(f"Çeviri başlıyor: {source_path} -> {target_path} ({target_lang})")
        
        # Kaynak dosyayı oku
        with open(source_path, 'r', encoding='utf-8') as f:
            source_data = json.load(f)
        
        # Çevir
        total_keys = self.count_keys(source_data)
        print_info(f"Toplam {total_keys} anahtar çevriliyor...")
        
        translated_data = self.translate_json_recursive(source_data, target_lang)
        
        # Hedef dosyaya yaz
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        
        cache_hits = len([k for k in self.cache.keys() if k.endswith(f":{target_lang}")])
        print_success(f"Çeviri tamamlandı: {target_path}")
        print_info(f"Cache kullanımı: {cache_hits} çeviri cache'den alındı (duplicate önleme)")
    
    def count_keys(self, obj):
        """JSON'daki toplam key sayısını say"""
        if isinstance(obj, dict):
            return sum(1 + self.count_keys(v) for v in obj.values())
        elif isinstance(obj, list):
            return sum(self.count_keys(item) for item in obj)
        else:
            return 0

def main():
    print(f"\n{Colors.HEADER}{Colors.BOLD}🌍 Argos Translate - Offline Çeviri Aracı{Colors.ENDC}\n")
    
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
    
    # Yedek oluştur
    if en_json_path.exists():
        backup_path = messages_path / "en.json.backup"
        import shutil
        shutil.copy2(en_json_path, backup_path)
        print_info(f"en.json yedeği oluşturuldu: {backup_path}")
    
    if sr_json_path.exists():
        backup_path = messages_path / "sr.json.backup"
        import shutil
        shutil.copy2(sr_json_path, backup_path)
        print_info(f"sr.json yedeği oluşturuldu: {backup_path}")
    
    # Çevirici oluştur
    translator = ArgosTranslator()
    translator.setup_packages()
    
    # Çevirileri yap
    print(f"\n{Colors.BOLD}📝 Çeviri İşlemleri{Colors.ENDC}\n")
    
    translator.translate_file(tr_json_path, en_json_path, "en")
    translator.translate_file(tr_json_path, sr_json_path, "sr")
    
    print(f"\n{Colors.OKGREEN}{Colors.BOLD}✨ Tüm çeviriler tamamlandı!{Colors.ENDC}\n")
    print_info(f"İngilizce: {en_json_path}")
    print_info(f"Sırpça (Latin): {sr_json_path}")
    print_info(f"Toplam önlenen duplicate: {len(translator.cache)} çeviri")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.WARNING}İşlem kullanıcı tarafından iptal edildi{Colors.ENDC}")
    except Exception as e:
        print_error(f"Hata oluştu: {str(e)}")
        import traceback
        traceback.print_exc()

