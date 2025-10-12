#!/usr/bin/env python3
"""
İlk Batch Test - 10 String Çevirisi + Nested Yapı Kontrolü
"""

import json
from pathlib import Path
from transformers import MarianTokenizer, MarianMTModel
import torch
import re
from typing import Dict, Tuple, List, Any

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
    """Yapıyı kopyala, string'leri boş bırak"""
    if isinstance(obj, dict):
        return {k: create_empty_structure(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [create_empty_structure(item) for item in obj]
    elif isinstance(obj, str):
        return ""  # Boş string
    else:
        return obj

print("="*70)
print("🧪 İLK BATCH TEST (10 STRING) - NESTED YAPI + ÇEVİRİ")
print("="*70)

# tr.json yükle
print("\n📖 tr.json okunuyor...")
with open('messages/tr.json', 'r', encoding='utf-8') as f:
    tr_data = json.load(f)

all_strings = collect_strings(tr_data)
print(f"✅ {len(all_strings):,} string bulundu")

# İlk 10 string
test_strings = all_strings[:10]
print(f"🧪 İlk 10 string test edilecek\n")

# Boş template oluştur
print("📋 Boş template oluşturuluyor...")
template = create_empty_structure(tr_data)
print("✅ Template hazır (string'ler boş)")

# Template kontrolü
first_path = test_strings[0][0]
cur = template
for p in first_path:
    cur = cur[p]
print(f"   Kontrol: {first_path} → '{cur}' (boş olmalı)")

if cur == "":
    print("   ✅ Template doğru (string boş)\n")
else:
    print(f"   ❌ HATA: Template boş değil! → '{cur}'\n")

# Model yükle
print("📦 MarianMT model yükleniyor...")
tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-tr-en')
model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-tr-en')
print("✅ Model hazır!\n")

print("="*70)
print("ÇEVİRİ SÜRECİ")
print("="*70)

for idx, (path, original_text) in enumerate(test_strings, 1):
    path_str = " → ".join(str(p) for p in path)
    print(f"\n{idx}/10: {path_str}")
    print(f"  🇹🇷 TR: {original_text[:60]}...")
    
    # Çevir
    protected_text, placeholders = protect_placeholders(original_text)
    inputs = tokenizer(protected_text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model.generate(**inputs)
    translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
    final_text = restore_placeholders(translated, placeholders)
    
    print(f"  🇬🇧 EN: {final_text[:60]}...")
    
    # Template'e yerleştir
    set_by_path(template, path, final_text)
    print(f"  ✅ Template'e yerleştirildi")

print("\n" + "="*70)
print("TEMPLATE KONTROLÜ")
print("="*70)

# İlk string'i kontrol et
first_path, first_original = test_strings[0]
cur = template
for p in first_path:
    cur = cur[p]

print(f"\n1️⃣  Path: {first_path}")
print(f"   🇹🇷 Orijinal: {first_original}")
print(f"   🇬🇧 Template: {cur}")

if cur and cur != first_original and "İstatistik" not in cur:
    print(f"   ✅ ÇEVİRİ BAŞARILI! Template'te çevrili metin var!")
elif cur == "":
    print(f"   ❌ HATA: Template hala boş!")
else:
    print(f"   ❌ HATA: Template'te hala Türkçe var!")

# JSON yapısını göster
print("\n📄 İLK TOP-LEVEL KEY'İN NESTED YAPISI:")
print("-" * 70)

first_top_key = list(template.keys())[0]
sample = {first_top_key: template[first_top_key]}

def limit_dict(d, max_items=3, depth=0):
    if depth > 2:
        return "..."
    if isinstance(d, dict):
        limited = {}
        for i, (k, v) in enumerate(d.items()):
            if i >= max_items:
                limited["..."] = f"(+{len(d) - max_items} more)"
                break
            limited[k] = limit_dict(v, max_items, depth + 1)
        return limited
    elif isinstance(d, list):
        return [limit_dict(item, max_items, depth + 1) for item in d[:max_items]]
    return d

limited = limit_dict(sample, max_items=3)
print(json.dumps(limited, ensure_ascii=False, indent=2))

print("\n" + "="*70)
print("✅ TEST TAMAMLANDI!")
print("="*70)


