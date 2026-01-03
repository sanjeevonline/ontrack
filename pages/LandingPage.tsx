
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          AI AGENT FOR ONTRACK REALTY
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-[#1a2b56] mb-6 leading-tight">
          Keep Your Realty <br/>
          <span className="text-red-600">On Track</span> With AI
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Automate 24/7 lead follow-ups, qualify prospects instantly, and 
          replace expensive virtual assistants with intelligent AI agents.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/dashboard" 
            className="bg-[#1a2b56] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#152345] transition-all shadow-xl shadow-slate-200"
          >
            Agent Dashboard
          </Link>
          <Link 
            to="/demo" 
            className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
          >
            Test AI Follow-up
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
            <div className="text-3xl mb-4 text-red-600">⚡</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2b56]">2.5 Min Response</h3>
            <p className="text-slate-500 text-sm">Leads are contacted almost instantly, 24/7. Never lose a lead to slow response times again.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
            <div className="text-3xl mb-4 text-red-600">❤️</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2b56]">Friendly Tone</h3>
            <p className="text-slate-500 text-sm">Our AI is trained to be warm and helpful. No annoying bots, just natural conversations.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
            <div className="text-3xl mb-4 text-red-600">💰</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2b56]">Massive ROI</h3>
            <p className="text-slate-500 text-sm">Save $900+ per month compared to VA costs while converting more leads into clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
