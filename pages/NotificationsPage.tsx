
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (activeFilter === 'Unread') return !n.read;
      if (activeFilter === 'Urgent') return n.urgent;
      return true;
    });
  }, [notifications, activeFilter]);

  return (
    <div className="p-8 max-w-[1000px] mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Operational Activity Hub</h1>
        <p className="text-[#616f89] text-base font-medium">Real-time alerts, maintenance requirements, and lease triggers.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between items-center">
          <div className="flex gap-4">
             {['All', 'Unread', 'Urgent'].map(f => (
               <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'text-primary' : 'text-[#616f89] hover:text-primary'}`}
               >{f}</button>
             ))}
          </div>
          <button onClick={() => notifications.forEach(n => markNotificationRead(n.id))} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Mark all as read</button>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredNotifications.length === 0 ? (
            <div className="p-20 text-center text-slate-400 italic">No notifications found in this view.</div>
          ) : (
            filteredNotifications.map((n) => (
              <div key={n.id} className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex gap-4 ${n.urgent && !n.read ? 'border-l-4 border-l-red-500' : ''}`}>
                <div className={`size-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${n.urgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  <span className="material-symbols-outlined">
                    {n.category === 'Lease' ? 'key' : n.category === 'Incident' ? 'report_problem' : n.category === 'Maintenance' ? 'settings' : 'info'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-bold ${n.urgent ? 'text-red-700' : 'text-[#111318] dark:text-white'}`}>{n.title} {!n.read && <span className="ml-2 size-2 bg-primary rounded-full inline-block"></span>}</h3>
                    <span className="text-[10px] font-bold text-[#616f89] uppercase">{n.time}</span>
                  </div>
                  <p className="text-sm text-[#616f89] font-medium leading-relaxed">{n.message}</p>
                  <div className="mt-3 flex gap-4">
                     <Link 
                      to={n.link} 
                      onClick={() => markNotificationRead(n.id)}
                      className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                     >View Source Details</Link>
                     {!n.read && <button onClick={() => markNotificationRead(n.id)} className="text-[10px] font-black uppercase tracking-widest text-[#616f89] hover:underline">Dismiss</button>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
