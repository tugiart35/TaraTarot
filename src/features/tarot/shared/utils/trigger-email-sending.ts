export async function triggerEmailSending(readingId: string | undefined): Promise<void> {
  if (!readingId) {
    return;
  }

  try {
    const response = await fetch('/api/send-reading-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ readingId }),
    });

    if (!response.ok) {
      // Email gönderimi başarısız oldu; sessizce devam et.
    }
  } catch {
    // Email gönderimi sırasında beklenmeyen bir hata oluştu; sessizce devam et.
  }
}
