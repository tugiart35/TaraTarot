#!/usr/bin/env python3
"""
Duplicate kontrolünü test et - zaten çevrilmiş batch'leri gerçekten atlıyor mu?
"""

import json
from pathlib import Path
from collections import OrderedDict

messages_path = Path(__file__).parent.parent / "messages"

# Batch 1'i yükle
batch_01_en = messages_path / "batch_01_en.json"

if batch_01_en.exists():
    with open(batch_01_en, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # String sayısını say
    def count_strings(obj):
        if isinstance(obj, dict):
            return sum(count_strings(v) for v in obj.values())
        elif isinstance(obj, list):
            return sum(count_strings(item) for item in obj)
        elif isinstance(obj, str):
            return 1
        return 0
    
    string_count = count_strings(data)
    print(f"✅ Batch 01 EN: {string_count} metin içeriyor")
    
    # İlk birkaç çeviriyi göster
    print(f"\n📝 İlk çeviriler:")
    print(json.dumps(data, ensure_ascii=False, indent=2)[:500])
else:
    print("❌ Batch 01 bulunamadı")

