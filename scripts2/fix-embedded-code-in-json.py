#!/usr/bin/env python3
"""
JSON string'lerinin içine karışmış JavaScript kodunu temizler
Örnek hata: "text',\nreversed:\n'more text" → "text" olarak düzeltir
"""

import json
import re

def clean_embedded_code(text):
    """String içindeki JavaScript kodunu temizle"""
    if not isinstance(text, str):
        return text
    
    # Pattern 1: Sondaki tırnak + kod parçaları
    # Örnek: "text.',\nreversed:\n'more..."
    text = re.sub(r"'\s*,\s*\n.*$", '', text, flags=re.DOTALL)
    
    # Pattern 2: Ortadaki literal \n karakterleri (JavaScript multi-line string)
    # Örnek: "text',\n    reversed:\n      'more"
    text = re.sub(r"',\s*\\n\s*\w+:\s*\\n\s*'.*$", '', text)
    
    # Pattern 3: Group bilgisi sonda kalmış
    # Örnek: "text.'\nGroup: 'Cups"
    text = re.sub(r"'\s*\n\s*[Gg]roup:\s*'.*$", '', text)
    text = re.sub(r"',\s*\n\s*group:\s*'.*$", '', text)
    
    # Pattern 4: Sonda kalan tek tırnak ve boşluklar
    text = re.sub(r"'\s*$", '', text)
    text = re.sub(r"',\s*$", '', text)
    
    # Baştaki tırnak
    if text.startswith("'"):
        text = text[1:]
    
    # Sondaki tırnak + nokta kombinasyonu
    text = re.sub(r"\.'$", '.', text)
    
    return text.strip()

def clean_recursive(obj):
    """Tüm string'leri temizle"""
    if isinstance(obj, str):
        return clean_embedded_code(obj)
    elif isinstance(obj, list):
        return [clean_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: clean_recursive(v) for k, v in obj.items()}
    return obj

def main():
    print("=" * 70)
    print("🧹 EMBEDDED JAVASCRIPT KODU TEMİZLEME")
    print("=" * 70)
    
    for lang in ['tr', 'en', 'sr']:
        file_path = f'messages/{lang}.json'
        print(f'\n📝 {file_path}...')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Önce örnek göster
        if 'love' in data and 'meanings' in data['love']:
            fool = data['love']['meanings'].get('fourofcups', {})
            if 'position1' in fool:
                before = fool['position1'].get('upright', '')[:150]
                print(f'  Önce: {before}...')
        
        # Temizle
        fixed_count = 0
        if 'love' in data and 'meanings' in data['love']:
            for card_key, card_data in data['love']['meanings'].items():
                for pos_key in ['position1', 'position2']:
                    if pos_key in card_data:
                        for field in ['upright', 'reversed', 'context']:
                            if field in card_data[pos_key]:
                                original = card_data[pos_key][field]
                                cleaned = clean_embedded_code(original)
                                if original != cleaned:
                                    data['love']['meanings'][card_key][pos_key][field] = cleaned
                                    fixed_count += 1
        
        print(f'  ✅ {fixed_count} alan temizlendi')
        
        # Sonra örnek göster
        if 'love' in data and 'meanings' in data['love']:
            fool = data['love']['meanings'].get('fourofcups', {})
            if 'position1' in fool:
                after = fool['position1'].get('upright', '')[:150]
                print(f'  Sonra: {after}...')
        
        # Kaydet
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    print('\n' + '=' * 70)
    print('✅ TÜM EMBEDDED KOD TEMİZLENDİ!')
    print('=' * 70)

if __name__ == '__main__':
    main()

