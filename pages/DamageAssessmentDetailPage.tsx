
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Incident } from '../types';

const DamageAssessmentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, updateIncident, updateAsset } = useApp();
  
  const incident = incidents.find(i => i.id === id);

  const [repairs, setRepairs] = useState(incident?.partsCost || 0);
  const [labor, setLabor] = useState(incident?.laborCost || 0);
  const [adminFee, setAdminFee] = useState(incident?.adminFee || 5000);
  const [findings, setFindings] = useState(incident?.findings || '');

  useEffect(() => {
    if (incident) {
      setRepairs(incident.partsCost || Math.floor(incident.initialEstimate * 0.6));
      setLabor(incident.laborCost || Math.floor(incident.initialEstimate * 0.4));
      setFindings(incident.findings || '');
    }
  }, [incident]);

  if (!incident) {
    return <div className="p-20 text-center"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Incident record not found</h1><Link to="/incidents/dashboard" className="text-primary hover:underline">Back to Dashboard</Link></div>;
  }

  const total = repairs + labor + adminFee;
  const THRESHOLD = 250000;
  const requiresHighLevelApproval = total > THRESHOLD;

  const handleApprove = () => {
    updateIncident(incident.id, { 
      status: requiresHighLevelApproval ? 'Pending Approval' : 'Approved',
      partsCost: repairs,
      laborCost: labor,
      adminFee,
      totalCost: total,
      findings
    });
    
    if (!requiresHighLevelApproval) {
      updateAsset(incident.assetId, { status: 'Maintenance' });
    }

    navigate('/assets/success', { 
      state: { 
        title: requiresHighLevelApproval ? 'Approval Escalated' : 'Assessment Finalized', 
        message: requiresHighLevelApproval 
          ? 'Case valuation exceeds limit. Notification sent to Financial Controller for secondary authorization.' 
          : 'Forensic assessment complete. Restoration work is now authorized.',
        returnPath: '/incidents/dashboard'
      } 
    });
  };

  const handleInsurance = () => {
    updateIncident(incident.id, { status: 'Sent to Insurance' });
    navigate('/assets/success', { 
      state: { 
        title: 'Insurance Claim Initialized', 
        message: 'The case file and evidence gallery have been packaged for carrier review.',
        returnPath: '/incidents/dashboard'
      } 
    });
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-[#616f89]">
          <Link to="/incidents/dashboard" className="hover:text-primary transition-colors font-bold">Damage Dashboard</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Forensic Assessment: {incident.id}</span>
        </div>
        <div className="flex gap-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border dark:border-gray-800`}>
            Status: {incident.status}
          </span>
          <button onClick={() => navigate(-1)} className="text-[#616f89] font-bold text-sm flex items-center gap-1 hover:text-[#111318] transition-colors">
            <span className="material-symbols-outlined">close</span> Exit Hub
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex gap-10 mb-12">
              <div className="size-40 bg-slate-100 dark:bg-gray-800 rounded-2xl shrink-0 shadow-inner flex items-center justify-center border-2 border-white dark:border-gray-700">
                <span className="material-symbols-outlined text-slate-300 text-6xl">search_insights</span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Forensic Technical Review</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Impacted Asset</p>
                    <p className="text-sm font-black text-primary uppercase">{incident.assetName}</p>
                    <p className="text-[9px] font-mono text-slate-500 mt-0.5">{incident.assetId}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Declared Severity</p>
                    <p className={`text-sm font-black uppercase ${incident.severity === 'Critical' ? 'text-rose-600' : 'text-blue-600'}`}>{incident.severity}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">By {incident.client}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed dark:border-gray-700">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined !text-lg">description</span> Initial Case Narrative
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">"{incident.description}"</p>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 uppercase tracking-tight">
                  <span className="size-6 rounded-lg bg-primary text-white flex items-center justify-center text-xs">01</span>
                  Forensic Findings Log
                </h3>
                <textarea 
                  value={findings}
                  onChange={e => setFindings(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 dark:bg-gray-800 dark:border-gray-700 min-h-[180px] text-sm p-6 focus:ring-primary shadow-inner font-medium leading-relaxed" 
                  placeholder="Document specific component failures, internal structural issues, and restoration requirements discovered during inspection..."
                ></textarea>
              </div>
              
              {incident.images.length > 0 && (
                <div>
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Evidence Gallery</h3>
                   <div className="grid grid-cols-4 gap-4">
                      {incident.images.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-xl bg-cover bg-center border shadow-sm" style={{backgroundImage: `url("${img}")`}}></div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm sticky top-24">
            <div className="p-8 border-b dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/30">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Restoration Valuation</h3>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Spare Parts Cost (RWF)</label>
                  <input type="number" value={repairs} onChange={(e) => setRepairs(Number(e.target.value))} className="w-full h-12 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-xl font-black font-mono px-4 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Labor & Technical Work (RWF)</label>
                  <input type="number" value={labor} onChange={(e) => setLabor(Number(e.target.value))} className="w-full h-12 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-xl font-black font-mono px-4 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Administrative Handling (RWF)</label>
                  <input type="number" value={adminFee} onChange={(e) => setAdminFee(Number(e.target.value))} className="w-full h-12 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-xl font-black font-mono px-4 text-primary" />
                </div>
              </div>
              
              <div className="pt-8 border-t dark:border-gray-800">
                <div className={`p-5 rounded-2xl border-2 ${requiresHighLevelApproval ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30' : 'bg-primary/5 border-primary/20'}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${requiresHighLevelApproval ? 'text-amber-700 dark:text-amber-400' : 'text-primary'}`}>Total Authorized Restoration</p>
                  <p className={`text-3xl font-black font-mono tracking-tighter ${requiresHighLevelApproval ? 'text-amber-800 dark:text-amber-300' : 'text-primary'}`}>{total.toLocaleString()} RWF</p>
                </div>
                
                {requiresHighLevelApproval && (
                  <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex gap-3 border border-rose-100 dark:border-rose-900/30">
                    <span className="material-symbols-outlined text-rose-600 text-xl shrink-0">security_update_warning</span>
                    <p className="text-[10px] text-rose-700 dark:text-rose-400 font-black leading-tight uppercase tracking-wider">
                      Approval Escalation Required: Final valuation exceeds 250,000 RWF benchmark.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button onClick={handleApprove} className="w-full py-5 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined !text-xl">{requiresHighLevelApproval ? 'forward_to_inbox' : 'verified_user'}</span>
                  {requiresHighLevelApproval ? 'Escalate Valuation' : 'Commit & Authorize'}
                </button>
                <button onClick={handleInsurance} className="w-full py-4 bg-white dark:bg-gray-900 border-2 border-slate-100 dark:border-gray-700 text-slate-500 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                  Init Insurance Claim
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DamageAssessmentDetailPage;
