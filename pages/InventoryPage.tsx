
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const InventoryPage: React.FC = () => {
  const { assets } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serial.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || asset.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, assets]);

  const tabs = ['All', 'Available', 'On Lease', 'Maintenance', 'Needs Review'];

  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Fleet Inventory</h2>
          <p className="text-[#616f89] text-base font-medium">Global fleet status, location, and maintenance tracking.</p>
        </div>
        <Link
          to="/assets/add"
          className="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold gap-2 shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Asset
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl mb-6 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                      : 'text-[#616f89] hover:text-[#111318]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89] !text-lg">search</span>
              <input 
                type="text" 
                placeholder="Search SN, ID, or Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-xs w-64 focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          <div className="text-[#616f89] text-xs font-bold uppercase tracking-widest">
            {filteredAssets.length} Assets Found
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fcfcfd] dark:bg-gray-800/50 border-b border-[#f0f2f4] dark:border-gray-800">
              <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Asset Name & ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-800">
            {filteredAssets.length === 0 ? (
              <tr>
                <td className="px-6 py-20 text-center italic text-[#616f89]" colSpan={5}>No records match current filters.</td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/assets/${asset.id}`} className="flex items-center gap-3 group">
                      <div className="size-10 rounded-lg bg-slate-100 bg-cover bg-center shrink-0 border dark:border-gray-700" style={{backgroundImage: `url("${asset.img}")`}}></div>
                      <div>
                        <p className="text-sm font-bold text-[#111318] dark:text-white group-hover:text-primary transition-colors">{asset.name}</p>
                        <p className="text-[10px] font-mono text-slate-500">{asset.id}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-[#616f89] uppercase">{asset.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      asset.status === 'Available' ? 'bg-green-100 text-green-700' : 
                      asset.status === 'On Lease' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-[#616f89]">{asset.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/assets/add/${asset.id}`} className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-xl">edit</span>
                      </Link>
                      <Link to={`/assets/${asset.id}`} className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-xl">visibility</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
