
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const IncidentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for display
  const incident = {
    id: id || 'CON-7782',
    assetName: 'Excavator 320 GC',
    assetId: 'CAT-320-X',
    severity: 'Critical',
    status: 'Needs Review',
    date: 'Oct 24, 2023',
    client: 'Constructo Inc.',
    description: 'Reported heavy hydraulic leakage and exterior shell damage after site operation in Musanze. Operator reported unusual vibration before shutdown.',
    estCost: 125000,
    adminFee: 2500,
    total: 127500,
  };

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-[#616f89]">
          <Link to="/incidents/dashboard" className="hover:text-primary">Incidents</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Report: {incident.id}</span>
        </div>
        <div className="flex gap-2">
           <button onClick={() => navigate(-1)} className="px-4 py-2 border dark:border-gray-800 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Back</button>
           <Link to={`/incidents/${id}/assess`} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-primary-hover transition-all">Start Assessment</Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="p-8 border-b dark:border-gray-800 bg-slate-50/30 dark:bg-gray-800/20">
          <div className="flex justify-between items-start">
            <div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border mb-3 inline-block ${incident.severity === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                {incident.severity} SEVERITY
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Incident Report Details</h1>
              <p className="text-slate-500 mt-1">Reference: <span className="font-mono font-bold text-slate-900 dark:text-white">{incident.id}</span></p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
              <span className="px-4 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 text-sm font-bold border border-rose-100 dark:border-rose-900/50">
                {incident.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Contextual Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">ASSET</p>
                  <p className="text-sm font-bold">{incident.assetName}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">CLIENT</p>
                  <p className="text-sm font-bold">{incident.client}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">DATE REPORTED</p>
                  <p className="text-sm font-bold">{incident.date}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">ASSET ID</p>
                  <p className="text-sm font-bold font-mono">{incident.assetId}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Initial Narrative</h3>
              <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-xl text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                {incident.description}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Preliminary Costing</h3>
               <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl overflow-hidden shadow-inner">
                 <div className="p-4 space-y-3">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Estimated Repairs</span>
                     <span className="font-bold">{incident.estCost.toLocaleString()} RWF</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Administrative Handling</span>
                     <span className="font-bold">{incident.adminFee.toLocaleString()} RWF</span>
                   </div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-gray-800 border-t dark:border-gray-700">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black uppercase text-slate-400">Total Projection</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{incident.total.toLocaleString()} RWF</span>
                    </div>
                 </div>
               </div>
            </section>

            <section>
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Evidence Gallery</h3>
               <div className="grid grid-cols-2 gap-3">
                 <div className="aspect-video bg-slate-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-4xl">image</span>
                 </div>
                 <div className="aspect-video bg-slate-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-4xl">image</span>
                 </div>
               </div>
            </section>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-gray-800/50 flex justify-center gap-4 border-t dark:border-gray-800">
           <button className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg text-sm font-bold text-slate-600 hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">file_download</span> Export Case Details
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">
             <span className="material-symbols-outlined text-lg">policy</span> Flag for Audit
           </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPage;
