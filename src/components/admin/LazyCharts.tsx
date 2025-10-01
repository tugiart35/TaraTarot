/*
 * Lazy Charts Components
 *
 * Bu dosya chart kütüphanelerini lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';

// Lazy load Recharts (~300KB)
export const RechartsLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          📊 Charts yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);

// Lazy load specific chart components
export const LineChartLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.LineChart,
  })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

export const BarChartLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.BarChart,
  })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

export const PieChartLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.PieChart,
  })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

// Lazy load chart elements
export const LineLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.Line,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const BarLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.Bar,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const XAxisLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.XAxis,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const YAxisLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.YAxis,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const CartesianGridLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.CartesianGrid,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const TooltipLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.Tooltip,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const LegendLazy = dynamic(
  () => import('recharts').then(mod => ({
    default: mod.Legend,
  })),
  {
    loading: () => null,
    ssr: false,
  }
);
