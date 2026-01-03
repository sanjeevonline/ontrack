
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/', icon: '🏠' },
    { label: 'Agent Inbox', path: '/dashboard', icon: '📥' },
    { label: 'AI Simulator', path: '/demo', icon: '🤖' },
    { label: 'Social Studio', path: '/social', icon: '📱' },
    { label: 'Closing Tracker', path: '/closings', icon: '📋' },
    { label: 'Commissions', path: '/commissions', icon: '💸' },
    { label: 'Client Feedback', path: '/surveys', icon: '⭐' },
    { label: 'CEO Analytics', path: '/admin', icon: '📊' },
  ];

  React.useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside className={`
        fixed left-0 top-0 bottom-0 w-64 bg-[#1a2b56] text-white z-50 transition-transform lg:translate-x-0 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10 px-2 shrink-0">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 flex items-center justify-center text-red-600 font-bold text-xl border-2 border-red-600 rounded">OR</div>
                 <h1 className="text-xl font-bold tracking-tight">
                    <span className="text-red-500">Ontrack</span>
                    <span className="text-white ml-1">Realty</span>
                 </h1>
               </div>
               <div className="h-0.5 w-full bg-red-600 rounded-full"></div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-red-700 text-white shadow-lg' : 'text-slate-300 hover:bg-[#25396d] hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-700/50 shrink-0">
            <div className="bg-[#25396d] rounded-xl p-4 border border-slate-600/30">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Billing Status</p>
              <div className="flex justify-between items-center text-sm">
                <span>AI Subscription</span>
                <span className="text-green-400 font-bold">Active</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Monthly Savings: $945
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
