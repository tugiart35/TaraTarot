// Supabase bağlantısını test etmek için debug script
// Bu dosyayı browser console'da çalıştırabilirsiniz

// 1. Supabase bağlantısını test et
async function testSupabaseConnection() {
  console.log('🔍 Supabase bağlantısı test ediliyor...');
  
  try {
    // Environment variables kontrolü
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Environment Variables:', {
      url: supabaseUrl ? '✅ Mevcut' : '❌ Eksik',
      key: supabaseKey ? '✅ Mevcut' : '❌ Eksik',
      keyLength: supabaseKey?.length
    });
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Supabase environment variables eksik!');
      return false;
    }
    
    // Supabase client oluştur
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Bağlantı testi
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase bağlantı hatası:', error);
      return false;
    }
    
    console.log('✅ Supabase bağlantısı başarılı!');
    return true;
  } catch (error) {
    console.error('❌ Supabase test hatası:', error);
    return false;
  }
}

// 2. Tabloları kontrol et
async function checkTables() {
  console.log('🔍 Supabase tabloları kontrol ediliyor...');
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const tables = ['profiles', 'tarot_readings', 'detailed_questions', 'user_questions', 'transactions'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('count').limit(1);
      
      if (error) {
        console.log(`❌ ${table} tablosu:`, error.message);
      } else {
        console.log(`✅ ${table} tablosu: Mevcut`);
      }
    } catch (error) {
      console.log(`❌ ${table} tablosu:`, error.message);
    }
  }
}

// 3. Test okuma kaydetme
async function testReadingSave() {
  console.log('🔍 Test okuma kaydetme işlemi...');
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const testData = {
    user_id: `test_${Date.now()}`,
    reading_type: 'love',
    cards: [
      { id: 1, name: 'Test Card', nameTr: 'Test Kartı', isReversed: false }
    ],
    interpretation: 'Test yorumu',
    question: { test: 'Test sorusu' },
    status: 'completed',
    admin_notes: 'Test kaydı'
  };
  
  try {
    const { data, error } = await supabase
      .from('tarot_readings')
      .insert(testData)
      .select('id')
      .single();
    
    if (error) {
      console.error('❌ Test okuma kaydetme hatası:', error);
      return false;
    }
    
    console.log('✅ Test okuma başarıyla kaydedildi:', data);
    
    // Test kaydını sil
    await supabase.from('tarot_readings').delete().eq('id', data.id);
    console.log('✅ Test kaydı temizlendi');
    
    return true;
  } catch (error) {
    console.error('❌ Test okuma kaydetme hatası:', error);
    return false;
  }
}

// 4. Tüm testleri çalıştır
async function runAllTests() {
  console.log('🚀 Tüm testler başlatılıyor...\n');
  
  const connectionTest = await testSupabaseConnection();
  if (!connectionTest) return;
  
  console.log('\n');
  await checkTables();
  
  console.log('\n');
  await testReadingSave();
  
  console.log('\n✅ Tüm testler tamamlandı!');
}

// Testleri çalıştır
runAllTests();
