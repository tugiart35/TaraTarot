export async function triggerEmailSending(
  readingId: string | undefined
): Promise<void> {
  if (!readingId) {
    return;
  }

  try {
    // Doğru endpoint ile e-posta gönder - /api/email/reading kullan
    const response = await fetch('/api/email/reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        readingId: readingId,
      }),
    });

    if (!response.ok) {
      console.warn(
        'Email gönderimi başarısız:',
        response.status,
        response.statusText
      );
    } else {
      const result = await response.json();
      console.log('Email gönderimi başarılı:', readingId, result.fileName);
    }
  } catch (error) {
    console.warn('Email gönderimi sırasında hata:', error);
  }
}
