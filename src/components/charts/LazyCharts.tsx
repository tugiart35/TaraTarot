'use client';

import dynamic from 'next/dynamic';

// Skeleton component for loading state
export function ChartSkeleton() {
  return (
    <div className="w-full h-[250px] md:h-[300px] animate-pulse">
      <div className="w-full h-full bg-slate-700/30 rounded-lg flex items-center justify-center">
        <div className="text-slate-400">Chart yükleniyor...</div>
      </div>
    </div>
  );
}

// Dynamic imports for chart components with loading states
export const LazyLineChart = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.LineChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Charts don't need SSR
  }
);

export const LazyBarChart = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.BarChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

export const LazyPieChart = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.PieChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

// Export other recharts components
export const LazyLine = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Line })),
  { ssr: false }
);

export const LazyBar = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Bar })),
  { ssr: false }
);

export const LazyPie = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Pie })),
  { ssr: false }
);

export const LazyCell = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Cell })),
  { ssr: false }
);

export const LazyXAxis = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.XAxis })),
  { ssr: false }
);

export const LazyYAxis = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.YAxis })),
  { ssr: false }
);

export const LazyCartesianGrid = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.CartesianGrid })),
  { ssr: false }
);

export const LazyTooltip = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Tooltip })),
  { ssr: false }
);

export const LazyLegend = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.Legend })),
  { ssr: false }
);

export const LazyResponsiveContainer = dynamic<any>(
  () => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })),
  { ssr: false }
);
