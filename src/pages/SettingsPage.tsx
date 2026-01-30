import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const sections = [
    { title: 'General Preferences', description: 'Configure your individual profile and app display settings.', icon: 'person', path: '#' },
    { title: 'System Configuration', description: 'Global organization settings, tax rates, and default units.', icon: 'settings_suggest', path: '#' },
    { title: 'Team Management', description: 'Manage users, roles, and access permissions.', icon: 'group', path: '/settings/users' },
    { title: 'Security & Auth', description: 'Two-factor authentication and session management.', icon: 'security', path: '#' },
    { title: 'API & Integrations', description: 'Connect Assetum to third-party fleet tracking services.', icon: 'api', path: '#' },
    { title: 'Subscription & Billing', description: 'Manage your plan and view recent invoices.', icon: 'payments', path: '#' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#111318] dark:text-white">System Settings</h1>
        <p className="text-[#616f89] text-sm md:text-base">Central control for organization preferences and user management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <Link
            key={i}
            to={section.path}
            className="group p-6 bg-white dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800 rounded-xl shadow-sm hover:border-primary transition-all flex items-start gap-4"
          >
            <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[#616f89] group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
              <span className="material-symbols-outlined !text-2xl">{section.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white group-hover:text-primary transition-colors">{section.title}</h3>
              <p className="text-[#616f89] text-sm mt-1 leading-relaxed">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 md:p-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-[#f0f2f4] dark:border-gray-800">
         <h2 className="text-lg font-bold mb-4">Instance Information</h2>
         <div className="space-y-4">
            <div className="flex justify-between text-sm py-2 border-b border-gray-200 dark:border-gray-800">
               <span className="text-[#616f89]">Organization Name</span>
               <span className="font-bold">Logistics Pro Global</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-200 dark:border-gray-800">
               <span className="text-[#616f89]">Server Location</span>
               <span className="font-bold">Frankfurt (EU-Central-1)</span>
            </div>
            <div className="flex justify-between text-sm py-2">
               <span className="text-[#616f89]">Assetum Version</span>
               <span className="font-bold">v4.12.0-stable</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;