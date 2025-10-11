#!/usr/bin/env python3
"""
Batch dosyalarını birleştirip ana en.json ve sr.json oluşturur
"""

import json
from pathlib import Path
from collections import OrderedDict

# Renk kodları
class Colors:
    OKGREEN = '\033[92m'
    OKCYAN = '\033[96m'
    BOLD = '\033[1m'
    ENDC = '\033[0m'

def deep_merge(target, source):
    """İki dictionary'yi deep merge et"""
    for key, value in source.items():
        if key in target:
            if isinstance(target[key], dict) and isinstance(value, dict):
                deep_merge(target[key], value)
            else:
                target[key] = value
        else:
            target[key] = value
    return target

def main():
    print(f"\n{Colors.BOLD}🔄 Batch Birleştirme İşlemi{Colors.ENDC}\n")
    
    messages_path = Path(__file__).parent.parent / "messages"
    
    # Tüm batch dosyalarını bul
    batch_files_en = sorted(messages_path.glob("batch_*_en.json"))
    batch_files_sr = sorted(messages_path.glob("batch_*_sr.json"))
    
    print(f"{Colors.OKCYAN}📂 {len(batch_files_en)} EN batch bulundu{Colors.ENDC}")
    print(f"{Colors.OKCYAN}📂 {len(batch_files_sr)} SR batch bulundu{Colors.ENDC}\n")
    
    # EN birleştirme
    print(f"{Colors.BOLD}🇬🇧 İngilizce batch'ler birleştiriliyor...{Colors.ENDC}")
    final_en = OrderedDict()
    
    for i, batch_file in enumerate(batch_files_en, 1):
        print(f"  ⏳ {batch_file.name} yükleniyor...", end=' ')
        with open(batch_file, 'r', encoding='utf-8') as f:
            batch_data = json.load(f, object_pairs_hook=OrderedDict)
            deep_merge(final_en, batch_data)
        print(f"{Colors.OKGREEN}✓{Colors.ENDC}")
    
    # EN kaydet
    en_json = messages_path / "en.json"
    print(f"\n  💾 {en_json.name} kaydediliyor...", end=' ')
    with open(en_json, 'w', encoding='utf-8') as f:
        json.dump(final_en, f, ensure_ascii=False, indent=2)
    
    file_size = en_json.stat().st_size / (1024 * 1024)
    print(f"{Colors.OKGREEN}✓ ({file_size:.2f} MB){Colors.ENDC}\n")
    
    # SR birleştirme
    print(f"{Colors.BOLD}🇷🇸 Sırpça (Latin) batch'ler birleştiriliyor...{Colors.ENDC}")
    final_sr = OrderedDict()
    
    for i, batch_file in enumerate(batch_files_sr, 1):
        print(f"  ⏳ {batch_file.name} yükleniyor...", end=' ')
        with open(batch_file, 'r', encoding='utf-8') as f:
            batch_data = json.load(f, object_pairs_hook=OrderedDict)
            deep_merge(final_sr, batch_data)
        print(f"{Colors.OKGREEN}✓{Colors.ENDC}")
    
    # SR kaydet
    sr_json = messages_path / "sr.json"
    print(f"\n  💾 {sr_json.name} kaydediliyor...", end=' ')
    with open(sr_json, 'w', encoding='utf-8') as f:
        json.dump(final_sr, f, ensure_ascii=False, indent=2)
    
    file_size = sr_json.stat().st_size / (1024 * 1024)
    print(f"{Colors.OKGREEN}✓ ({file_size:.2f} MB){Colors.ENDC}\n")
    
    # Özet
    print(f"{Colors.OKGREEN}{Colors.BOLD}✨ Birleştirme Tamamlandı!{Colors.ENDC}\n")
    print(f"{Colors.OKCYAN}📄 İngilizce: {en_json}{Colors.ENDC}")
    print(f"{Colors.OKCYAN}📄 Sırpça (Latin): {sr_json}{Colors.ENDC}\n")

if __name__ == "__main__":
    main()

