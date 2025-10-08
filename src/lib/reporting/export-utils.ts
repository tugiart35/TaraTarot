/*
info:
Bağlantılı dosyalar:
- components/admin/AutoReporting.tsx: Raporlama bileşeni (gerekli)
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)

Dosyanın amacı:
- PDF ve Excel rapor export fonksiyonları
- Analytics verilerini farklı formatlarda dışa aktarma
- Rapor şablonları ve formatları

Supabase değişkenleri ve tabloları:
- profiles: Kullanıcı verileri
- transactions: İşlem verileri
- readings: Okuma verileri
- packages: Paket verileri

Geliştirme önerileri:
- PDF ve Excel export fonksiyonları
- Rapor şablonları
- Dosya boyutu optimizasyonu

Tespit edilen hatalar:
- ✅ Kütüphane bağımlılıkları eklendi

Kullanım durumu:
- ✅ Gerekli: Raporlama sistemi için export fonksiyonları
- ✅ Production-ready: jsPDF ve ExcelJS kütüphaneleri ile
- ✅ Security: xlsx → ExcelJS migration (HIGH vulnerability fixed)
*/

// Lazy load heavy libraries to reduce initial bundle size
let jsPDF: any = null;
let ExcelJS: any = null;

async function loadJsPDF() {
  if (!jsPDF) {
    const module = await import('jspdf');
    jsPDF = module.default;
  }
  return jsPDF;
}

async function loadExcelJS() {
  if (!ExcelJS) {
    ExcelJS = await import('exceljs');
  }
  return ExcelJS;
}

export interface ReportData {
  dailyUsers: number;
  totalUsers: number;
  userGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  creditsSold: number;
  creditUsage: number;
  userRegistrations: { name: string; value: number }[];
  packageSales: { name: string; value: number; color: string }[];
  featureUsage: { name: string; value: number; color: string }[];
  revenueData: { date: string; revenue: number }[];
  userGrowthData: { date: string; users: number }[];
}

