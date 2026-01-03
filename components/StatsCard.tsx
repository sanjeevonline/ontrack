
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, subtext, icon, trend, trendValue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl">
          {icon}
        </div>
        {trend && (
          <div className={`text-sm font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{label}</h3>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {subtext && <p className="text-slate-400 text-xs mt-2">{subtext}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
