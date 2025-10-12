/**
 * Money Spread i18n Helper
 * 
 * Bu dosya, Para açılımı için i18n çevirilerini yönetir.
 * 
 * Bağlı dosyalar:
 * - messages/tr.json (Türkçe çeviriler)
 * - messages/en.json (İngilizce çeviriler)
 * - messages/sr.json (Sırpça çeviriler)
 * 
 * Kullanım:
 * ```typescript
 * const { t } = useMoneyTranslations();
 * const upright = t('money.meanings.thefool.position1.upright');
 * ```
 */

'use client';

import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Money spread için özel translation hook
 */
export function useMoneyTranslations() {
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
 * Money meaning için tam i18n key path'i oluşturur
 * Örnek: ("The Fool", 1, "upright") → "money.meanings.thefool.position1.upright"
 */
export function getMoneyMeaningI18nKey(
  cardName: string,
  position: number,
  field: 'upright' | 'reversed' | 'keywords' | 'context'
): string {
  const cardKey = getCardI18nKey(cardName);
  const posKey = getPositionI18nKey(position);
  return `money.meanings.${cardKey}.${posKey}.${field}`;
}

