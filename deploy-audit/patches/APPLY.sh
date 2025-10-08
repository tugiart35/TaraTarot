#!/bin/bash

# ============================================
# PATCH UYGULAMA SCRIPTI
# ============================================
# Kullanım: ./APPLY.sh [patch-number]
# Örnek: ./APPLY.sh 001
# Tümü için: ./APPLY.sh all
# ============================================

set -e  # Hata durumunda dur

PATCHES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$PATCHES_DIR/../.." && pwd)"

echo "🔧 Patch Application Script"
echo "📁 Patches directory: $PATCHES_DIR"
echo "📁 Project root: $PROJECT_ROOT"
echo ""

# Check APPLY environment variable
if [ "$APPLY" != "true" ]; then
  echo "⚠️  APPLY=true değil, patch'ler uygulanmayacak!"
  echo "⚠️  Sadece preview modunda çalışıyor..."
  echo ""
  echo "Patch'leri uygulamak için:"
  echo "  APPLY=true ./APPLY.sh [patch-number]"
  echo ""
  exit 0
fi

cd "$PROJECT_ROOT"

# ============================================
# FUNCTIONS
# ============================================

apply_patch_001() {
  echo "🔒 Applying Patch 001: .gitignore Security Fix"
  bash "$PATCHES_DIR/001-gitignore-security-fix.patch"
  echo "✅ Patch 001 applied"
  echo ""
}

apply_patch_002() {
  echo "📝 Applying Patch 002: env.example Update"
  bash "$PATCHES_DIR/002-env-example-update.patch"
  echo "✅ Patch 002 applied"
  echo ""
}

apply_patch_003() {
  echo "🔧 Applying Patch 003: Environment Validator"
  
  # Extract and create the file
  sed -n '/^---$/,/^---$/p' "$PATCHES_DIR/003-env-validator.patch" | \
    sed '1d;$d' | \
    sed '/^File: /d' | \
    sed '/^END OF FILE$/d' > src/lib/env-validator.ts
  
  echo "✅ Created: src/lib/env-validator.ts"
  echo "📋 Please add validation to next.config.js manually"
  echo "✅ Patch 003 applied"
  echo ""
}

# ============================================
# MAIN LOGIC
# ============================================

PATCH_NUM="${1:-}"

if [ -z "$PATCH_NUM" ]; then
  echo "❌ Error: Patch number required"
  echo ""
  echo "Usage:"
  echo "  APPLY=true ./APPLY.sh 001      # Apply specific patch"
  echo "  APPLY=true ./APPLY.sh all      # Apply all patches"
  echo ""
  exit 1
fi

echo "🚀 Starting patch application..."
echo "⚠️  APPLY=true detected - patches will be applied!"
echo ""

# Backup
echo "💾 Creating backup..."
git add -A 2>/dev/null || true
git stash push -m "Backup before applying patches $(date +%Y%m%d_%H%M%S)" || true
echo "✅ Backup created"
echo ""

case "$PATCH_NUM" in
  001)
    apply_patch_001
    ;;
  002)
    apply_patch_002
    ;;
  003)
    apply_patch_003
    ;;
  all)
    echo "📦 Applying all patches..."
    echo ""
    apply_patch_001
    apply_patch_002
    apply_patch_003
    echo "✅ All patches applied!"
    ;;
  *)
    echo "❌ Unknown patch: $PATCH_NUM"
    echo "Available patches: 001, 002, 003, all"
    exit 1
    ;;
esac

echo ""
echo "✅ Patch application complete!"
echo ""
echo "⏭️  NEXT STEPS:"
echo "1. Review changes: git diff"
echo "2. Test the application: npm run dev"
echo "3. Run type check: npm run typecheck"
echo "4. If everything works, commit: git add -A && git commit -m 'Applied security patches'"
echo "5. If something breaks, restore: git stash pop"
echo ""

