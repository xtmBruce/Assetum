import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-6 relative">
      <div className="w-full max-w-[420px] bg-white dark:bg-gray-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 overflow-hidden relative z-10">
        <div className="px-10 pt-12 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 rounded-2xl mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
          </div>
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight mb-2">Assetum</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Track. Inspect. Protect your assets.
          </p>
        </div>
        <form className="px-10 pb-12 flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input
              className="form-input block w-full px-4 py-3 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-all focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20"
              id="email"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="form-input block w-full px-4 py-3 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-all focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20"
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <div className="pt-1">
              <Link to="/reset-password" className="text-xs font-semibold text-primary hover:underline transition-all">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
              id="remember"
              type="checkbox"
            />
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 select-none cursor-pointer" htmlFor="remember">
              Remember this device
            </label>
          </div>
          <button
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
            type="submit"
          >
            <span>Sign In to Account</span>
          </button>
          <p className="text-gray-400 dark:text-gray-500 text-xs text-center mt-2">
            Need access? <a className="text-gray-600 dark:text-gray-300 font-semibold hover:underline" href="#">Contact Administrator</a>
          </p>
        </form>
      </div>
      
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-primary opacity-[0.02] blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginPage;