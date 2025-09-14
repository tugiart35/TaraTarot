'use client';

import { FC } from 'react';

interface ReadingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadingInfoModal: FC<ReadingInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-gray-800 rounded-xl p-6 shadow-lg max-w-md mx-auto'>
        <h2 className='text-lg font-bold text-emerald-400 mb-2'>
          Okuma İşleyişi ve Bilgilendirme
        </h2>
        <ol className='text-gray-200 mb-4 list-decimal list-inside space-y-2'>
          <li>
            Bu bilgilendirme metnini onayladıktan sonra, size 3 soru sorma hakkı
            tanımlanacaktır.
          </li>
          <li>
            Sorularınızı girdikten sonra, tarot kartlarınızı kendiniz
            seçeceksiniz.
          </li>
          <li>
            Seçtiğiniz kartların basit anlamlarını hemen görebileceksiniz.
          </li>
          <li>
            “Okumayı Gönder” butonuna bastığınızda, okuma talebiniz bize
            ulaşacak.
          </li>
          <li>
            2-4 saat içinde okumanızın cevabı e-posta adresinize
            gönderilecektir.
          </li>
        </ol>
        <div className='flex justify-center gap-4 mt-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors'
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingInfoModal;
