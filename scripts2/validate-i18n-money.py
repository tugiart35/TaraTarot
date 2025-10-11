#!/usr/bin/env python3
"""
Money spread i18n tutarlılık kontrolü
- TR/EN/SR'de aynı anahtarlar var mı?
- 78 kart tamamlandı mı?
- Duplicate var mı?
"""

import json
import sys

def main():
    print("=" * 80)
    print("🔍 MONEY SPREAD i18n TUTARLILIK KONTROLÜ")
    print("=" * 80)
    
    # Dosyaları oku
    try:
        with open('messages/tr.json', 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
        with open('messages/en.json', 'r', encoding='utf-8') as f:
            en_data = json.load(f)
        with open('messages/sr.json', 'r', encoding='utf-8') as f:
            sr_data = json.load(f)
    except Exception as e:
        print(f"❌ Dosya okuma hatası: {e}")
        sys.exit(1)
    
    # Money meanings kontrolü
    tr_cards = tr_data.get('money', {}).get('meanings', {})
    en_cards = en_data.get('money', {}).get('meanings', {})
    sr_cards = sr_data.get('money', {}).get('meanings', {})
    
    print(f"\n📊 TOPLAM KART SAYILARI:")
    print(f"  TR: {len(tr_cards)} kart")
    print(f"  EN: {len(en_cards)} kart")
    print(f"  SR: {len(sr_cards)} kart")
    
    # Position bazlı kontrol
    print(f"\n📋 POSITION BAZLI KONTROL:")
    print(f"{'Position':<12} {'TR':<8} {'EN':<8} {'SR':<8} {'Durum'}")
    print("-" * 50)
    
    all_valid = True
    
    for pos in range(1, 9):
        pos_key = f'position{pos}'
        
        tr_count = sum(1 for c in tr_cards.values() if pos_key in c)
        en_count = sum(1 for c in en_cards.values() if pos_key in c)
        sr_count = sum(1 for c in sr_cards.values() if pos_key in c)
        
        # Durum kontrolü
        if tr_count == en_count == sr_count == 78:
            status = "✅ TAMAM"
        elif tr_count == 78 and en_count == 0 and sr_count == 0:
            status = "⏳ BEKLİYOR"
            all_valid = False
        elif tr_count == 78 and 0 < en_count < 78:
            status = f"🔄 ÇALIŞIYOR ({en_count})"
            all_valid = False
        else:
            status = "❌ EKSİK"
            all_valid = False
        
        print(f"Position {pos:<3} {tr_count:<8} {en_count:<8} {sr_count:<8} {status}")
    
    # Anahtar tutarlılığı kontrolü
    print(f"\n🔑 ANAHTAR TUTARLILIĞI:")
    
    missing_in_en = []
    missing_in_sr = []
    
    for card_key in tr_cards.keys():
        if card_key not in en_cards:
            missing_in_en.append(card_key)
        if card_key not in sr_cards:
            missing_in_sr.append(card_key)
    
    if missing_in_en:
        print(f"  ⚠️ EN'de eksik kartlar: {missing_in_en[:5]}... ({len(missing_in_en)} toplam)")
        all_valid = False
    else:
        print(f"  ✅ EN: Tüm kartlar var ({len(en_cards)} kart)")
    
    if missing_in_sr:
        print(f"  ⚠️ SR'de eksik kartlar: {missing_in_sr[:5]}... ({len(missing_in_sr)} toplam)")
        all_valid = False
    else:
        print(f"  ✅ SR: Tüm kartlar var ({len(sr_cards)} kart)")
    
    # Position seviyesinde tutarlılık
    print(f"\n🎯 POSITION SEVİYESİ TUTARLILIK:")
    
    for pos in range(1, 9):
        pos_key = f'position{pos}'
        
        # TR'de position olan kartları al
        tr_cards_with_pos = [k for k, v in tr_cards.items() if pos_key in v]
        en_cards_with_pos = [k for k, v in en_cards.items() if pos_key in v]
        sr_cards_with_pos = [k for k, v in sr_cards.items() if pos_key in v]
        
        # Eksik kartları bul
        missing_en = set(tr_cards_with_pos) - set(en_cards_with_pos)
        missing_sr = set(tr_cards_with_pos) - set(sr_cards_with_pos)
        
        if missing_en or missing_sr:
            print(f"\n  Position {pos}:")
            if missing_en:
                print(f"    ⚠️ EN'de eksik: {list(missing_en)[:3]}... ({len(missing_en)} kart)")
            if missing_sr:
                print(f"    ⚠️ SR'de eksik: {list(missing_sr)[:3]}... ({len(missing_sr)} kart)")
            all_valid = False
        else:
            if len(tr_cards_with_pos) == 78:
                print(f"  ✅ Position {pos}: Tüm dillerde 78 kart")
    
    # Duplicate kontrolü
    print(f"\n🔄 DUPLICATE KONTROLÜ:")
    duplicate_found = False
    
    for pos in range(1, 9):
        pos_key = f'position{pos}'
        
        # Her kart için position key'i sadece 1 kez olmalı
        for card_key in tr_cards.keys():
            positions_in_card = [k for k in tr_cards[card_key].keys() if k.startswith('position')]
            position_counts = {}
            for p in positions_in_card:
                position_counts[p] = position_counts.get(p, 0) + 1
            
            duplicates = [p for p, count in position_counts.items() if count > 1]
            if duplicates:
                print(f"  ⚠️ {card_key}: Duplicate positions {duplicates}")
                duplicate_found = True
    
    if not duplicate_found:
        print(f"  ✅ Duplicate yok")
    
    # SONUÇ
    print(f"\n" + "=" * 80)
    if all_valid and not duplicate_found:
        print("✅ TÜM KONTROLLERDEN GEÇTİ!")
        print("=" * 80)
        print("🎉 Money spread i18n tamamen hazır!")
        sys.exit(0)
    else:
        print("⚠️ SORUNLAR TESPİT EDİLDİ")
        print("=" * 80)
        print("🔧 Yukarıdaki sorunları düzeltin ve tekrar çalıştırın.")
        sys.exit(1)

if __name__ == '__main__':
    main()

