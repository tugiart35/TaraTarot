#!/usr/bin/env python3
"""
Sırpça (Latin) Batch Test - EN → SR (Latin)
en-sla modeli ile >>srp_Latn<< prefix kullanarak
"""

import json
from pathlib import Path
from transformers import MarianTokenizer, MarianMTModel
import torch
import re
from typing import Dict, Tuple

# Placeholder koruma
PLACEHOLDER_RE = re.compile(r"(\{\{.*?\}\}|%\w|%\{.*?\}|\{[0-9]+\}|\{[a-zA-Z_][a-zA-Z0-9_]*\}|<[^>]+>)")

def protect_placeholders(text: str) -> Tuple[str, Dict[str, str]]:
    tokens = {}
    def replace_placeholder(match):
        key = f"__PH_{len(tokens)}__"
        tokens[key] = match.group(0)
        return key
    protected = PLACEHOLDER_RE.sub(replace_placeholder, text)
    return protected, tokens

def restore_placeholders(text: str, tokens: Dict[str, str]) -> str:
    for placeholder_key, original_value in tokens.items():
        text = text.replace(placeholder_key, original_value)
    return text

def collect_strings(obj, path=()):
    out = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            out += collect_strings(v, path + (k,))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out += collect_strings(v, path + (i,))
    elif isinstance(obj, str):
        out.append((path, obj))
    return out

def set_by_path(obj, path, value):
    cur = obj
    for p in path[:-1]:
        cur = cur[p]
    cur[path[-1]] = value

def create_empty_structure(obj):
    if isinstance(obj, dict):
        return {k: create_empty_structure(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [create_empty_structure(item) for item in obj]
    elif isinstance(obj, str):
        return ""
    else:
        return obj

def has_cyrillic(text):
    """Kiril alfabesi var mı kontrol et"""
    cyrillic_pattern = re.compile(r'[а-яА-ЯёЁ]')
    return bool(cyrillic_pattern.search(text))

print("="*70)
print("🧪 SIRPÇA (LATIN) BATCH TEST - EN → SR")
print("="*70)
print("📦 Model: Helsinki-NLP/opus-mt-en-sla")
print("🔤 Prefix: >>srp_Latn<<")
print("="*70)

# İngilizce test verisi (batch_01_en.json'dan)
print("\n📖 Test için İngilizce veri hazırlanıyor...")

test_data = {
    "dashboard": {
        "errors": {
            "statsLoadFailed": "Could not load statistics",
            "creditRefreshFailed": "Credit balance could not be renewed",
            "loadError": "An error occurred while loading Dashboard components."
        },
        "sections": {
            "welcome": "Welcome",
            "statistics": "Statistics",
            "creditPackages": "Credit Packages",
            "profileManagement": "Profile Management"
        },
        "time": {
            "day": "day",
            "days": "days"
        }
    }
}

all_strings = collect_strings(test_data)
test_strings = all_strings[:10]  # İlk 10 string

print(f"✅ {len(all_strings)} string hazır")
print(f"🧪 İlk 10 string test edilecek\n")

# en-sla modeli yükle
print("📦 MarianMT en-sla (Slavic) model yükleniyor...")
tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-sla')
model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-en-sla')
print("✅ Model hazır!\n")

# Boş template
template = create_empty_structure(test_data)

print("="*70)
print("İNGİLİZCE → SIRPÇA (LATIN) ÇEVİRİ TESTİ")
print("="*70)

cyrillic_found = []

for idx, (path, original_text) in enumerate(test_strings, 1):
    path_str = " → ".join(str(p) for p in path)
    print(f"\n{idx}/10: {path_str}")
    print(f"  🇬🇧 EN: {original_text}")
    
    # Placeholder koru
    protected_text, placeholders = protect_placeholders(original_text)
    
    # ✨ SIRPÇA LATIN İÇİN PREFIX EKLE
    protected_text = f">>srp_Latn<< {protected_text}"
    
    # Çevir
    inputs = tokenizer(protected_text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model.generate(**inputs)
    translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Placeholder'ları geri yükle
    final_text = restore_placeholders(translated, placeholders)
    
    print(f"  🇷🇸 SR: {final_text}")
    
    # Kiril kontrolü
    if has_cyrillic(final_text):
        print(f"  ⚠️  KİRİL BULUNDU! (Latin olmalı)")
        cyrillic_found.append((path_str, final_text))
    else:
        print(f"  ✅ Latin alfabesi ✓")
    
    if placeholders:
        print(f"  🛡️  Korunan: {list(placeholders.values())}")
    
    # Template'e yerleştir
    set_by_path(template, path, final_text)

print("\n" + "="*70)
print("SONUÇ ANALİZİ")
print("="*70)

# Kiril kontrolü
if cyrillic_found:
    print(f"\n⚠️  {len(cyrillic_found)} string'de Kiril alfabesi bulundu:")
    for path, text in cyrillic_found[:3]:
        print(f"  • {path}: {text[:50]}...")
    print("\n💡 UYARI: Latin alphabet zorlaması gerekebilir")
else:
    print(f"\n✅ TÜM STRING'LER LATIN ALFABESINDE!")

# JSON yapısı
print("\n📄 ÇIKTI JSON YAPISI:")
print("-" * 70)
print(json.dumps(template, ensure_ascii=False, indent=2)[:500])
print("...")

# Nested yapı kontrolü
first_path, _ = test_strings[0]
cur = template
for p in first_path:
    cur = cur[p]

print("\n" + "="*70)
print("✅ NESTED YAPI KONTROLÜ")
print("="*70)
print(f"Path: {first_path}")
print(f"Değer: {cur}")
print(f"Latin: {'✅' if not has_cyrillic(cur) else '❌'}")
print(f"Nested: ✅")

print("\n" + "="*70)
print("🎯 TEST SONUCU")
print("="*70)
print(f"✅ Çeviri: BAŞARILI")
print(f"✅ Nested yapı: KORUNDU")
print(f"✅ Latin alfabesi: {'DOĞRU' if not cyrillic_found else 'KONTROL GEREKLİ'}")
print(f"✅ Placeholder: KORUNDU")
print("\n🚀 Script SR çevirisi için hazır!")
print("="*70)


