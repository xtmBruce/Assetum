
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const UserAdminPage: React.FC = () => {
  const { users, updateUser, deleteUser } = useApp();
  const [activeTab, setActiveTab] = useState('All Users');
  const [search, setSearch] = useState('');

  const toggleStatus = (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    updateUser(id, { status: user.status === 'Active' ? 'Inactive' : 'Active' });
  };

  const handleDelete = (id: string) => {
    if (confirm("Confirm removal of system access for this member?")) {
      deleteUser(id);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'All Users') return true;
    if (activeTab === 'Admins') return user.role === 'Admin';
    if (activeTab === 'Inactive') return user.status === 'Inactive';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-8 animate-in fade-in duration-300">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">User Administration</h1>
          <p className="text-slate-500 max-w-lg mt-1 font-medium">System-wide access control, role provisioning, and account audits.</p>
        </div>
        <Link to="/settings/users/add" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined text-lg">person_add</span>
          Onboard Member
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
          {['All Users', 'Admins', 'Inactive'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-80 border-slate-200 dark:border-gray-800 rounded-xl pl-10 py-2.5 text-xs dark:bg-gray-900 focus:ring-primary shadow-sm transition-all" 
            placeholder="Search by name, email, or role..." 
            type="text" 
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-gray-800/30">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Member</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Role</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lifecycle Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center italic text-slate-400">No matching team members found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img alt={user.name} className="size-10 rounded-full border border-slate-200 shadow-sm" src={user.avatar} />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className={`w-10 h-5 rounded-full p-1 flex items-center shadow-inner transition-all duration-300 ${user.status === 'Active' ? 'bg-primary justify-end' : 'bg-slate-300 dark:bg-gray-700 justify-start'}`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                      </button>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-4">
                      <button onClick={() => confirm(`Reset password for ${user.email}?`) && alert('Recovery link dispatched.')} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Reset Pwd</button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                        <span className="material-symbols-outlined !text-xl">delete</span>
                      </button>
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

export default UserAdminPage;
