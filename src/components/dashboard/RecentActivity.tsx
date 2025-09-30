// Dashboard son aktiviteler bileşeni

import { Reading } from '@/types/dashboard.types';
import {
  formatDate,
  downloadReading,
  getReadingTitle,
} from '@/utils/dashboard-utils';
import { calculateUserLevel } from '@/utils/dashboard/user-level-utils';
import { getDashboardRoutes } from '@/utils/dashboard/routing-utils';
import {
  BookOpen,
  Hash,
  Eye,
  Download,
  Heart,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  StarIcon,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';

interface RecentActivityProps {
  recentReadings: Reading[];
  setSelectedReading: (_reading: Reading | null) => void;
  totalReadings?: number;
  isAdmin?: boolean;
  currentLocale?: string;
}

// Son aktiviteler bileşeni
export default function RecentActivity({
  recentReadings,
  setSelectedReading,
  totalReadings = 0,
  isAdmin = false,
  currentLocale = 'tr',
}: RecentActivityProps) {
  const { t } = useTranslations();
  const routes = getDashboardRoutes(currentLocale);
  // Hesaplanan değerler
  const todayReadings = recentReadings.filter(reading => {
    const today = new Date().toDateString();
    const readingDate = new Date(reading.created_at).toDateString();
    return today === readingDate;
  }).length;

  const weeklyReadings = recentReadings.filter(reading => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(reading.created_at) >= weekAgo;
  }).length;

  // Kullanıcı seviyesi hesaplama
  const userLevel = calculateUserLevel(totalReadings, isAdmin, recentReadings);
  const LevelIcon = userLevel.icon;
  return (
    <div
      className='grid grid-cols-1 lg:grid-cols-2 gap-8'
      role='region'
      aria-label='Son aktiviteler ve istatistikler'
    >
      {/* Recent Readings - Son okumalar kartı */}
      <div
        className='card'
        role='article'
        aria-labelledby='recent-readings-title'
      >
        <div className='p-6 border-b border-cosmic-fog'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <BookOpen className='h-5 w-5 text-gold' />
              <h3
                id='recent-readings-title'
                className='text-heading-3 text-gold'
              >
                {t('dashboard.recentReadings', 'Son Okumalar')}
              </h3>
              <span className='bg-gold/20 text-gold px-2 py-1 rounded-full text-xs font-medium'>
                {recentReadings.length}
              </span>
            </div>
            {/* Tüm okumaları gör linki */}
            <a
              href={routes.readings}
              className='text-gold hover:text-gold/80 text-sm font-medium transition-colors duration-200 hover:bg-gold/10 px-3 py-1 rounded-lg'
            >
              {t('common.viewAll', 'Tümünü Gör')} →
            </a>
          </div>
        </div>

        <div className='p-6'>
          {recentReadings.length > 0 ? (
            <div className='space-y-4'>
              {/* Her okuma için kart oluştur - maksimum 5 okuma göster */}
              {recentReadings.slice(0, 5).map(reading => (
                <div
                  key={reading.id}
                  className='flex items-center space-x-4 p-4 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-all duration-200 hover:scale-[1.02] group'
                >
                  {/* Okuma türü ikonu */}
                  <div
                    className={`p-3 rounded-lg transition-all duration-200 group-hover:scale-110 ${
                      reading.reading_type.includes('LOVE')
                        ? 'bg-purple/20 group-hover:bg-purple/30'
                        : reading.reading_type.includes(
                              'GENERAL, SITUATION_ANALYSIS, PROBLEM_SOLVING'
                            ) || reading.reading_type.includes('THREE_CARD')
                          ? 'bg-green/20 group-hover:bg-green/30'
                          : reading.reading_type.includes('CAREER')
                            ? 'bg-blue/20 group-hover:bg-blue/30'
                            : 'bg-info/20 group-hover:bg-info/30'
                    }`}
                  >
                    {reading.reading_type.includes('LOVE') ? (
                      <Heart className='h-5 w-5 text-purple' />
                    ) : reading.reading_type.includes('GENERAL') ||
                      reading.reading_type.includes('THREE_CARD') ? (
                      <BookOpen className='h-5 w-5 text-green' />
                    ) : reading.reading_type.includes('CAREER') ? (
                      <Hash className='h-5 w-5 text-blue' />
                    ) : (
                      <Hash className='h-5 w-5 text-info' />
                    )}
                  </div>
                  {/* Okuma bilgileri */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-text-celestial truncate group-hover:text-gold transition-colors'>
                      {reading.title && reading.title.includes('.')
                        ? t(reading.title, reading.title)
                        : t(
                            `tarot.${reading.reading_type}.data.detailedTitle`,
                            getReadingTitle(reading.reading_type)
                          )}
                    </p>
                    <div className='flex items-center space-x-3 text-xs text-text-muted'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-3 w-3' />
                        <span>{formatDate(reading.created_at)}</span>
                      </div>
                      {reading.formatInfo && (
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${reading.formatInfo.color}`}
                        >
                          {reading.formatInfo.iconComponent}{' '}
                          {reading.formatInfo.label}
                        </div>
                      )}
                      <div className='px-2 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-xs font-medium'>
                        {reading.cost_credits || 0}{' '}
                        {t('common.credits', 'kredi')}
                      </div>
                    </div>
                  </div>
                  {/* Aksiyon butonları */}
                  <div className='flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    {/* Okumayı görüntüle butonu */}
                    <button
                      onClick={() => setSelectedReading(reading)} // Modal aç
                      className='p-2 text-text-muted hover:text-gold hover:bg-gold/10 rounded-lg transition-all duration-200 hover:scale-110'
                      title={t('dashboard.viewReading', 'Okumayı Görüntüle')}
                      aria-label={t(
                        'dashboard.viewReading',
                        'Okumayı Görüntüle'
                      )}
                    >
                      <Eye className='h-4 w-4' />
                    </button>
                    {/* Okumayı indir butonu */}
                    <button
                      onClick={() => downloadReading(reading)} // İndirme başlat
                      className='p-2 text-text-muted hover:text-success hover:bg-success/10 rounded-lg transition-all duration-200 hover:scale-110'
                      title={t('dashboard.downloadReading', 'Okumayı İndir')}
                      aria-label={t(
                        'dashboard.downloadReading',
                        'Okumayı İndir'
                      )}
                    >
                      <Download className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              ))}

              {/* 5'ten fazla okuma varsa bilgi göster */}
              {recentReadings.length > 5 && (
                <div className='text-center pt-4 border-t border-cosmic-fog'>
                  <p className='text-sm text-text-muted mb-2'>
                    +{recentReadings.length - 5}{' '}
                    {t('dashboard.moreReadings', 'okuma daha var')}
                  </p>
                  <a
                    href={routes.readings}
                    className='text-gold hover:text-gold/80 text-sm font-medium'
                  >
                    {t('dashboard.viewAllReadings', 'Tüm okumaları görüntüle')}{' '}
                    →
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Okuma yoksa boş durum göster */
            <div className='text-center py-12'>
              <div className='relative'>
                <BookOpen className='h-16 w-16 text-text-muted mx-auto mb-4 opacity-50' />
                <div className='absolute -top-2 -right-2'>
                  <Sparkles className='h-6 w-6 text-gold animate-pulse' />
                </div>
              </div>
              <h3 className='text-lg font-medium text-text-celestial mb-2'>
                ✨{' '}
                {t(
                  'dashboard.welcomeMessage',
                  'Mistik Yolculuğunuza Hoş Geldiniz!'
                )}
              </h3>
              <p className='text-sm text-text-muted mb-6 max-w-sm mx-auto'>
                {t(
                  'dashboard.noReadingsYet',
                  'Henüz okuma yapılmamış. İlk mistik deneyiminizi yaşamak için bir okuma başlatın ve kaderinizin sırlarını keşfedin.'
                )}
              </p>
              <Link
                href='/tarot'
                className='btn btn-primary hover:scale-105 transition-transform duration-200'
              >
                🔮 {t('dashboard.startFirstReading', 'İlk Okumamı Başlat')}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Hızlı istatistikler kartı */}
      <div className='card' role='article' aria-labelledby='quick-stats-title'>
        <div className='p-6 border-b border-cosmic-fog'>
          <div className='flex items-center space-x-2'>
            <TrendingUp className='h-5 w-5 text-gold' />
            <h3 id='quick-stats-title' className='text-heading-3 text-gold'>
              {t('dashboard.statistics', 'Hızlı İstatistikler')}
            </h3>
          </div>
        </div>

        <div className='p-6'>
          <div className='space-y-6'>
            {/* Günlük okuma sayısı */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4 text-success' />
                <span className='text-sm font-medium text-text-muted'>
                  {t('dashboard.todayReadings', 'Bugünkü Okumalar')}
                </span>
              </div>
              <span className='text-sm font-semibold text-text-celestial'>
                {todayReadings}
              </span>
            </div>
            <div className='w-full bg-crystal-clear rounded-full h-2'>
              <div
                className='bg-success h-2 rounded-full transition-all duration-500'
                style={{ width: `${Math.min(todayReadings * 20, 100)}%` }}
              ></div>
            </div>

            {/* Haftalık okuma sayısı */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Target className='h-4 w-4 text-info' />
                <span className='text-sm font-medium text-text-muted'>
                  {t('dashboard.thisWeek', 'Bu Hafta')}
                </span>
              </div>
              <span className='text-sm font-semibold text-text-celestial'>
                {weeklyReadings}/7
              </span>
            </div>
            <div className='w-full bg-crystal-clear rounded-full h-2'>
              <div
                className='bg-info h-2 rounded-full transition-all duration-500'
                style={{
                  width: `${Math.min((weeklyReadings / 7) * 100, 100)}%`,
                }}
              ></div>
            </div>

            {/* Mistik seviye */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <LevelIcon className={`h-4 w-4 ${userLevel.color}`} />
                <span className='text-sm font-medium text-text-muted'>
                  {t('dashboard.mysticLevel', 'Mistik Seviye')}
                </span>
              </div>
              <span className={`text-sm font-semibold ${userLevel.color}`}>
                {userLevel.level}
              </span>
            </div>
            <div className='w-full bg-crystal-clear rounded-full h-2'>
              <div
                className='bg-purple h-2 rounded-full transition-all duration-500'
                style={{ width: `${userLevel.progress}%` }}
              ></div>
            </div>

            {/* Motivasyon mesajı */}
            {totalReadings === 0 && (
              <div className='bg-gold/10 border border-gold/20 rounded-lg p-4 text-center'>
                <Sparkles className='h-6 w-6 text-gold mx-auto mb-2' />
                <p className='text-sm text-gold font-medium'>
                  🌟{' '}
                  {t(
                    'dashboard.discoverLevel',
                    'İlk okumanızı yapın ve seviyenizi keşfedin!'
                  )}
                </p>
              </div>
            )}

            {totalReadings > 0 && totalReadings < 10 && (
              <div className='bg-green/10 border border-green/20 rounded-lg p-4 text-center'>
                <Heart className='h-6 w-6 text-green mx-auto mb-2' />
                <p className='text-sm text-green font-medium'>
                  💫{' '}
                  {t('dashboard.keepGoing', 'Harika gidiyorsunuz! Devam edin!')}
                </p>
              </div>
            )}

            {totalReadings >= 10 && (
              <div className='bg-purple/10 border border-purple/20 rounded-lg p-4 text-center'>
                <StarIcon className='h-6 w-6 text-purple mx-auto mb-2' />
                <p className='text-sm text-purple font-medium'>
                  ✨{' '}
                  {t(
                    'dashboard.mysticJourney',
                    'Mistik yolculuğunuzda ilerliyorsunuz!'
                  )}
                </p>
              </div>
            )}

            {/* Detaylı istatistikler linki */}
            <a
              href={routes.statistics}
              className='btn btn-primary w-full hover:scale-105 transition-transform duration-200'
            >
              📊 {t('dashboard.detailedStatistics', 'Detaylı İstatistikler')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
