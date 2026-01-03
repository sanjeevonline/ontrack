
import React, { useState } from 'react';
import { DEMO_CLOSINGS } from '../constants';
import { ClosingRecord } from '../types';

const ClosingChecklist: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<ClosingRecord>(DEMO_CLOSINGS[0]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Closings</h1>
          <p className="text-slate-500 text-sm">Automated task orchestration.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 flex items-center gap-2 max-w-sm">
          <span>🤖 AI:</span>
          <span className="truncate">Sarah's checklist is up-to-date.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Active Deals</h3>
          <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-3 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {DEMO_CLOSINGS.map(record => (
              <div 
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`p-4 rounded-xl border transition-all cursor-pointer min-w-[200px] lg:min-w-0 flex-shrink-0 ${
                  selectedRecord.id === record.id ? 'bg-white border-blue-500 shadow-md shadow-blue-50' : 'bg-white border-slate-200 hover:border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 text-xs truncate mr-2">{record.address.split(',')[0]}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                    record.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mb-2 truncate">{record.client}</p>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all"
                    style={{ width: `${(record.checklist.filter(t => t.completed).length / record.checklist.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">{selectedRecord.address}</h2>
            <p className="text-xs text-slate-500">Track tasks for {selectedRecord.client}</p>
          </div>

          <div className="p-4 md:p-6 flex-1 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Legal', 'Inspection', 'Financial', 'Closing'].map(cat => {
                const count = selectedRecord.checklist.filter(t => t.category === cat).length;
                const completed = selectedRecord.checklist.filter(t => t.category === cat && t.completed).length;
                return (
                  <div key={cat} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">{cat}</p>
                    <p className="text-sm font-black text-slate-900">{completed}/{count}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-xs text-slate-900 mb-2">Task List</h3>
              <div className="space-y-1">
                {selectedRecord.checklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                      item.completed ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
                    }`}>
                      {item.completed && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {item.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <p className="text-[10px] text-slate-400 order-2 sm:order-1">Auto-sync active.</p>
            <button className="w-full sm:w-auto bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs order-1 sm:order-2">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosingChecklist;
