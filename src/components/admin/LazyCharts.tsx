/*
 * Lazy Charts Components
 *
 * Bu dosya chart kütüphanelerini lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';

// Lazy load Recharts components with proper typing
export const LineChartLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.LineChart })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
) as any;

export const BarChartLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.BarChart })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
) as any;

export const PieChartLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.PieChart })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
) as any;

// Lazy load chart elements
export const LineLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.Line })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const BarLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.Bar })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const XAxisLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.XAxis })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const YAxisLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.YAxis })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const CartesianGridLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.CartesianGrid })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const TooltipLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.Tooltip })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const LegendLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.Legend as any })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;

export const ResponsiveContainerLazy = dynamic(
  () => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })),
  {
    loading: () => null,
    ssr: false,
  }
) as any;