import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f2f4] dark:border-[#2d3748] px-10 py-3 bg-white dark:bg-background-dark">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] font-display">Assetum</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Professional Asset Recovery</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2130] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2d3748] overflow-hidden">
          <div className="pt-10 pb-2 text-center">
            <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
            </div>
            <h1 className="text-[#111318] dark:text-white tracking-tight text-[28px] font-bold leading-tight px-6 font-display">
              Reset your password
            </h1>
          </div>
          <div className="px-8 pb-6">
            <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-relaxed text-center font-display">
              Enter the email address associated with your account and we'll send you a secure link to reset your password.
            </p>
          </div>
          <form className="px-8 pb-10 space-y-6">
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full">
                <p className="text-[#111318] dark:text-gray-200 text-sm font-semibold leading-normal pb-2 font-display">Email Address</p>
                <div className="relative">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-[#3d475c] bg-white dark:bg-[#0f172a] focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder:text-gray-500 p-[15px] pl-11 text-base font-normal leading-normal transition-all"
                    placeholder="name@company.com"
                    required
                    type="email"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                </div>
              </label>
            </div>
            <div className="flex pt-2">
              <button className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md shadow-primary/20 font-display" type="submit">
                <span className="truncate">Send reset link</span>
              </button>
            </div>
            <div className="flex items-center justify-center pt-2">
              <Link to="/login" className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-semibold transition-colors font-display group">
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Back to login
              </Link>
            </div>
          </form>
          <div className="bg-background-light dark:bg-[#242c3d] px-8 py-4 border-t border-[#e5e7eb] dark:border-[#2d3748]">
            <p className="text-xs text-[#616f89] dark:text-gray-400 text-center flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-xs">verified_user</span>
              Secure, encrypted session by Assetum Security
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center mt-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-display">
          © 2024 Assetum Inc. All rights reserved. <a className="underline ml-2" href="#">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default ResetPasswordPage;