'use client';

import { useEffect, useState } from 'react';
import {
  auditLogger,
  AuditLogEntry,
  AuditAction,
  ResourceType,
} from '@/lib/audit-logger';
import { logError } from '@/lib/logger';
import {
  Eye,
  Filter,
  Download,
  Clock,
  User,
  Shield,
  AlertTriangle,
  Activity,
  Search,
  RefreshCw,
} from 'lucide-react';

interface AuditLogViewerProps {
  className?: string;
  limit?: number;
}

interface FilterOptions {
  action?: AuditAction;
  resourceType?: ResourceType;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  dateFrom?: Date;
  dateTo?: Date;
  userId?: string;
}

export default function AuditLogViewer({
  className = '',
  limit = 50,
}: AuditLogViewerProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [limit]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      let fetchedLogs: AuditLogEntry[];

      if (Object.keys(filters).length > 0 || searchTerm) {
        fetchedLogs = await auditLogger.filterLogs({
          ...filters,
          limit: limit,
        });
      } else {
        fetchedLogs = await auditLogger.getRecentLogs(limit);
      }

      // Search term filtrelemesi
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        fetchedLogs = fetchedLogs.filter(
          log =>
            log.action.toLowerCase().includes(searchLower) ||
            log.resource_type.toLowerCase().includes(searchLower) ||
            log.user_email?.toLowerCase().includes(searchLower) ||
            (log.metadata &&
              JSON.stringify(log.metadata).toLowerCase().includes(searchLower))
        );
      }

      setLogs(fetchedLogs);
    } catch (err) {
      logError('Failed to fetch audit logs', err);
      setError("Audit log'ları yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const applyFilters = () => {
    fetchLogs();
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    fetchLogs();
  };

  const exportLogs = async (format: 'json' | 'csv') => {
    try {
      const exportData = await auditLogger.exportLogs(format, logs.length);
      const blob = new Blob([exportData], {
        type: format === 'csv' ? 'text/csv' : 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      logError('Failed to export logs', err);
      setError('Log export edilirken hata oluştu');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-400 bg-green-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'high':
        return 'text-orange-400 bg-orange-500/10';
      case 'critical':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-500/10';
      case 'failure':
        return 'text-red-400 bg-red-500/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('login') || action.includes('logout')) return User;
    if (action.includes('security')) return Shield;
    if (action.includes('delete')) return AlertTriangle;
    return Activity;
  };

  if (loading) {
    return (
      <div className={`admin-card rounded-2xl p-6 ${className}`}>
        <div className='flex items-center justify-center h-64'>
          <div className='admin-pulse'>
            <Activity className='h-8 w-8 text-blue-500 mx-auto mb-4' />
          </div>
          <div className='admin-text-shimmer'>Audit log'lar yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-card rounded-2xl ${className}`}>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center space-x-3'>
          <div className='admin-gradient-primary p-3 rounded-xl'>
            <Eye className='h-5 w-5 text-white' />
          </div>
          <div>
            <h3 className='text-xl font-bold text-white'>Audit Log'ları</h3>
            <p className='text-slate-400 text-sm'>Sistem güvenlik kayıtları</p>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='admin-btn-secondary p-3 rounded-lg flex items-center space-x-2'
          >
            <Filter className='h-4 w-4' />
            <span className='hidden sm:inline'>Filtrele</span>
          </button>

          <button
            onClick={() => exportLogs('csv')}
            className='admin-btn-primary p-3 rounded-lg flex items-center space-x-2'
          >
            <Download className='h-4 w-4' />
            <span className='hidden sm:inline'>Dışa Aktar</span>
          </button>

          <button
            onClick={fetchLogs}
            className='admin-btn-ghost p-3 rounded-lg'
          >
            <RefreshCw className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className='admin-glass rounded-xl p-4 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <input
                type='text'
                placeholder='Arama...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none'
              />
            </div>

            {/* Severity Filter */}
            <select
              value={filters.severity || ''}
              onChange={e =>
                handleFilterChange({
                  severity: (e.target.value as any) || undefined,
                })
              }
              className='bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none'
            >
              <option value=''>Tüm Önem Seviyeleri</option>
              <option value='low'>Düşük</option>
              <option value='medium'>Orta</option>
              <option value='high'>Yüksek</option>
              <option value='critical'>Kritik</option>
            </select>

            {/* Date From */}
            <input
              type='date'
              value={filters.dateFrom?.toISOString().split('T')[0] || ''}
              onChange={e => {
                const newFilters: Partial<FilterOptions> = {};
                if (e.target.value) {
                  newFilters.dateFrom = new Date(e.target.value);
                }
                handleFilterChange(newFilters);
              }}
              className='bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <button
              onClick={applyFilters}
              className='admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2'
            >
              <Filter className='h-4 w-4' />
              <span>Filtrele</span>
            </button>

            <button
              onClick={clearFilters}
              className='admin-btn-ghost px-4 py-2 rounded-lg'
            >
              Temizle
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6'>
          <div className='flex items-center space-x-2'>
            <AlertTriangle className='h-5 w-5 text-red-400' />
            <span className='text-red-400'>{error}</span>
          </div>
        </div>
      )}

      {/* Logs List */}
      <div className='space-y-3'>
        {logs.length === 0 ? (
          <div className='text-center py-12'>
            <Activity className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-400'>Hiç audit log bulunamadı</p>
          </div>
        ) : (
          logs.map(log => {
            const ActionIcon = getActionIcon(log.action);

            return (
              <div
                key={log.id}
                className='admin-glass rounded-xl p-4 hover:bg-slate-700/50 transition-colors'
              >
                <div className='flex items-start space-x-4'>
                  <div className='flex-shrink-0'>
                    <div className='admin-gradient-secondary p-2 rounded-lg'>
                      <ActionIcon className='h-4 w-4 text-white' />
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <span className='font-medium text-white'>
                        {log.action}
                      </span>
                      <span className='text-gray-400'>•</span>
                      <span className='text-gray-400'>{log.resource_type}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(log.severity)}`}
                      >
                        {log.severity}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}
                      >
                        {log.status}
                      </span>
                    </div>

                    <div className='text-sm text-gray-400 mb-2'>
                      <span className='flex items-center space-x-2'>
                        <User className='h-3 w-3' />
                        <span>{log.user_email || 'Bilinmeyen kullanıcı'}</span>
                        <Clock className='h-3 w-3 ml-4' />
                        <span>{formatDate(log.timestamp)}</span>
                      </span>
                    </div>

                    {log.metadata && (
                      <div className='text-xs text-gray-500 bg-slate-800/50 rounded p-2 mt-2'>
                        <pre className='whitespace-pre-wrap'>
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Stats */}
      <div className='mt-6 pt-4 border-t border-slate-600'>
        <div className='flex items-center justify-between text-sm text-gray-400'>
          <span>Toplam {logs.length} kayıt görüntüleniyor</span>
          <span>Son güncelleme: {formatDate(new Date().toISOString())}</span>
        </div>
      </div>
    </div>
  );
}
