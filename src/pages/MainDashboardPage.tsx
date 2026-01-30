import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MainDashboardPage: React.FC = () => {
  const { assets, rentals, incidents } = useApp();

  const stats = useMemo(() => {
    const activeRentals = rentals.filter(r => r.status === 'Active' || r.status === 'Overdue').length;
    const overdueRentals = rentals.filter(r => r.status === 'Overdue').length;
    const openIncidents = incidents.filter(i => i.status !== 'Approved' && i.status !== 'Fixed').length;
    
    return [
      { label: 'Total Assets', value: assets.length.toLocaleString(), change: `In ${Array.from(new Set(assets.map(a => a.location))).length} Locations`, icon: 'package_2', color: 'text-blue-600', bg: 'bg-blue-50', path: '/inventory' },
      { label: 'Active Rentals', value: activeRentals.toString(), change: `${Math.round((activeRentals / (assets.length || 1)) * 100)}% Utilization`, icon: 'key', color: 'text-green-600', bg: 'bg-green-50', path: '/rentals' },
      { label: 'Pending Returns', value: overdueRentals.toString(), change: overdueRentals > 0 ? `${overdueRentals} past deadline` : 'All on track', icon: 'assignment_return', color: 'text-amber-600', bg: 'bg-amber-50', path: '/rentals' },
      { label: 'Open Incidents', value: openIncidents.toString(), change: `${incidents.filter(i => i.severity === 'Critical').length} critical case(s)`, icon: 'report_problem', color: 'text-red-600', bg: 'bg-red-50', path: '/incidents/dashboard' },
    ];
  }, [assets, rentals, incidents]);

  const distribution = useMemo(() => {
    const types = ['Vehicle', 'Property', 'Equipment', 'Tools'];
    const counts = types.map(t => ({
      label: t,
      count: assets.filter(a => a.type === t).length,
      percentage: (assets.filter(a => a.type === t).length / (assets.length || 1)) * 100
    }));
    return counts;
  }, [assets]);

  const recentActivities = [
    { type: 'rental', user: 'Marcus Wright', target: 'Excavator CAT 320D', time: '12 mins ago', icon: 'add_task', status: 'Active' },
    { type: 'incident', user: 'Kyle Reese', target: 'Volvo FH16 (V-10294)', time: '1 hour ago', icon: 'error', status: 'Reviewing' },
    { type: 'return', user: 'Sarah Connor', target: 'Toyota Forklift 5t', time: '3 hours ago', icon: 'task_alt', status: 'Completed' },
    { type: 'sync', user: 'System', target: 'Database Refresh', time: '5 hours ago', icon: 'sync', status: 'Success' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#111318] dark:text-white">Operational Dashboard</h1>
          <p className="text-[#616f89] text-sm md:text-base">Overview of your enterprise rental fleet and active operations.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 md:px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined !text-lg">download</span>
              <span className="hidden sm:inline">Export Operations Report</span>
              <span className="sm:hidden">Export</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.path} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#f0f2f4] dark:border-gray-800 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className={`size-12 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined !text-3xl">{stat.icon}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#616f89]">Real-time</span>
            </div>
            <p className="text-3xl font-black text-[#111318] dark:text-white">{stat.value}</p>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-sm font-semibold text-[#616f89]">{stat.label}</h3>
              <p className="text-xs font-medium text-emerald-600">{stat.change}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#f0f2f4] dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-bold">Fleet Distribution</h2>
              <Link to="/inventory" className="text-xs font-bold text-primary hover:underline">Full Inventory</Link>
            </div>
            <div className="p-10 flex items-center justify-center min-h-[300px]">
              {assets.length > 0 ? (
                <div className="flex items-end gap-6 h-[200px] w-full max-w-md">
                  {distribution.map((dist, idx) => (
                    <div key={idx} className="flex-1 bg-primary/10 rounded-t-lg relative group transition-all hover:bg-primary/20 cursor-help" style={{ height: '100%' }} title={`${dist.label}: ${dist.count} Units`}>
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg origin-bottom transition-all duration-700" 
                        style={{ height: `${dist.percentage}%` }}
                      ></div>
                      <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-[#616f89] truncate">{dist.label}</p>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] px-2 py-1 rounded transition-opacity whitespace-nowrap mb-1">
                        {dist.count} Assets
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-slate-200 text-6xl mb-4">bar_chart_4_bars</span>
                  <p className="text-slate-400 font-medium italic">Fleet is empty. Register assets to visualize distribution.</p>
                </div>
              )}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/inventory" className="group p-6 bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl shadow-sm hover:-translate-y-1 transition-all">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined !text-3xl">inventory</span>
              </div>
              <h3 className="text-xl font-bold mb-1 text-[#111318] dark:text-white">Fleet Inventory</h3>
              <p className="text-[#616f89] text-sm">Review asset condition, location, and maintenance status logs.</p>
            </Link>
            <Link to="/rentals" className="group p-6 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
              <div className="size-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined !text-3xl">key</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Rental Center</h3>
              <p className="text-white/70 text-sm">Manage lease agreements, active rentals, and pending returns center.</p>
            </Link>
          </div>
        </div>

        <aside className="bg-white dark:bg-gray-900 rounded-xl border border-[#f0f2f4] dark:border-gray-800 shadow-sm h-fit">
          <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Live Feed</button>
          </div>
          <div className="divide-y divide-[#f0f2f4] dark:divide-gray-800">
            {recentActivities.map((act, i) => (
              <div key={i} className="p-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer">
                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${act.type === 'incident' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  <span className="material-symbols-outlined !text-xl group-hover:scale-110 transition-transform">{act.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-[#111318] dark:text-white truncate">
                      {act.user} <span className="font-normal text-[#616f89]">updated</span> {act.target}
                    </p>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded ml-2 shrink-0">{act.status}</span>
                  </div>
                  <p className="text-[10px] text-[#616f89] mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/notifications" className="w-full py-4 text-xs font-bold text-[#616f89] hover:text-primary transition-colors flex items-center justify-center gap-2 border-t dark:border-gray-800">
            View All Operational Activity
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default MainDashboardPage;