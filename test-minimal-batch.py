#!/usr/bin/env python3
"""
Minimal Batch Test - Sadece Çevrilen String'ler (Boş String YOK)
"""

import json
from pathlib import Path
from transformers import MarianTokenizer, MarianMTModel
import torch
import re
from typing import Dict, Tuple

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

print("="*70)
print("🧪 MINIMAL BATCH TEST - BOŞ STRING YOK")
print("="*70)

# tr.json'dan ilk 10 string
print("\n📖 tr.json okunuyor...")
with open('messages/tr.json', 'r', encoding='utf-8') as f:
    tr_data = json.load(f)

all_strings = collect_strings(tr_data)
test_strings = all_strings[:10]
print(f"✅ {len(all_strings):,} string bulundu")
print(f"🧪 İlk 10 string test edilecek\n")

# Model yükle
print("📦 MarianMT model yükleniyor...")
tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-tr-en')
model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-tr-en')
print("✅ Model hazır!\n")

print("="*70)
print("MİNİMAL BATCH OLUŞTURMA")
print("="*70)

# ✨ YENİ YAKLAŞIM: Minimal nested dict oluştur
result = {}

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
    
    # ✨ Minimal nested yapı oluştur
    cur = result
    for p in path[:-1]:
        if p not in cur:
            cur[p] = {}
        cur = cur[p]
    
    # Son key'e değeri ata
    cur[path[-1]] = final_text
    print(f"  ✅ Nested yapıya yerleştirildi")

print("\n" + "="*70)
print("BATCH DOSYASI KONTROLÜ")
print("="*70)

# JSON olarak kaydet ve kontrol et
with open('test-batch-output.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("\n✅ test-batch-output.json kaydedildi")

# Dosya boyutu
file_size = Path('test-batch-output.json').stat().st_size / 1024
print(f"📊 Dosya boyutu: {file_size:.1f} KB")

# String sayısı
result_strings = collect_strings(result)
print(f"📊 String sayısı: {len(result_strings)}")
print(f"   Beklenen: 10")
print(f"   Sonuç: {'✅ DOĞRU' if len(result_strings) == 10 else '❌ YANLIŞ'}")

# Boş string kontrolü
empty_count = sum(1 for _, v in result_strings if v == "")
print(f"\n🔍 Boş string sayısı: {empty_count}")
if empty_count > 0:
    print(f"   ❌ HATA: {empty_count} boş string bulundu!")
else:
    print(f"   ✅ Boş string yok!")

# İlk 5 satırı göster
print("\n📄 BATCH DOSYASI (İLK 20 SATIR):")
print("-" * 70)
with open('test-batch-output.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines[:20], 1):
        print(f"{i:3d}| {line.rstrip()}")

print("\n" + "="*70)
print("🎯 SONUÇ")
print("="*70)

if len(result_strings) == 10 and empty_count == 0:
    print("✅ TEST BAŞARILI!")
    print("   • Sadece çevrilen string'ler var")
    print("   • Boş string YOK")
    print("   • Nested yapı KORUNMUŞ")
    print("   • Dosya boyutu MİNİMAL")
    print("\n🚀 Script production'a hazır!")
else:
    print("❌ TEST BAŞARISIZ!")
    print(f"   Beklenen: 10 string, 0 boş")
    print(f"   Bulunan: {len(result_strings)} string, {empty_count} boş")

print("="*70)


