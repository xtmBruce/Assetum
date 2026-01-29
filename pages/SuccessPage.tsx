
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const { title, message, returnPath } = location.state || { 
    title: 'Action Successful', 
    message: 'The operation has been completed successfully.', 
    returnPath: '/dashboard' 
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="max-w-[560px] w-full bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-800 text-center animate-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center size-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined !text-6xl" style={{fontVariationSettings: "'wght' 600"}}>check_circle</span>
          </div>
        </div>
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-black leading-tight pb-3 pt-2">{title}</h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg font-medium leading-relaxed pb-8 px-4">
          {message}
        </p>
        <div className="flex justify-center w-full">
          <Link to={returnPath} className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
            Return to Module
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
