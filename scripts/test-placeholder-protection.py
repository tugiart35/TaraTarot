#!/usr/bin/env python3
"""
Placeholder Koruma Testi
Bu script placeholder koruma sisteminin doğru çalıştığını test eder
"""

import re
from typing import Dict, Tuple

# Aynı regex pattern
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

# Test case'leri
test_cases = [
    {
        "name": "i18n değişkenleri",
        "input": "Merhaba {{userName}}, kredi bakiyeniz {{creditAmount}} TL",
        "expected_placeholders": ["{{userName}}", "{{creditAmount}}"]
    },
    {
        "name": "Python format placeholders",
        "input": "Topla {0} ve {1} için sonuç {result}",
        "expected_placeholders": ["{0}", "{1}", "{result}"]
    },
    {
        "name": "printf-style placeholders",
        "input": "Değer: %s, Sayı: %d, Float: %f",
        "expected_placeholders": ["%s", "%d", "%f"]
    },
    {
        "name": "HTML tag'leri",
        "input": "Bu <strong>kalın</strong> ve bu <br/> satır sonu",
        "expected_placeholders": ["<strong>", "</strong>", "<br/>"]
    },
    {
        "name": "Karma örnek",
        "input": "Hoş geldin {{name}}! Toplam {0} öğe var. <div>Test</div> %s",
        "expected_placeholders": ["{{name}}", "{0}", "<div>", "</div>", "%s"]
    }
]

print("="*70)
print("🧪 PLACEHOLDER KORUMA TESTİ")
print("="*70)

all_passed = True

for i, test in enumerate(test_cases, 1):
    print(f"\n{'='*70}")
    print(f"Test {i}: {test['name']}")
    print(f"{'='*70}")
    
    input_text = test['input']
    expected = test['expected_placeholders']
    
    print(f"📝 Giriş:\n   {input_text}")
    
    # Koruma
    protected, tokens = protect_placeholders(input_text)
    print(f"\n🛡️  Korunmuş:\n   {protected}")
    
    # Bulunan placeholder'lar
    found_placeholders = list(tokens.values())
    print(f"\n🔍 Bulunan placeholder'lar:")
    for ph in found_placeholders:
        print(f"   - {ph}")
    
    # Geri yükleme simülasyonu
    # (Normalde burada çeviri yapılır, biz sadece test için aynı metni kullanıyoruz)
    restored = restore_placeholders(protected, tokens)
    print(f"\n♻️  Geri yüklenmiş:\n   {restored}")
    
    # Doğrulama
    if restored == input_text:
        print(f"\n✅ TEST BAŞARILI: Metin değişmeden geri yüklendi!")
        
        # Tüm expected placeholder'ların bulunduğunu kontrol et
        missing = [ph for ph in expected if ph not in found_placeholders]
        if missing:
            print(f"⚠️  Bazı placeholder'lar bulunamadı: {missing}")
            all_passed = False
        else:
            print(f"✅ Tüm beklenen placeholder'lar bulundu ({len(expected)} adet)")
    else:
        print(f"\n❌ TEST BAŞARISIZ: Metin değişti!")
        print(f"   Beklenen: {input_text}")
        print(f"   Alınan  : {restored}")
        all_passed = False

# Özet
print(f"\n{'='*70}")
print(f"📊 TEST SONUCU")
print(f"{'='*70}")

if all_passed:
    print("✅ TÜM TESTLER BAŞARILI! Placeholder koruma sistemi çalışıyor.")
else:
    print("⚠️  Bazı testler başarısız oldu. Lütfen kontrol edin.")

print(f"\n💡 Sonuç: Placeholder koruma sistemi {'HAZIR' if all_passed else 'SORUNLU'}")
print("="*70 + "\n")

