#!/usr/bin/env python3
"""
Birleşik cümleleri düzeltir
Örnek: "deneme.Yeni" → "deneme. Yeni"
"""

import json
import re

def fix_sentence_spacing(text):
    """Nokta sonrası boşluk ekle"""
    if not isinstance(text, str):
        return text
    
    # Pattern: nokta + büyük harf (aralarında boşluk yok)
    # Değiştir: nokta + boşluk + büyük harf
    text = re.sub(r'\.([A-ZА-ЯĐ])', r'. \1', text)
    
    # Diğer noktalama işaretleri için de
    text = re.sub(r'\!([A-ZА-ЯĐ])', r'! \1', text)
    text = re.sub(r'\?([A-ZА-ЯĐ])', r'? \1', text)
    
    return text

def fix_recursive(obj):
    """Tüm string'leri düzelt"""
    if isinstance(obj, str):
        return fix_sentence_spacing(obj)
    elif isinstance(obj, list):
        return [fix_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: fix_recursive(v) for k, v in obj.items()}
    return obj

def main():
    print("=" * 70)
    print("🔧 CÜMLE BOŞLUKLARI DÜZELTME")
    print("=" * 70)
    
    for lang in ['tr', 'en', 'sr']:
        file_path = f'messages/{lang}.json'
        print(f'\n📝 {file_path}...')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Önce örnek göster
        if 'love' in data and 'meanings' in data['love']:
            fool = data['love']['meanings'].get('thefool', {})
            if 'position2' in fool:
                before = fool['position2']['upright'][:100]
                print(f'  Önce: {before}...')
        
        # Düzelt
        data = fix_recursive(data)
        
        # Sonra örnek göster
        if 'love' in data and 'meanings' in data['love']:
            fool = data['love']['meanings'].get('thefool', {})
            if 'position2' in fool:
                after = fool['position2']['upright'][:100]
                print(f'  Sonra: {after}...')
        
        # Kaydet
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'  ✅ Düzeltildi')
    
    print('\n' + '=' * 70)
    print('✅ TÜM CÜMLE BOŞLUKLARI DÜZELTİLDİ!')
    print('=' * 70)

if __name__ == '__main__':
    main()

