
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import AgentDashboard from './pages/AgentDashboard';
import CEODashboard from './pages/CEODashboard';
import DemoPage from './pages/DemoPage';
import ClosingChecklist from './pages/ClosingChecklist';
import CommissionCalculator from './pages/CommissionCalculator';
import ClientSurveys from './pages/ClientSurveys';
import SocialMediaStudio from './pages/SocialMediaStudio';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-[#1a2b56] flex items-center justify-between px-4 sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-2">
            <div className="px-1 bg-white rounded text-[#1a2b56] font-bold text-sm">OR</div>
            <span className="text-white font-bold tracking-tight">Ontrack Realty AI</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64 w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<AgentDashboard />} />
            <Route path="/admin" element={<CEODashboard />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/closings" element={<ClosingChecklist />} />
            <Route path="/commissions" element={<CommissionCalculator />} />
            <Route path="/surveys" element={<ClientSurveys />} />
            <Route path="/social" element={<SocialMediaStudio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
