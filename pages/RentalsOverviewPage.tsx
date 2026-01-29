
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RentalsOverviewPage: React.FC = () => {
  const { rentals } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const now = new Date();

  const processedRentals = useMemo(() => {
    return rentals.map(rental => {
      const isPastEnd = new Date(rental.endDate) < now;
      let computedStatus = rental.status;
      if (rental.status === 'Active' && isPastEnd) {
        computedStatus = 'Overdue';
      }
      return { ...rental, displayStatus: computedStatus };
    });
  }, [rentals, now]);

  const metrics = useMemo(() => {
    const activeAndOverdue = processedRentals.filter(r => r.displayStatus === 'Active' || r.displayStatus === 'Overdue');
    const overdue = processedRentals.filter(r => r.displayStatus === 'Overdue');
    const completed = processedRentals.filter(r => r.displayStatus === 'Completed');
    
    const activeExposure = activeAndOverdue.reduce((sum, r) => sum + r.total, 0);
    const realizedRevenue = completed.reduce((sum, r) => sum + r.paid, 0);

    return {
      activeCount: activeAndOverdue.length,
      overdueCount: overdue.length,
      activeExposure,
      realizedRevenue
    };
  }, [processedRentals]);

  const filteredRentals = useMemo(() => {
    return processedRentals.filter((rental) => {
      const matchesSearch = 
        rental.renterName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        rental.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || rental.displayStatus === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, processedRentals]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Fleet Rentals & Leases</h1>
          <p className="text-slate-500 mt-1 font-medium">Lifecycle management for active agreements and pending asset returns.</p>
        </div>
        <Link 
          to="/rentals/new" 
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add_task</span>
          Initiate Agreement
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Active Pipeline</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{metrics.activeCount} <span className="text-sm font-medium text-slate-400">Agreements</span></h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Operational</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Live Exposure</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{metrics.activeExposure.toLocaleString()} <span className="text-sm font-medium text-slate-400">RWF</span></h3>
            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">Unrealized</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-1">Realized Revenue</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-emerald-600">{metrics.realizedRevenue.toLocaleString()} <span className="text-sm font-medium text-slate-400">RWF</span></h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm border-l-4 border-l-rose-500">
          <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-1">Attention Required</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-rose-600">{metrics.overdueCount} <span className="text-sm font-medium text-slate-400">Overdue</span></h3>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Past Return</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/20 dark:bg-gray-800/20">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-gray-800 rounded-lg">
            {['All', 'Active', 'Overdue', 'Completed', 'Terminated'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Filter rentals by client, asset, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-xs w-80 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lease Ref</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client & Asset</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Contract Value</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settled</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <span className="material-symbols-outlined text-4xl text-slate-200">folder_open</span>
                       <p className="text-slate-400 italic font-medium">No matching rental agreements found in this view.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRentals.map((rental) => {
                  return (
                    <tr key={rental.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono font-bold text-primary">{rental.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{rental.renterName}</p>
                        <p className="text-[10px] text-slate-500 font-medium truncate max-w-[200px]">Asset: {rental.assetName}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-right font-mono">{rental.total.toLocaleString()} RWF</td>
                      <td className="px-6 py-4 text-sm font-black text-right font-mono text-emerald-600">
                         {rental.paid.toLocaleString()} RWF
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          rental.displayStatus === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                          rental.displayStatus === 'Overdue' ? 'bg-rose-100 text-rose-700' :
                          rental.displayStatus === 'Completed' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {rental.displayStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/rentals/${rental.id}`} className="text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 transition-all">Manage Hub</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalsOverviewPage;