export interface ExportOptions {
  title: string;
  type: 'revenue' | 'users' | 'transactions' | 'comprehensive';
  includeCharts?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// PDF Export Fonksiyonu
export const exportToPDF = async (
  data: ReportData,
  options: ExportOptions
): Promise<Blob> => {
  const JsPDF = await loadJsPDF();
  const doc = new JsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Başlık
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(options.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Tarih aralığı
  if (options.dateRange) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const dateText = `${options.dateRange.start.toLocaleDateString('tr-TR')} - ${options.dateRange.end.toLocaleDateString('tr-TR')}`;
    doc.text(dateText, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
  }

  // Rapor türüne göre içerik
  switch (options.type) {
    case 'revenue':
      yPosition = addRevenueSection(doc, data, yPosition, pageWidth);
      break;
    case 'users':
      yPosition = addUsersSection(doc, data, yPosition, pageWidth);
      break;
    case 'transactions':
      yPosition = addTransactionsSection(doc, data, yPosition, pageWidth);
      break;
    case 'comprehensive':
      yPosition = addComprehensiveSection(doc, data, yPosition, pageWidth);
      break;
  }

  // Alt bilgi
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Bu rapor otomatik olarak oluşturulmuştur.', 20, pageHeight - 20);
  doc.text(
    `Oluşturulma Tarihi: ${new Date().toLocaleString('tr-TR')}`,
    20,
    pageHeight - 15
  );

  return doc.output('blob');
};

// Excel Export Fonksiyonu (ExcelJS kullanarak)
export const exportToExcel = async (
  data: ReportData,
  _options: ExportOptions
): Promise<Blob> => {
  const ExcelJSModule = await loadExcelJS();
  const workbook = new ExcelJSModule.Workbook();

  // Ana özet sayfası
  const summarySheet = workbook.addWorksheet('Özet');
  summarySheet.addRow(['Metrik', 'Değer']);
  summarySheet.addRow(['Toplam Kullanıcı', data.totalUsers]);
  summarySheet.addRow(['Günlük Kullanıcı', data.dailyUsers]);
  summarySheet.addRow(['Kullanıcı Büyümesi (%)', data.userGrowth]);
  summarySheet.addRow(['Toplam Gelir (€)', data.totalRevenue]);
  summarySheet.addRow(['Gelir Büyümesi (%)', data.revenueGrowth]);
  summarySheet.addRow(['Satılan Krediler', data.creditsSold]);
  summarySheet.addRow(['Kullanılan Krediler', data.creditUsage]);

  // Header formatting
  summarySheet.getRow(1).font = { bold: true };
  summarySheet.columns = [
    { width: 30 },
    { width: 20 }
  ];

  // Kullanıcı kayıtları
  const userRegSheet = workbook.addWorksheet('Kullanıcı Kayıtları');
  userRegSheet.addRow(['Gün', 'Kayıt Sayısı']);
  data.userRegistrations.forEach(item => {
    userRegSheet.addRow([item.name, item.value]);
  });
  userRegSheet.getRow(1).font = { bold: true };
  userRegSheet.columns = [
    { width: 20 },
    { width: 15 }
  ];

  // Paket satışları
  const packageSheet = workbook.addWorksheet('Paket Satışları');
  packageSheet.addRow(['Paket Adı', 'Satış Sayısı']);
  data.packageSales.forEach(item => {
    packageSheet.addRow([item.name, item.value]);
  });
  packageSheet.getRow(1).font = { bold: true };
  packageSheet.columns = [
    { width: 25 },
    { width: 15 }
  ];

  // Özellik kullanımı
  const featureSheet = workbook.addWorksheet('Özellik Kullanımı');
  featureSheet.addRow(['Özellik', 'Kullanım Sayısı']);
  data.featureUsage.forEach(item => {
    featureSheet.addRow([item.name, item.value]);
  });
  featureSheet.getRow(1).font = { bold: true };
  featureSheet.columns = [
    { width: 25 },
    { width: 15 }
  ];

  // Gelir verileri
  const revenueSheet = workbook.addWorksheet('Gelir Verileri');
  revenueSheet.addRow(['Tarih', 'Gelir (€)']);
  data.revenueData.forEach(item => {
    revenueSheet.addRow([item.date, item.revenue]);
  });
  revenueSheet.getRow(1).font = { bold: true };
  revenueSheet.columns = [
    { width: 20 },
    { width: 15 }
  ];

  // Write to buffer and return as Blob
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
};

// Yardımcı fonksiyonlar
const addRevenueSection = (
  doc: any,
  data: ReportData,
  yPos: number,
  _pageWidth: number
): number => {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Gelir Analizi', 20, yPos);
  yPos += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Toplam Gelir: €${data.totalRevenue.toLocaleString()}`, 20, yPos);
  yPos += 10;
  doc.text(`Gelir Büyümesi: %${data.revenueGrowth}`, 20, yPos);
  yPos += 10;
  doc.text(`Satılan Krediler: ${data.creditsSold.toLocaleString()}`, 20, yPos);
  yPos += 10;
  doc.text(
    `Kullanılan Krediler: ${data.creditUsage.toLocaleString()}`,
    20,
    yPos
  );
  yPos += 20;

  return yPos;
};

const addUsersSection = (
  doc: any,
  data: ReportData,
  yPos: number,
  _pageWidth: number
): number => {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Kullanıcı Analizi', 20, yPos);
  yPos += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Toplam Kullanıcı: ${data.totalUsers.toLocaleString()}`, 20, yPos);
  yPos += 10;
  doc.text(`Günlük Kullanıcı: ${data.dailyUsers}`, 20, yPos);
  yPos += 10;
  doc.text(`Kullanıcı Büyümesi: %${data.userGrowth}`, 20, yPos);
  yPos += 20;

  // Günlük kayıtlar tablosu
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Günlük Kayıtlar', 20, yPos);
  yPos += 15;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  data.userRegistrations.forEach(item => {
    doc.text(`${item.name}: ${item.value}`, 30, yPos);
    yPos += 8;
  });

  return yPos + 10;
};

const addTransactionsSection = (
  doc: any,
  data: ReportData,
  yPos: number,
  _pageWidth: number
): number => {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('İşlem Analizi', 20, yPos);
  yPos += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Toplam Gelir: €${data.totalRevenue.toLocaleString()}`, 20, yPos);
  yPos += 10;
  doc.text(`Satılan Krediler: ${data.creditsSold.toLocaleString()}`, 20, yPos);
  yPos += 10;
  doc.text(
    `Kullanılan Krediler: ${data.creditUsage.toLocaleString()}`,
    20,
    yPos
  );
  yPos += 20;

  return yPos;
};

const addComprehensiveSection = (
  doc: any,
  data: ReportData,
  yPos: number,
  pageWidth: number
): number => {
  // Tüm bölümleri ekle
  yPos = addRevenueSection(doc, data, yPos, pageWidth);
  yPos = addUsersSection(doc, data, yPos, pageWidth);
  yPos = addTransactionsSection(doc, data, yPos, pageWidth);

  return yPos;
};

// Dosya indirme yardımcı fonksiyonu
export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
