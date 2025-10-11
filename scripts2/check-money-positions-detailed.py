#!/usr/bin/env python3
"""
Money spread için detaylı position kontrol script'i
Her position için TR/EN/SR'de anahtarların varlığını kontrol eder
"""

import json
import sys

SPREAD_KEY = 'money'
TOTAL_POSITIONS = 8
EXPECTED_CARDS = 78

def main():
    print("=" * 90)
    print("🔍 MONEY SPREAD - DETAYLI POSITION KONTROL RAPORU")
    print("=" * 90)
    
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
    
    # Money meanings
    tr_cards = tr_data.get(SPREAD_KEY, {}).get('meanings', {})
    en_cards = en_data.get(SPREAD_KEY, {}).get('meanings', {})
    sr_cards = sr_data.get(SPREAD_KEY, {}).get('meanings', {})
    
    print(f"\n📦 TOPLAM KART SAYILARI:")
    print(f"  TR: {len(tr_cards)} kart")
    print(f"  EN: {len(en_cards)} kart")
    print(f"  SR: {len(sr_cards)} kart")
    
    # Position bazlı detaylı kontrol
    print(f"\n" + "=" * 90)
    print(f"📊 POSITION BAZLI DETAYLI RAPOR")
    print("=" * 90)
    
    all_complete = True
    summary = []
    
    for pos in range(1, TOTAL_POSITIONS + 1):
        pos_key = f'position{pos}'
        
        # Her dilde kaç kart var?
        tr_count = sum(1 for c in tr_cards.values() if pos_key in c)
        en_count = sum(1 for c in en_cards.values() if pos_key in c)
        sr_count = sum(1 for c in sr_cards.values() if pos_key in c)
        
        # Durum belirleme
        if tr_count == en_count == sr_count == EXPECTED_CARDS:
            status = "✅ TAMAMLANDI"
            icon = "✅"
        elif tr_count == EXPECTED_CARDS and en_count == 0 and sr_count == 0:
            status = "❌ ÇEVİRİ YOK"
            icon = "❌"
            all_complete = False
        elif tr_count == EXPECTED_CARDS and (0 < en_count < EXPECTED_CARDS or 0 < sr_count < EXPECTED_CARDS):
            status = f"🔄 DEVAM EDİYOR (EN:{en_count}, SR:{sr_count})"
            icon = "🔄"
            all_complete = False
        elif tr_count < EXPECTED_CARDS:
            status = "❌ TR EKSİK"
            icon = "❌"
            all_complete = False
        else:
            status = "⚠️ TUTARSIZ"
            icon = "⚠️"
            all_complete = False
        
        # Position başlığı
        print(f"\n{'='*90}")
        print(f"{icon} POSITION {pos}")
        print(f"{'='*90}")
        
        # Sayılar
        print(f"  📊 Kart Sayıları:")
        print(f"     TR: {tr_count}/{EXPECTED_CARDS} {'✅' if tr_count == EXPECTED_CARDS else '❌'}")
        print(f"     EN: {en_count}/{EXPECTED_CARDS} {'✅' if en_count == EXPECTED_CARDS else '❌'}")
        print(f"     SR: {sr_count}/{EXPECTED_CARDS} {'✅' if sr_count == EXPECTED_CARDS else '❌'}")
        print(f"  🎯 Durum: {status}")
        
        # Eksik kartları göster
        if tr_count == EXPECTED_CARDS:
            tr_cards_with_pos = [k for k, v in tr_cards.items() if pos_key in v]
            en_cards_with_pos = [k for k, v in en_cards.items() if pos_key in v]
            sr_cards_with_pos = [k for k, v in sr_cards.items() if pos_key in v]
            
            missing_en = set(tr_cards_with_pos) - set(en_cards_with_pos)
            missing_sr = set(tr_cards_with_pos) - set(sr_cards_with_pos)
            
            if missing_en:
                print(f"\n  ⚠️  EN'de eksik kartlar ({len(missing_en)}):")
                print(f"     İlk 10: {list(missing_en)[:10]}")
            
            if missing_sr:
                print(f"\n  ⚠️  SR'de eksik kartlar ({len(missing_sr)}):")
                print(f"     İlk 10: {list(missing_sr)[:10]}")
        
        # Özet için kaydet
        summary.append({
            'position': pos,
            'tr': tr_count,
            'en': en_count,
            'sr': sr_count,
            'status': status,
            'icon': icon
        })
    
    # ÖZET TABLO
    print(f"\n" + "=" * 90)
    print("📋 ÖZET TABLO")
    print("=" * 90)
    print(f"{'Pos':<6} {'TR':<8} {'EN':<8} {'SR':<8} {'Durum':<40}")
    print("-" * 90)
    
    for item in summary:
        print(f"{item['position']:<6} {item['tr']:<8} {item['en']:<8} {item['sr']:<8} {item['status']}")
    
    # EKSİK POSITION'LAR
    print(f"\n" + "=" * 90)
    print("🎯 EKSİK POSITION'LAR")
    print("=" * 90)
    
    incomplete_positions = [item for item in summary if item['icon'] != '✅']
    
    if incomplete_positions:
        print(f"\n❌ Eksik Position'lar ({len(incomplete_positions)}):")
        for item in incomplete_positions:
            print(f"  Position {item['position']}: TR={item['tr']}, EN={item['en']}, SR={item['sr']} → {item['status']}")
        
        print(f"\n📝 YAPILMASI GEREKENLER:")
        for item in incomplete_positions:
            pos = item['position']
            if item['en'] == 0 and item['sr'] == 0:
                print(f"  • Position {pos}: Çeviri başlat")
                print(f"    → node scripts/extract-money-position{pos}-tr.js")
                print(f"    → nohup python3 scripts/translate-money-position{pos}-with-progress.py > translation-money-pos{pos}.log 2>&1 &")
            elif item['en'] < EXPECTED_CARDS or item['sr'] < EXPECTED_CARDS:
                print(f"  • Position {pos}: Çeviri devam ediyor, bekleyin")
                print(f"    → tail -f translation-money-pos{pos}.log")
    else:
        print(f"\n✅ TÜM POSITION'LAR TAMAMLANDI!")
        print(f"🎉 Money spread i18n %100 hazır!")
    
    # GENEL DURUM
    print(f"\n" + "=" * 90)
    print("🎯 GENEL DURUM")
    print("=" * 90)
    
    completed = len([item for item in summary if item['icon'] == '✅'])
    in_progress = len([item for item in summary if item['icon'] == '🔄'])
    not_started = len([item for item in summary if item['icon'] == '❌'])
    
    print(f"  ✅ Tamamlanan: {completed}/{TOTAL_POSITIONS} position")
    print(f"  🔄 Devam eden: {in_progress}/{TOTAL_POSITIONS} position")
    print(f"  ❌ Başlanmamış: {not_started}/{TOTAL_POSITIONS} position")
    print(f"  📈 İlerleme: {int(completed/TOTAL_POSITIONS*100)}%")
    
    print(f"\n" + "=" * 90)
    
    if all_complete:
        print("✅ TÜM KONTROLLERDEN GEÇTİ!")
        print("=" * 90)
        sys.exit(0)
    else:
        print("⚠️ ÇALIŞMALAR DEVAM EDİYOR")
        print("=" * 90)
        sys.exit(1)

if __name__ == '__main__':
    main()

