
import React, { useState } from 'react';
import { DEMO_LEADS } from '../constants';
import LeadCard from '../components/LeadCard';
import { Lead, LeadStatus } from '../types';

const AgentDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<LeadStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = DEMO_LEADS.filter(lead => {
    const matchesFilter = activeFilter === 'all' || lead.status === activeFilter;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Lead Inbox</h1>
          <p className="text-slate-500 text-sm md:text-base">Welcome, Tom Rivera. You have 3 hot leads.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters with horizontal scroll on mobile */}
      <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 gap-3 md:gap-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        {[
          { id: 'all', label: 'All', icon: '📋', count: DEMO_LEADS.length },
          { id: 'hot', label: 'Hot', icon: '🔥', count: DEMO_LEADS.filter(l => l.status === LeadStatus.HOT).length },
          { id: 'warm', label: 'Warm', icon: '☀️', count: DEMO_LEADS.filter(l => l.status === LeadStatus.WARM).length },
          { id: 'cold', label: 'Cold', icon: '❄️', count: DEMO_LEADS.filter(l => l.status === LeadStatus.COLD).length },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`p-3 md:p-4 rounded-2xl border transition-all flex items-center justify-between min-w-[120px] md:min-w-0 ${
              activeFilter === filter.id 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-xl">{filter.icon}</span>
              <span className="font-bold text-sm md:text-base">{filter.label}</span>
            </div>
            <span className={`text-xs font-bold ${activeFilter === filter.id ? 'text-blue-100' : 'text-slate-400'}`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredLeads.map(lead => (
          <LeadCard key={lead.id} lead={lead} onClick={setSelectedLead} />
        ))}
      </div>

      {/* Detail Modal - Mobile Optimized */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white w-full max-w-4xl h-full max-h-[95vh] md:max-h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">👤</div>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">{selectedLead.name}</h2>
                  <p className="text-xs md:text-sm text-slate-500 truncate">{selectedLead.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="md:col-span-2 flex flex-col gap-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span>💬</span> Conversation History
                </h3>
                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 space-y-4 flex-1 overflow-y-auto min-h-[300px]">
                  {selectedLead.conversationHistory.map((chat, idx) => (
                    <div key={idx} className={`flex ${chat.sender === 'lead' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-3 md:p-4 shadow-sm ${
                        chat.sender === 'lead' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{chat.message}</p>
                        <p className={`text-[10px] mt-2 opacity-60 ${chat.sender === 'lead' ? 'text-white' : 'text-slate-400'}`}>
                          {chat.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type response..." 
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm">Send</button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Insights</h3>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-xs text-blue-900 leading-relaxed font-medium">
                      {selectedLead.aiSummary}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Zip Codes:</span>
                      <span className="font-bold">{selectedLead.zipCodes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Budget:</span>
                      <span className="font-bold">{selectedLead.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 md:flex md:flex-col gap-2">
                  <button className="bg-slate-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    📞 Call
                  </button>
                  <button className="border border-slate-200 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50">
                    📅 Meet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
