'use client';

import { useState, useEffect } from 'react';
import { dynamicImports } from '@/lib/optimization/aggressive-bundle-optimizer';

interface ChartProps {
  data: any[];
  type: 'line' | 'bar' | 'pie';
  onRender?: (chart: any) => void;
}

export function DynamicChart({ data, type, onRender }: ChartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ChartComponent, setChartComponent] = useState<any>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dinamik olarak recharts kütüphanesini yükle
        const recharts = await dynamicImports.charts.recharts();
        
        // Chart component'ini seç
        let component;
        switch (type) {
          case 'line':
            component = recharts.LineChart;
            break;
          case 'bar':
            component = recharts.BarChart;
            break;
          case 'pie':
            component = recharts.PieChart;
            break;
          default:
            component = recharts.LineChart;
        }
        
        setChartComponent(() => component);
        
        if (onRender) {
          onRender(component);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Chart yükleme hatası');
      } finally {
        setIsLoading(false);
      }
    };

    loadChart();
  }, [type, onRender]);

  if (isLoading) {
    return <div className="p-4">Chart yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!ChartComponent) {
    return <div className="p-4">Chart component yüklenemedi</div>;
  }

  return (
    <div className="p-4">
      <ChartComponent data={data} />
    </div>
  );
}
