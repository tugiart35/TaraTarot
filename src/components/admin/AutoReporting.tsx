'use client';

import { useState, useEffect } from 'react';
import { Calendar, Download, Mail, Clock, FileText, TrendingUp, Settings, Play, Pause, Users } from 'lucide-react';

interface ReportSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reportType: 'revenue' | 'users' | 'transactions' | 'comprehensive';
  recipients: string[];
  lastRun: string | null;
  nextRun: string;
  active: boolean;
  format: 'pdf' | 'excel' | 'email';
}

interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  size: string;
  downloadUrl: string;
}

export default function AutoReporting() {
  const [schedules, setSchedules] = useState<ReportSchedule[]>([]);
  const [recentReports, setRecentReports] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSchedules();
    loadRecentReports();
  }, []);

  const loadSchedules = () => {
    // Mock data - in production this would come from database
    const mockSchedules: ReportSchedule[] = [
      {
        id: '1',
        name: 'Günlük Gelir Raporu',
        frequency: 'daily',
        reportType: 'revenue',
        recipients: ['admin@busbuskimki.com'],
        lastRun: '2024-01-15T08:00:00Z',
        nextRun: '2024-01-16T08:00:00Z',
        active: true,
        format: 'email'
      },
      {
        id: '2',
        name: 'Haftalık Kullanıcı Analizi',
        frequency: 'weekly',
        reportType: 'users',
        recipients: ['manager@busbuskimki.com'],
        lastRun: '2024-01-14T09:00:00Z',
        nextRun: '2024-01-21T09:00:00Z',
        active: true,
        format: 'excel'
      },
      {
        id: '3',
        name: 'Aylık Kapsamlı Rapor',
        frequency: 'monthly',
        reportType: 'comprehensive',
        recipients: ['admin@busbuskimki.com', 'ceo@busbuskimki.com'],
        lastRun: '2024-01-01T10:00:00Z',
        nextRun: '2024-02-01T10:00:00Z',
        active: false,
        format: 'pdf'
      }
    ];
    setSchedules(mockSchedules);
  };

  const loadRecentReports = () => {
    // Mock data - in production this would come from database
    const mockReports: GeneratedReport[] = [
      {
        id: '1',
        name: 'Günlük Gelir Raporu - 15 Ocak 2024',
        type: 'revenue',
        generatedAt: '2024-01-15T08:00:00Z',
        size: '245 KB',
        downloadUrl: '#'
      },
      {
        id: '2',
        name: 'Haftalık Kullanıcı Analizi - 8-14 Ocak',
        type: 'users',
        generatedAt: '2024-01-14T09:00:00Z',
        size: '1.2 MB',
        downloadUrl: '#'
      },
      {
        id: '3',
        name: 'Transaction Özeti - 14 Ocak',
        type: 'transactions',
        generatedAt: '2024-01-14T14:30:00Z',
        size: '567 KB',
        downloadUrl: '#'
      }
    ];
    setRecentReports(mockReports);
  };

  const toggleSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, active: !schedule.active }
        : schedule
    ));
  };

  const generateManualReport = async (type: string) => {
    setLoading(true);
    try {
      // Mock report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport: GeneratedReport = {
        id: Date.now().toString(),
        name: `Manuel ${type} Raporu - ${new Date().toLocaleDateString('tr-TR')}`,
        type,
        generatedAt: new Date().toISOString(),
        size: `${Math.floor(Math.random() * 1000 + 100)} KB`,
        downloadUrl: '#'
      };
      
      setRecentReports(prev => [newReport, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Günlük';
      case 'weekly': return 'Haftalık';
      case 'monthly': return 'Aylık';
      default: return frequency;
    }
  };

  const getReportTypeText = (type: string) => {
    switch (type) {
      case 'revenue': return 'Gelir';
      case 'users': return 'Kullanıcılar';
      case 'transactions': return 'İşlemler';
      case 'comprehensive': return 'Kapsamlı';
      default: return type;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'email': return '📧';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gold">Otomatik Raporlama</h3>
      </div>

      {/* Manual Report Generation */}
      <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
        <h4 className="font-medium text-gold mb-4">Manuel Rapor Oluşturma</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => generateManualReport('revenue')}
            disabled={loading}
            className="p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded flex items-center justify-center disabled:opacity-50"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Gelir Raporu
          </button>
          <button
            onClick={() => generateManualReport('users')}
            disabled={loading}
            className="p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded flex items-center justify-center disabled:opacity-50"
          >
            <Users className="h-4 w-4 mr-2" />
            Kullanıcı Raporu
          </button>
          <button
            onClick={() => generateManualReport('transactions')}
            disabled={loading}
            className="p-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded flex items-center justify-center disabled:opacity-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            İşlem Raporu
          </button>
          <button
            onClick={() => generateManualReport('comprehensive')}
            disabled={loading}
            className="p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded flex items-center justify-center disabled:opacity-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Kapsamlı Rapor
          </button>
        </div>
        {loading && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold mr-2"></div>
              <span className="text-lavender">Rapor oluşturuluyor...</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scheduled Reports */}
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <h4 className="font-medium text-gold mb-4">Zamanlanmış Raporlar</h4>
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="bg-night/30 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white">{schedule.name}</h5>
                  <button
                    onClick={() => toggleSchedule(schedule.id)}
                    className={`p-1 rounded ${
                      schedule.active 
                        ? 'text-green-400 hover:bg-green-500/20' 
                        : 'text-red-400 hover:bg-red-500/20'
                    }`}
                  >
                    {schedule.active ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-lavender">
                  <div>
                    <span className="font-medium">Sıklık:</span> {getFrequencyText(schedule.frequency)}
                  </div>
                  <div>
                    <span className="font-medium">Tip:</span> {getReportTypeText(schedule.reportType)}
                  </div>
                  <div>
                    <span className="font-medium">Format:</span> {getFormatIcon(schedule.format)} {schedule.format.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium">Durum:</span>
                    <span className={`ml-1 ${schedule.active ? 'text-green-400' : 'text-red-400'}`}>
                      {schedule.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-lavender">
                  <div>Son çalışma: {schedule.lastRun ? formatDate(schedule.lastRun) : 'Hiç'}</div>
                  <div>Sonraki çalışma: {formatDate(schedule.nextRun)}</div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-lavender">
                    {schedule.recipients.length} alıcı
                  </div>
                  <button className="text-xs text-lavender hover:text-gold">
                    <Settings className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <h4 className="font-medium text-gold mb-4">Son Oluşturulan Raporlar</h4>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="bg-night/30 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white text-sm">{report.name}</h5>
                  <button className="text-lavender hover:text-gold">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-lavender">
                  <div>
                    <span className="font-medium">Tip:</span> {getReportTypeText(report.type)}
                  </div>
                  <div>
                    <span className="font-medium">Boyut:</span> {report.size}
                  </div>
                  <div>
                    <span className="font-medium">Tarih:</span> {formatDate(report.generatedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-lavender/5 rounded p-3 border border-lavender/10 text-center">
          <Clock className="h-6 w-6 text-gold mx-auto mb-1" />
          <p className="text-sm text-lavender">Aktif Zamanlamalar</p>
          <p className="text-lg font-bold text-white">{schedules.filter(s => s.active).length}</p>
        </div>
        
        <div className="bg-lavender/5 rounded p-3 border border-lavender/10 text-center">
          <FileText className="h-6 w-6 text-blue-400 mx-auto mb-1" />
          <p className="text-sm text-lavender">Bu Ay Raporlar</p>
          <p className="text-lg font-bold text-white">{recentReports.length}</p>
        </div>
        
        <div className="bg-lavender/5 rounded p-3 border border-lavender/10 text-center">
          <Mail className="h-6 w-6 text-green-400 mx-auto mb-1" />
          <p className="text-sm text-lavender">Email Raporları</p>
          <p className="text-lg font-bold text-white">{schedules.filter(s => s.format === 'email').length}</p>
        </div>
        
        <div className="bg-lavender/5 rounded p-3 border border-lavender/10 text-center">
          <Download className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
          <p className="text-sm text-lavender">İndirilebilir</p>
          <p className="text-lg font-bold text-white">{schedules.filter(s => s.format !== 'email').length}</p>
        </div>
      </div>
    </div>
  );
}
