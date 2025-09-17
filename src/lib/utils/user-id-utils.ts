/**
 * User ID Utility Functions
 *
 * Bu dosya projede tutarlı user ID formatları sağlar.
 * Tüm user ID'ler UUID formatında olmalıdır.
 * Guest kullanıcılar için veri saklanmaz.
 */

/**
 * Test kullanıcı için UUID formatında ID oluşturur
 * Format: test-{uuid}
 */
export const generateTestUserId = (baseUuid?: string): string => {
  if (baseUuid) {
    return `test-${baseUuid}`;
  }

  // Yeni test UUID oluştur
  const random1 = Math.random().toString(16).substr(2, 8);
  const random2 = Math.random().toString(16).substr(2, 4);
  const random3 = Math.random().toString(16).substr(2, 4);
  const random4 = Math.random().toString(16).substr(2, 4);
  const random5 = Math.random().toString(16).substr(2, 12);

  return `test-${random1}-${random2}-${random3}-${random4}-${random5}`;
};

/**
 * User ID'nin formatını kontrol eder
 */
export const isValidUserId = (userId: string): boolean => {
  // UUID format kontrolü (gerçek kullanıcılar)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // Test kullanıcı format kontrolü
  const testRegex =
    /^test-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return uuidRegex.test(userId) || testRegex.test(userId);
};

/**
 * User ID tipini belirler
 */
export const getUserType = (userId: string): 'real' | 'test' | 'invalid' => {
  if (!isValidUserId(userId)) {
    return 'invalid';
  }

  if (userId.startsWith('test-')) {
    return 'test';
  }

  return 'real';
};

/**
 * User ID'yi temizler (prefix'leri kaldırır)
 */
export const getCleanUserId = (userId: string): string => {
  if (userId.startsWith('test-')) {
    return userId.replace('test-', '');
  }

  return userId;
};

/**
 * Test kullanıcı ID'leri
 */
export const TEST_USER_IDS = {
  ADMIN: 'a935d7fa-e7e6-469a-923c-371c6382eade',
  USER: '01568b5f-0421-41c7-9f75-c7b10d05118f',
} as const;

/**
 * Test kullanıcı ID'si mi kontrol eder
 */
export const isTestUserId = (userId: string): boolean => {
  return Object.values(TEST_USER_IDS).includes(userId as any);
};
