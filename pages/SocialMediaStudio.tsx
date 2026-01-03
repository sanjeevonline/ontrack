
import React, { useState } from 'react';
import { generateSocialContent } from '../services/geminiService';

const SocialMediaStudio: React.FC = () => {
  const [address, setAddress] = useState('888 Skyline Dr, Beverly Hills');
  const [price, setPrice] = useState('$2,450,000');
  const [features, setFeatures] = useState('Infinity pool, smart home tech, gourmet kitchen');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Excited');
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<{ caption: string; hashtags: string[] } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const content = await generateSocialContent({
      address, price, features, platform, tone
    });
    setGeneratedPost(content);
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a2b56]">Social Studio</h1>
        <p className="text-slate-500">Generate high-impact real estate content with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Side */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">🤖</div>
            <div>
              <h3 className="font-bold text-[#1a2b56]">AI Content Draftsman</h3>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Powered by Gemini</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Property Address</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Listing Price</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Content Tone</label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                >
                  <option>Excited</option>
                  <option>Professional</option>
                  <option>Informative</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Key Features</label>
              <textarea 
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Platform</label>
              <div className="flex gap-2">
                {['Instagram', 'Facebook', 'LinkedIn'].map(p => (
                  <button 
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      platform === p ? 'bg-[#1a2b56] text-white border-[#1a2b56]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-100 hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Generating...' : '✨ Generate AI Copy'}
          </button>
        </div>

        {/* Preview Side */}
        <div className="space-y-6">
          <div className="bg-[#1a2b56] rounded-[2rem] p-6 text-white min-h-[500px] flex flex-col items-center">
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-6">Mobile Preview: {platform}</p>
            
            <div className="w-[280px] bg-white rounded-[2rem] border-[6px] border-slate-800 h-[500px] overflow-hidden flex flex-col shadow-2xl">
              <div className="p-3 border-b border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">OR</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-900">Ontrack Realty</span>
                  <span className="text-[8px] text-slate-400">Sponsored</span>
                </div>
              </div>

              <div className="aspect-square bg-slate-100 flex items-center justify-center text-slate-300 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80" 
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-[8px] font-bold">FOR SALE</div>
              </div>

              <div className="flex-1 p-3 overflow-y-auto bg-white">
                <div className="flex gap-3 mb-2">
                  <span className="text-sm">❤️</span>
                  <span className="text-sm">💬</span>
                  <span className="text-sm">✈️</span>
                </div>
                {generatedPost ? (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
                      {generatedPost.caption}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {generatedPost.hashtags.map(tag => (
                        <span key={tag} className="text-[10px] text-blue-600 font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 opacity-30">
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                    <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-3 w-full max-w-[280px]">
              <button className="flex-1 bg-white/10 border border-white/20 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                Copy text
              </button>
              <button className="flex-1 bg-white text-[#1a2b56] py-2 rounded-xl text-xs font-bold shadow-lg shadow-white/5">
                Post Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaStudio;
