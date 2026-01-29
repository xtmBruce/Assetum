
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <nav className="flex items-center gap-2 mb-6">
        <Link to="/settings/users" className="text-[#616f89] text-sm font-medium hover:text-primary">Settings</Link>
        <span className="material-symbols-outlined text-[#616f89] text-sm">chevron_right</span>
        <span className="text-[#111318] text-sm font-semibold">Add Member</span>
      </nav>

      <div className="mb-10">
        <h2 className="text-[#111318] text-3xl font-bold tracking-tight">Add New Team Member</h2>
        <p className="text-[#616f89] mt-2">Onboard a new member to your team. They will receive an invitation email.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#f0f2f4] shadow-sm overflow-hidden">
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/settings/users'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#111318] text-sm font-semibold">Full Name</label>
              <input className="w-full px-4 py-3 rounded-lg border-[#dbdfe6] focus:ring-primary" placeholder="e.g. John Doe" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#111318] text-sm font-semibold">Work Email</label>
              <input className="w-full px-4 py-3 rounded-lg border-[#dbdfe6] focus:ring-primary" type="email" placeholder="john@company.com" required />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <label className="text-[#111318] text-sm font-semibold">Assign Role</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Staff', 'Inspector', 'Admin'].map((role) => (
                <label key={role} className="relative cursor-pointer group">
                  <input className="peer hidden" name="role" type="radio" value={role.toLowerCase()} defaultChecked={role === 'Staff'} />
                  <div className="p-4 rounded-xl border-2 border-[#f0f2f4] transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50">
                    <p className="font-bold text-sm">{role}</p>
                    <p className="text-xs text-gray-500 mt-1">{role === 'Admin' ? 'Full system access' : 'Standard access'}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <button onClick={() => navigate(-1)} type="button" className="px-6 py-2.5 font-bold text-gray-600 border border-gray-200 rounded-lg">Cancel</button>
            <button type="submit" className="flex items-center gap-2 px-8 py-2.5 font-bold text-white bg-primary rounded-lg shadow-md">
              <span className="material-symbols-outlined text-[20px]">person_add</span> Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
