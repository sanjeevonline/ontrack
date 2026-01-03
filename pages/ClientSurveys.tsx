
import React from 'react';
import { DEMO_SURVEYS } from '../constants';

const ClientSurveys: React.FC = () => {
  const avgScore = DEMO_SURVEYS.reduce((acc, curr) => acc + curr.score, 0) / DEMO_SURVEYS.length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Client Feedback</h1>
          <p className="text-slate-500">Ontrack Realty automated post-closing satisfaction surveys.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Average NPS</p>
            <p className="text-2xl font-black text-slate-900">{avgScore.toFixed(1)}/5.0</p>
          </div>
          <div className="bg-red-600 px-6 py-4 rounded-2xl text-center text-white">
            <p className="text-xs font-bold text-red-100 uppercase mb-1">Completion Rate</p>
            <p className="text-2xl font-black">94%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">Recent Responses</h3>
          <button className="text-sm font-bold text-red-600 hover:underline">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Sentiment Feedback</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_SURVEYS.map(survey => (
                <tr key={survey.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">{survey.client}</p>
                    <p className="text-xs text-slate-500">Agent: {survey.agent}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className={`text-sm ${s <= survey.score ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-600 max-w-md italic leading-relaxed">
                      "{survey.feedback}"
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Positive Sentiment
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-xs font-medium text-slate-400">{survey.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#1a2b56] rounded-3xl p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-black mb-4">AI Sentiment Analysis</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            Our AI monitors survey responses for dissatisfaction. 
            Negative feedback triggers an immediate alert for the managing broker to ensure every client stays "On Track".
          </p>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-red-400">0</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">Critical Issues</p>
            </div>
            <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-blue-400">12</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">New Referrals</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Preview: Auto-Generated Survey SMS</p>
          <div className="bg-[#152345] p-4 rounded-xl border border-white/10 relative">
            <p className="text-sm text-slate-300 leading-relaxed">
              "Hi Sarah! It's Ontrack Realty AI. Congrats on your new home! 🏡 
              On a scale of 1-10, how was your experience with Tom? 
              Your feedback keeps us on track!"
            </p>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">OR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSurveys;
