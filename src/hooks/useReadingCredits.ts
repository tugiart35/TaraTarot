/*
info:
Bağlantılı dosyalar:
- constants/reading-credits.ts: Kredi konfigürasyonları (gerekli)
- hooks/useAuth.ts: Kimlik doğrulama hook'u (gerekli)
- lib/supabase/client.ts: Supabase client (gerekli)

Dosyanın amacı:
- Kullanıcının tarot okuma kredilerini yönetmek.
- Kredi kontrolü ve kesintisi yapmak.
- Supabase ile entegre çalışmak.
*/

import { useState, useEffect, useCallback } from 'react';
import { READING_CREDITS, ReadingType } from '@/lib/constants/reading-credits';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';

interface CreditStatus {
  hasEnoughCredits: boolean;
  requiredCredits: number;
  currentCredits: number;
}

export const useReadingCredits = (readingType: ReadingType) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creditStatus, setCreditStatus] = useState<CreditStatus>({
    hasEnoughCredits: false,
    requiredCredits: READING_CREDITS[readingType] || 0,
    currentCredits: 0,
  });

  // Kullanıcı değiştiğinde kredi kontrolü yap
  useEffect(() => {
    if (!user) {
      return;
    }

    const checkCredits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Supabase'den kullanıcı kredilerini al
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('credit_balance')
          .eq('id', user.id)
          .single();

        if (userError) {
          throw userError;
        }

        const currentCredits = userData?.credit_balance || 0;
        const requiredCredits = READING_CREDITS[readingType] || 0;

        setCreditStatus({
          hasEnoughCredits: currentCredits >= requiredCredits,
          requiredCredits,
          currentCredits,
        });
      } catch (err) {
        setError('Kredi bilgisi alınamadı');
      } finally {
        setIsLoading(false);
      }
    };

    checkCredits();
  }, [user?.id, readingType]);

  // Kullanıcının kredi bakiyesini kontrol et (manuel çağrı için)
  const checkCredits = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Supabase'den kullanıcı kredilerini al
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();

      if (userError) {
        throw userError;
      }

      const currentCredits = userData?.credit_balance || 0;
      const requiredCredits = READING_CREDITS[readingType] || 0;

      setCreditStatus({
        hasEnoughCredits: currentCredits >= requiredCredits,
        requiredCredits,
        currentCredits,
      });
    } catch (err) {
      setError('Kredi bilgisi alınamadı');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, readingType]);

  // Kredi kesintisi yap
  const deductCredits = async () => {
    if (!user) {
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requiredCredits = READING_CREDITS[readingType] || 0;

      // Önce mevcut krediyi kontrol et
      const { data: currentUser, error: checkError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();

      if (checkError || !currentUser) {
        throw new Error('Kullanıcı bulunamadı');
      }

      if (currentUser.credit_balance < requiredCredits) {
        throw new Error('Yetersiz kredi');
      }

      // Kredi kesintisi yap
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          credit_balance: currentUser.credit_balance - requiredCredits,
        })
        .eq('id', user.id)
        .select('credit_balance')
        .single();

      if (updateError) {
        throw updateError;
      }

      if (!data) {
        throw new Error('Yetersiz kredi');
      }

      // Transaction log oluştur
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          delta_credits: -requiredCredits,
          reason: `Tarot okuması: ${readingType}`,
          ref_type: 'reading_usage',
          ref_id: null,
        });

      if (transactionError) {
        // Transaction log hatası kritik değil, devam et
      }

      // Güncel kredi durumunu güncelle
      setCreditStatus(prev => ({
        ...prev,
        currentCredits: data.credit_balance,
        hasEnoughCredits: data.credit_balance >= requiredCredits,
      }));

      return true;
    } catch (err) {
      setError('Kredi kesintisi yapılamadı');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    creditStatus,
    isLoading,
    error,
    checkCredits,
    deductCredits,
  };
};
