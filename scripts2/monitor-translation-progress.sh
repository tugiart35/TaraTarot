#!/bin/bash
# İlerleme Monitörü - Translation Progress Tracker

LOGFILE="translation-all-hybrid.log"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 HYBRID ÇEVIRICI İLERLEME MONITÖRÜ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
date "+⏰ Kontrol Zamanı: %Y-%m-%d %H:%M:%S"
echo ""

# Process çalışıyor mu?
if pgrep -f "translate-all-positions-hybrid.py" > /dev/null; then
    echo "✅ Process ÇALIŞIYOR"
    PID=$(pgrep -f "translate-all-positions-hybrid.py")
    echo "   PID: $PID"
else
    echo "❌ Process DURDURULMUŞ"
    echo "   Son durum:"
    tail -20 "$LOGFILE"
    exit 1
fi

# Son satırlar
echo ""
echo "📈 Son İlerleme (son 15 satır):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
tail -15 "$LOGFILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# İstatistikler
GROQ_SUCCESS=$(grep -c "Groq" "$LOGFILE" 2>/dev/null || echo "0")
GOOGLE_SUCCESS=$(grep -c "Google" "$LOGFILE" 2>/dev/null || echo "0")
SAVED=$(grep -c "💾" "$LOGFILE" 2>/dev/null || echo "0")

echo "📊 İSTATİSTİKLER:"
echo "   ⚡ Groq başarı: $GROQ_SUCCESS"
echo "   🌐 Google başarı: $GOOGLE_SUCCESS"
echo "   💾 Kaydedilen: $SAVED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

