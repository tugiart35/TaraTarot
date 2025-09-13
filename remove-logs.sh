#!/bin/bash

# Tüm console.log, console.error, console.warn, console.info, console.debug ifadelerini kaldır
find src -name "*.ts" -o -name "*.tsx" | while read file; do
  echo "Processing: $file"
  
  # Console.log ifadelerini kaldır (tek satırlık)
  sed -i '' '/^\s*console\.\(log\|error\|warn\|info\|debug\)(/d' "$file"
  
  # Console.log ifadelerini kaldır (çok satırlık - basit versiyon)
  sed -i '' '/^\s*console\.\(log\|error\|warn\|info\|debug\)(/,/);$/d' "$file"
  
  # Boş satırları temizle
  sed -i '' '/^[[:space:]]*$/N;/^\n$/d' "$file"
done

echo "Log removal completed!"
