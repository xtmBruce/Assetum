import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Severity } from '../types';

const DamageDashboardPage: React.FC = () => {
  const { incidents } = useApp();
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [activeSeverity, setActiveSeverity] = useState<Severity | 'All'>('All');

  const filteredIncidents = useMemo(() => {
    return incidents.filter(i => {
      const matchesStatus = activeStatus === 'All' || i.status === activeStatus;
      const matchesSeverity = activeSeverity === 'All' || i.severity === activeSeverity;
      return matchesStatus && matchesSeverity;
    });
  }, [activeStatus, activeSeverity, incidents]);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Damage Assessment Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm md:text-base">Refined tracking for reported incidents and asset restoration workflow.</p>
        </div>
        <Link to="/incidents/new" className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          New Incident
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
            {['All', 'Needs Review', 'Approved', 'Fixed', 'Sent to Insurance'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveStatus(tab)}
                className={`px-3 md:px-4 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeStatus === tab ? 'bg-white dark:bg-gray-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >{tab}</button>
            ))}
          </div>
          <select 
            value={activeSeverity}
            onChange={(e) => setActiveSeverity(e.target.value as Severity | 'All')}
            className="px-4 py-2 text-xs font-bold bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-gray-300 cursor-pointer"
          >
            <option value="All">Severity: All</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Details</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Valuation</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {filteredIncidents.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">No incidents match the current filters.</td>
                </tr>
              ) : (
                filteredIncidents.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{i.assetName}</p>
                        <p className="text-[10px] font-mono text-slate-500">{i.id}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase ${i.severity === 'Critical' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
                        {i.severity}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm font-black text-slate-900 dark:text-white font-mono">
                      {i.totalCost.toLocaleString()} RWF
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className="text-[10px] font-black px-2 py-1 rounded uppercase bg-slate-100 dark:bg-gray-800">
                        {i.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <Link to={`/incidents/${i.id}/assess`} className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg hover:bg-rose-700 shadow-sm transition-all inline-block">Assess</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DamageDashboardPage;