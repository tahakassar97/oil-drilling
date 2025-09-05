/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface DrillingData {
  depth: number;
  SH: number;
  SS: number;
  LS: number;
  DOL: number;
  ANH: number;
  Coal: number;
  Salt: number;
  DT: number;
  GR: number;
  MINFINAL: number;
  UCS: number;
  FA: number;
  RAT: number;
  ROP: number;
}

interface DrillingChartsProps {
  data: DrillingData[];
}

const DrillingCharts: FC<DrillingChartsProps> = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center text-gray-500">
        No data available. Please upload a fil.
      </div>
    );
  }


  const sortedData = [...data].sort((a, b) => a.depth - b.depth);

  const rockCompositionData = sortedData.map(item => ({
    depth: item.depth,
    SH: (item.SH || 0) * 100,
    SS: (item.SS || 0) * 100,
    LS: (item.LS || 0) * 100,
    DOL: (item.DOL || 0) * 100,
    ANH: (item.ANH || 0) * 100,
    Coal: (item.Coal || 0) * 100,
    Salt: (item.Salt || 0) * 100,
  }));

  // Base chart options
  const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Horizontal charts
    scales: {
      y: {
        reverse: true, // Depth increases downward
        title: {
          display: true,
          text: 'Depth (ft)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Drilling Data Analysis'
      }
    }
  };

  // Rock composition chart options (stacked)
  const rockCompositionOptions = {
    ...baseChartOptions,
    scales: {
      ...baseChartOptions.scales,
      x: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      }
    },
    plugins: {
      ...baseChartOptions.plugins,
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.x;
            return `${label}: ${value.toFixed(2)}%`;
          }
        }
      }
    }
  };

  // DT/GR chart options (not stacked)
  const lineChartOptions = {
    ...baseChartOptions,
    scales: {
      ...baseChartOptions.scales,
      x: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  // Rock Composition Chart Data
  const rockCompositionChartData = {
    labels: rockCompositionData.map(item => item.depth.toString()),
    datasets: [
      {
        label: 'SH',
        data: rockCompositionData.map(item => item.SH),
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'SS',
        data: rockCompositionData.map(item => item.SS),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'LS',
        data: rockCompositionData.map(item => item.LS),
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'DOL',
        data: rockCompositionData.map(item => item.DOL),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'ANH',
        data: rockCompositionData.map(item => item.ANH),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'Coal',
        data: rockCompositionData.map(item => item.Coal),
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      },
      {
        label: 'Salt',
        data: rockCompositionData.map(item => item.Salt),
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 1,
        fill: true,
        stack: '1'
      }
    ]
  };

  // DT Chart Data
  const dtData = sortedData.map(item => item.DT);
  
  const dtChartData = {
    labels: sortedData.map(item => item.depth.toString()),
    datasets: [
      {
        label: 'DT',
        data: dtData,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }
    ]
  };

  // GR Chart Data
  const grData = sortedData.map(item => item.GR);
  const grChartData = {
    labels: sortedData.map(item => item.depth.toString()),
    datasets: [
      {
        label: 'GR',
        data: grData,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }
    ]
  };

  return (
    <div className="w-full h-[600px] bg-white">
      {/* Three Charts Side by Side */}
      <div className="flex h-[520px]">
        {/* Rock Composition Chart */}
        <div className="flex-1 border-r border-gray-300 p-2">
          <div className="text-center py-2 text-sm font-medium border-b border-gray-200 mb-2">
            Rock Composition (%)
          </div>
          <div style={{ height: '450px' }}>
            <Line data={rockCompositionChartData} options={rockCompositionOptions} />
          </div>
        </div>

        {/* DT Chart */}
        <div className="flex-1 border-r border-gray-300 p-2">
          <div className="text-center py-2 text-sm font-medium border-b border-gray-200 mb-2">
            DT
          </div>
          <div style={{ height: '450px' }}>
            <Line data={dtChartData} options={{
              ...lineChartOptions,
              scales: {
                ...lineChartOptions.scales,
                x: {
                  ...lineChartOptions.scales.x,
                  min: Math.min(...dtData) * 0.9,
                  max: Math.max(...dtData) * 1.1,
                  title: {
                    display: true,
                    text: 'DT Value'
                  }
                }
              }
            }} />
          </div>
        </div>

        {/* GR Chart */}
        <div className="flex-1 p-2">
          <div className="text-center py-2 text-sm font-medium border-b border-gray-200 mb-2">
            GR
          </div>
          <div style={{ height: '450px' }}>
            <Line data={grChartData} options={{
              ...lineChartOptions,
              scales: {
                ...lineChartOptions.scales,
                x: {
                  ...lineChartOptions.scales.x,
                  min: Math.min(...grData) * 0.9,
                  max: Math.max(...grData) * 1.1,
                  title: {
                    display: true,
                    text: 'GR Value'
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillingCharts;