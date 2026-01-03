
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { DEMO_ANALYTICS } from '../constants';
import StatsCard from '../components/StatsCard';

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

const CEODashboard: React.FC = () => {
  const [leadVolSlider, setLeadVolSlider] = useState(150);
  
  const vaMonthlyCost = 1120;
  const aiMonthlyCost = Math.round(leadVolSlider * 1.5 + 50);
  const monthlySavings = vaMonthlyCost - aiMonthlyCost;

  const statusData = [
    { name: 'Hot', value: DEMO_ANALYTICS.hotLeads },
    { name: 'Warm', value: DEMO_ANALYTICS.warmLeads },
    { name: 'Cold', value: DEMO_ANALYTICS.coldLeads },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">CEO Analytics</h1>
        <p className="text-slate-500 text-sm">Automated efficiency and cost performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        <StatsCard 
          label="Total Leads" 
          value={DEMO_ANALYTICS.totalLeads} 
          trend="up" 
          trendValue="23%" 
          icon="👥"
        />
        <StatsCard 
          label="Avg Response" 
          value={DEMO_ANALYTICS.avgResponseTime} 
          subtext="VA: 45 min" 
          trend="up" 
          trendValue="Fast" 
          icon="⚡"
        />
        <StatsCard 
          label="Response Rate" 
          value={`${DEMO_ANALYTICS.responseRate}%`} 
          subtext={`VA: ${DEMO_ANALYTICS.vaResponseRate}%`} 
          trend="up" 
          trendValue="High" 
          icon="📈"
        />
        <StatsCard 
          label="Annual Savings" 
          value={`$${(DEMO_ANALYTICS.costSavings * 12).toLocaleString()}`} 
          subtext="Projected ROI" 
          trend="up" 
          trendValue="Max" 
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm">
          <div className="mb-6 md:mb-8">
            <h3 className="font-bold text-lg text-slate-900">Weekly Lead Volume</h3>
            <p className="text-xs md:text-sm text-slate-500">Last 7 days trend.</p>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMO_ANALYTICS.leadsThisWeek}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 mb-2">Quality Mix</h3>
          <p className="text-xs md:text-sm text-slate-500 mb-6 md:mb-8">Lead distribution.</p>
          <div className="h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {statusData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                  <span className="font-medium text-slate-600">{entry.name}</span>
                </div>
                <span className="font-bold text-slate-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white">
          <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
            📉 Cost Comparison
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400 font-medium">Estimated Monthly Leads</span>
                <span className="text-xl font-black text-blue-400">{leadVolSlider}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                value={leadVolSlider}
                onChange={(e) => setLeadVolSlider(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">VA Cost</p>
                <p className="text-lg font-bold italic">$1,120</p>
              </div>
              <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/30">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">AI Cost</p>
                <p className="text-lg font-bold text-blue-400">${aiMonthlyCost}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-400">Monthly Savings</span>
                <span className="text-2xl md:text-3xl font-black text-green-400">${monthlySavings}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            🛠️ Automation Hub
          </h3>
          <div className="space-y-3">
            {[
              { to: "/demo", icon: '💬', title: 'Follow-up', status: 'Active', color: 'bg-green-100 text-green-700' },
              { to: "/closings", icon: '📋', title: 'Checklists', status: 'Live', color: 'bg-blue-100 text-blue-700' },
              { to: "/commissions", icon: '💸', title: 'Commissions', status: 'Live', color: 'bg-blue-100 text-blue-700' },
              { to: "/surveys", icon: '⭐', title: 'Feedback', status: 'Live', color: 'bg-blue-100 text-blue-700' },
            ].map(item => (
              <Link key={item.title} to={item.to} className="p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${item.color}`}>
                  {item.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;
