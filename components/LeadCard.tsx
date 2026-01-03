
import React from 'react';
import { Lead, LeadStatus } from '../types';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.HOT: return 'bg-red-50 text-red-700 border-red-100';
      case LeadStatus.WARM: return 'bg-amber-50 text-amber-700 border-amber-100';
      case LeadStatus.COLD: return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusEmoji = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.HOT: return '🔥';
      case LeadStatus.WARM: return '☀️';
      case LeadStatus.COLD: return '❄️';
      default: return '✨';
    }
  };

  return (
    <div 
      onClick={() => onClick(lead)}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</h3>
          <p className="text-sm text-slate-500">{lead.phone}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 uppercase tracking-wider ${getStatusColor(lead.status)}`}>
          {getStatusEmoji(lead.status)} {lead.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Interest</p>
          <p className="text-xs font-semibold text-slate-700">{lead.zipCodes.join(', ')} • {lead.propertyType}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Budget</p>
          <p className="text-xs font-semibold text-slate-700">{lead.budget}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 mb-4">
        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">AI Summary</p>
        <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
          "{lead.aiSummary}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-[10px] text-slate-400">Last contact: {lead.lastContact}</span>
        <div className="flex gap-2">
          {lead.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
