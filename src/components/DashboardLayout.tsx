import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const DashboardLayout: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Assets', icon: 'package_2', path: '/inventory' },
    { label: 'Rentals', icon: 'key', path: '/rentals' },
    { label: 'Incidents', icon: 'report_problem', path: '/incidents/dashboard' },
    { label: 'Users', icon: 'group', path: '/settings/users' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-64 border-r border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-background-dark flex flex-col h-screen transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-8">
            <Link to="/dashboard" className="flex gap-3 items-center">
              <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#111318] dark:text-white text-base font-bold">Assetum</h1>
                <p className="text-[#616f89] text-xs">Professional Tracking</p>
              </div>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-8 py-4 bg-white dark:bg-background-dark z-30">
          {/* Mobile menu button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-lg font-bold truncate hidden sm:block">Operational Portal</h2>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111318] dark:text-white relative hover:bg-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 size-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 text-[8px] flex items-center justify-center font-bold text-white">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
                    <h3 className="font-bold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? <p className="p-10 text-center text-xs text-slate-400">No notifications</p> : notifications.map((n) => (
                      <Link 
                        key={n.id} 
                        to={n.link} 
                        onClick={() => { setShowNotifications(false); markNotificationRead(n.id); }}
                        className={`p-4 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex gap-3 ${!n.read ? 'bg-primary/5' : ''}`}
                      >
                        <span className={`material-symbols-outlined !text-xl ${n.urgent ? 'text-red-500' : 'text-primary'}`}>
                          {n.category === 'Incident' ? 'report_problem' : 'info'}
                        </span>
                        <div>
                          <p className="text-xs font-bold">{n.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{n.message}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-gray-50 dark:bg-gray-800/50">
                    <Link to="/notifications" onClick={() => setShowNotifications(false)} className="text-xs font-bold text-[#616f89] hover:text-primary">View All Activity</Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Alex Rivera</p>
                <p className="text-xs text-[#616f89]">Fleet Manager</p>
              </div>
              <div className="size-10 rounded-full bg-cover bg-center border border-[#f0f2f4]" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKTZJPW5kW3JOF8RFacoW2l3QWHOV6FFMabXS-HGaVBAdmjNzq83ebsvWpe_qzGctNL6K04T_hTR6RFLHHHs7eF5zKZd5ItFnlkdy1vIVwxRopA7oAY4soQgmxq0_O_Q6UeT17mmoVkvBhgdx7eDAAur4lIlH0lR5RjD46q0j-PHkvCRGuv39-XpcpVbeUjYypwzfD1373JIhVFqC9CxkEySpSnx3AjIQtzv-cajd1nOpMMavqw1-WvdMkQhDLghsAFVfWhP4TfzZu")'}}></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;