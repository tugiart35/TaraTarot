/**
 * New Lover Spread i18n Helper
 * 
 * Bu dosya, Yeni Sevgili açılımı için i18n çevirilerini yönetir.
 * 
 * Bağlı dosyalar:
 * - messages/tr.json (Türkçe çeviriler - "new-lover" key)
 * - messages/en.json (İngilizce çeviriler - "new-lover" key)
 * - messages/sr.json (Sırpça çeviriler - "new-lover" key)
 * 
 * NOT: messages/*.json'da key "new-lover" (tire ile)
 * 
 * Kullanım:
 * ```typescript
 * const { t } = useNewLoverTranslations();
 * const upright = t('new-lover.meanings.thefool.position1.upright');
 * ```
 */

'use client';

import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * New Lover spread için özel translation hook
 */
export function useNewLoverTranslations() {
  const t = useNextIntlTranslations();
  
  return { t };
}

/**
 * Kart adını i18n key formatına çevirir
 * Örnek: "The Fool" → "thefool"
 */
export function getCardI18nKey(cardName: string): string {
  return cardName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
}

/**
 * Pozisyon numarasından i18n key oluşturur
 * Örnek: 1 → "position1"
 */
export function getPositionI18nKey(position: number): string {
  return `position${position}`;
}

/**
 * New Lover meaning için tam i18n key path'i oluşturur
 * Örnek: ("The Fool", 1, "upright") → "new-lover.meanings.thefool.position1.upright"
 * 
 * NOT: key "new-lover" (tire ile)
 */
export function getNewLoverMeaningI18nKey(
  cardName: string,
  position: number,
  field: 'upright' | 'reversed' | 'keywords' | 'context'
): string {
  const cardKey = getCardI18nKey(cardName);
  const posKey = getPositionI18nKey(position);
  return `new-lover.meanings.${cardKey}.${posKey}.${field}`;
}

