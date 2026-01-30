
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RentalDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rentals, updateRental, updateAsset } = useApp();
  
  const rental = rentals.find(r => r.id === id);

  if (!rental) {
    return <div className="p-20 text-center"><h1 className="text-2xl font-bold">Agreement not found</h1><Link to="/rentals" className="text-primary hover:underline">Back to Overview</Link></div>;
  }

  const handleTerminate = () => {
    if (confirm(`Emergency Termination for lease ${rental.id}? This will immediately flag the asset as Available.`)) {
      updateRental(rental.id, { status: 'Terminated' });
      updateAsset(rental.assetId, { status: 'Available', custodian: undefined });
      navigate('/rentals');
    }
  };

  const handleMarkCompleted = () => {
    updateRental(rental.id, { status: 'Completed', paid: rental.total });
    updateAsset(rental.assetId, { status: 'Available', custodian: undefined });
    navigate('/rentals');
  };

  const balance = rental.total - rental.paid;

  return (
    <div className="p-8 max-w-[1200px] mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-[#616f89]">
          <Link to="/rentals" className="hover:text-primary transition-colors font-bold">Rentals Overview</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Lease: {rental.id}</span>
        </div>
        <button onClick={() => navigate('/rentals')} className="text-[#616f89] font-bold text-sm flex items-center gap-1 hover:text-[#111318] transition-colors">
          <span className="material-symbols-outlined">arrow_back</span> Back to Fleet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 p-10 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-black tracking-tighter mb-2 text-slate-900 dark:text-white">Management Hub: {rental.id}</h1>
                <p className="text-[#616f89] font-medium">Standard Lease Agreement for <span className="text-primary font-bold">{rental.renterName}</span></p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                rental.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                rental.status === 'Overdue' ? 'bg-rose-50 text-rose-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {rental.status} Lifecycle
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#616f89] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined !text-lg">person</span> Client Identity
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">CONTRACTUAL PARTY</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{rental.renterName}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">EMAIL</p>
                      <p className="text-xs font-bold truncate">{rental.renterEmail}</p>
                    </div>
                    <div className="flex-1 p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">PHONE</p>
                      <p className="text-xs font-bold">{rental.renterPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#616f89] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined !text-lg">construction</span> Asset Reference
                </h3>
                <Link to={`/assets/${rental.assetId}`} className="flex items-center gap-5 p-5 rounded-2xl border-2 dark:border-gray-800 hover:border-primary transition-all group bg-white dark:bg-gray-900 shadow-sm">
                  <div className="size-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined !text-3xl">precision_manufacturing</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{rental.assetName}</p>
                    <p className="text-[10px] text-[#616f89] font-mono mt-0.5">{rental.assetId}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">arrow_forward_ios</span>
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t dark:border-gray-800">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#616f89] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined !text-lg">event_available</span> Contractual Window
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-5 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center">
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1 uppercase tracking-wide">Handover Date</p>
                  <p className="text-lg font-black text-emerald-800 dark:text-emerald-200">{rental.startDate}</p>
                </div>
                <div className="p-5 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-center">
                  <p className="text-[10px] font-bold text-rose-700 dark:text-rose-400 mb-1 uppercase tracking-wide">Expected Return</p>
                  <p className="text-lg font-black text-rose-800 dark:text-rose-200">{rental.endDate}</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 text-center">
                  <p className="text-[10px] font-bold text-[#616f89] mb-1 uppercase tracking-wide">Duration</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    {Math.ceil((new Date(rental.endDate).getTime() - new Date(rental.startDate).getTime()) / 86400000)} Days
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 p-8 shadow-sm relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-[#616f89] mb-8">Financial Ledger</h3>
             <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-[#616f89] font-medium">Agreement Value</span>
                   <span className="font-black text-slate-900 dark:text-white font-mono">{rental.total.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-[#616f89] font-medium">Settled Amount</span>
                   <span className="font-black text-emerald-600 font-mono">{rental.paid.toLocaleString()} RWF</span>
                </div>
                <div className="pt-5 border-t dark:border-gray-800">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-rose-600">Balance Due</span>
                      <span className="text-xl font-black text-rose-600 font-mono">{balance.toLocaleString()} RWF</span>
                   </div>
                </div>
             </div>
             
             {rental.status === 'Active' || rental.status === 'Overdue' ? (
               <div className="space-y-3">
                 <button onClick={handleMarkCompleted} className="w-full py-4 bg-emerald-600 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
                   Finalize Return & Close
                 </button>
                 <button onClick={handleTerminate} className="w-full py-4 bg-white dark:bg-gray-900 border-2 border-rose-200 text-rose-600 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                   Force Terminate
                 </button>
               </div>
             ) : (
               <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700 text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lease is {rental.status}</p>
               </div>
             )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 p-6 shadow-sm">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Payment Schedule</h3>
             <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg">
                   <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                   <div>
                      <p className="text-xs font-bold">Initial Settlement</p>
                      <p className="text-[10px] text-emerald-700">{rental.paid.toLocaleString()} RWF</p>
                   </div>
                </div>
                {balance > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-lg">
                     <span className="material-symbols-outlined text-rose-600">schedule</span>
                     <div>
                        <p className="text-xs font-bold">Final Installment</p>
                        <p className="text-[10px] text-rose-700">Due at return</p>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RentalDetailPage;
