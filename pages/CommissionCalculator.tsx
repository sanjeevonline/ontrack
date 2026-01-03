
import React, { useState } from 'react';

const CommissionCalculator: React.FC = () => {
  const [salePrice, setSalePrice] = useState(950000);
  const [commissionPct, setCommissionPct] = useState(5);
  const [splitPct, setSplitPct] = useState(70);
  const [referral, setReferral] = useState(0);

  const totalCommission = (salePrice * commissionPct) / 100;
  const officeSide = totalCommission / 2; // Assuming 50/50 buy/sell split
  const agentGross = (officeSide * splitPct) / 100;
  const agentNet = agentGross - referral;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Commission Tool</h1>
        <p className="text-slate-500">Instant payout calculations and statement drafting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <h3 className="font-bold text-slate-900">Calculator Settings</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Sale Price ($)</label>
              <input 
                type="number" 
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Comm. % (Total)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={commissionPct}
                  onChange={(e) => setCommissionPct(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent Split %</label>
                <input 
                  type="number" 
                  value={splitPct}
                  onChange={(e) => setSplitPct(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Referral Fees ($)</label>
              <input 
                type="number" 
                value={referral}
                onChange={(e) => setReferral(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex gap-4">
            <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold">
              Save Statement
            </button>
            <button className="flex-1 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50">
              Draft for Review
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col shadow-2xl shadow-blue-900/10">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-10">Estimated Payout Statement</h3>
          
          <div className="space-y-6 flex-1">
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Total Gross Commission</span>
              <span className="font-bold text-lg">${totalCommission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Brokerage Side (50%)</span>
              <span className="font-bold text-lg">${officeSide.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Agent Gross ({splitPct}%)</span>
              <span className="font-bold text-lg">${agentGross.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-4 text-red-400">
              <span className="text-red-400/70">Referral Fees</span>
              <span className="font-bold">-${referral.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-800">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase mb-2">Final Agent Net</p>
                <p className="text-5xl font-black text-white tracking-tight">${agentNet.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Effective Net</p>
                <p className="text-lg font-bold text-slate-300">{((agentNet/totalCommission)*100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculator;
