
import React, { useState, useRef, useEffect } from 'react';
import { analyzeLeadResponse } from '../services/geminiService';
import { AIAnalysis, Message } from '../types';

const DemoPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', message: "Hi! I saw you're interested in properties with Ontrack Realty. Are you looking to buy or sell?", timestamp: "System Generated" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const leadMsg: Message = {
      sender: 'lead',
      message: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, leadMsg]);
    setInput('');
    setIsLoading(true);

    const context = {
      zipCodes: ['90210'],
      budget: '$800k-$1M',
      propertyType: 'Buying',
      history: messages.map(m => `${m.sender}: ${m.message}`).join('\n')
    };

    try {
      const result = await analyzeLeadResponse(input, context);
      setAnalysis(result);
      
      setTimeout(() => {
        const aiMsg: Message = {
          sender: 'ai',
          message: result.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const resetDemo = () => {
    setMessages([{ sender: 'ai', message: "Hi! I saw you're interested in properties with Ontrack Realty. Are you looking to buy or sell?", timestamp: "System Generated" }]);
    setAnalysis(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-black text-[#1a2b56] mb-2">AI Conversation Simulator</h1>
        <p className="text-slate-500 text-sm md:text-base">Experience how Ontrack Realty AI handles new leads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200 border border-slate-200 overflow-hidden h-[500px] md:h-[600px] flex flex-col">
          <div className="bg-[#1a2b56] p-4 md:p-6 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base">OR</div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm md:text-base truncate">Ontrack AI Assistant</h3>
                <p className="text-[10px] md:text-xs text-red-300 font-medium">Powering 24/7 Follow-ups</p>
              </div>
            </div>
            <button 
              onClick={resetDemo}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              Reset
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'lead' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-sm ${
                  m.sender === 'lead' 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{m.message}</p>
                  <p className={`text-[10px] mt-2 opacity-60 ${m.sender === 'lead' ? 'text-white' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 md:p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 md:gap-4 shrink-0">
            <input 
              type="text"
              placeholder="Reply as lead..."
              className="flex-1 px-4 py-2 md:py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#1a2b56] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold hover:bg-[#152345] transition-all disabled:opacity-50 text-sm"
            >
              Send
            </button>
          </form>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-white p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Real-time Analysis</h3>
            {analysis ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-500 mb-1">Intent Category</p>
                  <p className="font-bold text-[#1a2b56]">{analysis.intent}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-1">Lead Quality</p>
                  <div className="flex gap-1 text-lg">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= analysis.qualityScore ? 'text-red-500' : 'text-slate-200'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1 font-bold">Priority</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      analysis.urgency === 'high' ? 'bg-red-100 text-red-700' : 
                      analysis.urgency === 'medium' ? 'bg-amber-100 text-amber-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {analysis.urgency}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 mb-1 font-bold">Auto-Handover</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      analysis.escalate ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {analysis.escalate ? 'READY' : 'WAIT'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 opacity-40">
                <p className="text-xs">Send a message to view AI logic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
