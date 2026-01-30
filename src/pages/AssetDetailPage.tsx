
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AssetDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, updateAsset, rentals } = useApp();
  
  const asset = assets.find(a => a.id === id);
  const assetRentals = rentals.filter(r => r.assetId === id);

  if (!asset) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold">Asset not found</h1>
        <Link to="/inventory" className="text-primary hover:underline mt-4 inline-block">Back to Inventory</Link>
      </div>
    );
  }

  const handleDeactivate = () => {
    if (confirm(`Are you sure you want to deactivate ${asset.name}?`)) {
      updateAsset(asset.id, { status: 'Deactivated' });
      navigate('/inventory');
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Sticky Action Bar */}
      <div className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#dbdfe6] dark:border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link to="/inventory" className="text-[#616f89] text-xs font-bold hover:text-primary transition-colors">Inventory</Link>
            <span className="material-symbols-outlined text-xs text-[#616f89]">chevron_right</span>
            <span className="text-[#111318] dark:text-white text-xs font-bold">{asset.id}</span>
          </nav>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
            asset.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
            asset.status === 'On Lease' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
            'bg-amber-50 text-amber-700 border border-amber-100'
          }`}>
            {asset.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/assets/add/${asset.id}`} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Asset
          </Link>
          <button onClick={handleDeactivate} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">block</span>
            Deactivate
          </button>
        </div>
      </div>

      <main className="p-8 max-w-[1200px] mx-auto w-full space-y-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Image Section */}
              <div className="relative shrink-0">
                <div 
                  className="bg-center bg-cover rounded-2xl h-56 w-56 lg:h-64 lg:w-64 shadow-xl border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-800" 
                  style={{backgroundImage: `url("${asset.img}")`}}
                ></div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-gray-800 text-center min-w-[100px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Health</p>
                  <p className={`text-2xl font-black ${asset.health > 80 ? 'text-emerald-500' : asset.health > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {asset.health}%
                  </p>
                </div>
              </div>

              {/* Title & Info Section */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 truncate">
                    {asset.name}
                  </h2>
                  <div className="flex items-center gap-2 text-lg text-[#616f89] font-medium">
                    <span>Global ID</span>
                    <span className="font-mono text-primary font-bold bg-primary/5 px-2 py-0.5 rounded leading-none">{asset.id}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 py-8 border-t border-gray-100 dark:border-gray-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Category</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">{asset.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Serial Number</p>
                    <p className="text-sm font-bold font-mono text-slate-800 dark:text-gray-200">{asset.serial}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Location</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">{asset.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custodian</p>
                    <p className="text-sm font-bold text-primary">{asset.custodian || 'System Reserve'}</p>
                  </div>
                  {asset.vin && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VIN Number</p>
                      <p className="text-sm font-bold font-mono text-slate-800 dark:text-gray-200">{asset.vin}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Rental & Lease History</h3>
            <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {assetRentals.length} Cycles Recorded
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Client Name</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Lease Window</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest text-right">Contract Value</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {assetRentals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-slate-200">history</span>
                        <p className="text-slate-400 text-sm italic">No historical lease agreements identified for this asset.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  assetRentals.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{r.renterName}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{r.renterEmail}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-xs font-bold text-slate-800 dark:text-gray-200">{r.startDate}</p>
                        <p className="text-[10px] text-slate-500">to {r.endDate}</p>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-right font-mono text-slate-900 dark:text-white">
                        {r.total.toLocaleString()} RWF
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100 dark:border-blue-900/50">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssetDetailPage;
