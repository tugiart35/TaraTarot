'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestReadingPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testRPC = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc(
        'fn_create_reading_with_debit',
        {
          p_user_id: '9c67169b-a114-4d40-95bd-16c30e1f98b4',
          p_reading_type: 'love',
          p_spread_name: 'Test Yayılımı',
          p_title: 'Test Okuma',
          p_interpretation: 'Bu bir test okumasıdır.',
          p_cards: [
            { id: 1, name: 'The Fool', nameTr: 'Budala', isReversed: false },
          ],
          p_questions: {
            personalInfo: {
              name: 'Test',
              surname: 'Kullanıcı',
              birthDate: '1990-01-01',
              email: 'test@example.com',
            },
            userQuestions: {
              concern: { question: 'Test', answer: 'Test cevap' },
            },
          },
          p_cost_credits: 0,
          p_metadata: { duration: 1000, platform: 'web' },
          p_idempotency_key: `test_${Date.now()}`,
        }
      );

      if (error) {
        setResult({
          error: error.message,
          code: error.code,
          details: error.details,
        });
      } else {
        setResult({ success: true, data });
      }
    } catch (err) {
      setResult({
        error: err instanceof Error ? err.message : 'Bilinmeyen hata',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>RPC Fonksiyon Test Sayfası</h1>

      <button
        onClick={testRPC}
        disabled={loading}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
      >
        {loading ? 'Test Ediliyor...' : 'RPC Fonksiyonunu Test Et'}
      </button>

      {result && (
        <div className='mt-6 p-4 bg-gray-100 rounded'>
          <h2 className='text-lg font-semibold mb-2'>Sonuç:</h2>
          <pre className='text-sm overflow-auto'>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
