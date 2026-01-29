
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Severity, Incident } from '../types';

const IncidentReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { assets, addIncident, updateAsset } = useApp();
  
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id || '');
  const [severity, setSeverity] = useState<Severity>('Minor');
  const [description, setDescription] = useState('');
  const [initialEstimate, setInitialEstimate] = useState(150000);
  const [images, setImages] = useState<string[]>([]);

  const handleImageAdd = () => {
    const demoImgs = [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=600&h=600',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=600',
      'https://images.unsplash.com/photo-1590674899484-d3343b432475?auto=format&fit=crop&q=80&w=600&h=600'
    ];
    setImages([...images, demoImgs[images.length % demoImgs.length]]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset) {
      alert("Validation failed: Target asset is no longer available in the fleet registry.");
      return;
    }

    const newIncident: Incident = {
      id: `INC-${Math.floor(Math.random() * 90000) + 10000}`,
      assetId: selectedAssetId,
      assetName: asset.name,
      severity,
      status: 'Needs Review',
      dateReported: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      description,
      initialEstimate,
      partsCost: 0,
      laborCost: 0,
      adminFee: 2500,
      totalCost: initialEstimate + 2500,
      client: asset.custodian || 'Internal Fleet',
      images
    };

    addIncident(newIncident);
    updateAsset(selectedAssetId, { status: 'Needs Review' });
    navigate('/incidents/dashboard');
  };

  return (
    <div className="p-8 max-w-[1100px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Declare Damage Incident</h1>
        <p className="text-[#616f89] dark:text-gray-400 mt-1 font-medium">Document failure context and attach evidence to initialize the restoration lifecycle.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-600"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Asset Reference <span className="text-red-500">*</span></label>
                <select 
                  value={selectedAssetId}
                  onChange={e => setSelectedAssetId(e.target.value)}
                  className="w-full h-12 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4 focus:ring-primary focus:border-primary font-medium"
                >
                  {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.id})</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Severity Assessment</label>
                <div className="flex gap-1 bg-slate-50 dark:bg-gray-800 p-1.5 rounded-xl border dark:border-gray-700">
                  {(['Minor', 'Major', 'Critical'] as Severity[]).map((lvl) => (
                    <button 
                      key={lvl} 
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${severity === lvl ? 'bg-white dark:bg-gray-700 text-rose-600 shadow-sm border dark:border-gray-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >{lvl}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Incident Narrative & Symtoms <span className="text-red-500">*</span></label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full h-44 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 p-5 text-sm focus:ring-primary font-medium leading-relaxed"
                placeholder="Describe exactly what happened, technical symptoms discovered, and environmental context..."
              ></textarea>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Damage Evidence Gallery</label>
                <button type="button" onClick={handleImageAdd} className="text-xs font-bold text-primary flex items-center gap-1.5 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors border border-primary/20">
                  <span className="material-symbols-outlined text-lg">add_a_photo</span> Upload Capture
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-md ring-1 ring-slate-200 dark:ring-gray-800 animate-in zoom-in-95" style={{backgroundImage: `url("${img}")`}}></div>
                ))}
                {images.length < 4 && (
                  <button type="button" onClick={handleImageAdd} className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-800 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-4xl">add</span>
                    <span className="text-[10px] font-black uppercase mt-1">Add Image</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 p-8 shadow-sm sticky top-24">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#616f89] mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined !text-lg">payments</span> Preliminary Valuation
            </h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Initial Estimate (RWF)</label>
                <input 
                  type="number" 
                  value={initialEstimate} 
                  onChange={e => setInitialEstimate(Number(e.target.value))} 
                  className="w-full h-14 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 font-mono font-black px-5 focus:ring-primary text-xl text-rose-600"
                />
              </div>
              <div className="pt-8 border-t dark:border-gray-800">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-4">
                   <span>Admin/Handling</span>
                   <span className="font-mono">2,500 RWF</span>
                </div>
                <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Total Projected Liability</p>
                <p className="text-4xl font-black text-primary font-mono tracking-tighter">{(initialEstimate + 2500).toLocaleString()} RWF</p>
              </div>
              <button type="submit" className="w-full py-5 bg-rose-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all mt-4">
                Dispatch Formal Report
              </button>
              <Link to="/incidents/dashboard" className="w-full py-3 text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors block">Discard Changes</Link>
            </div>
          </div>
          
          <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-600">info</span>
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase">
                Important: Damage reports initialize a Forensic Assessment. Final authorization depends on technical findings.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default IncidentReportPage;
