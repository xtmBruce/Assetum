import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rental } from '../types';

const RentalAgreementPage: React.FC = () => {
  const navigate = useNavigate();
  const { assets, addRental, updateAsset } = useApp();
  
  const [step, setStep] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState(assets.filter(a => a.status === 'Available')[0]?.id || '');
  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  const [renterPhone, setRenterPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [baseRate, setBaseRate] = useState(45000);
  const [paymentPlan, setPaymentPlan] = useState<'Full' | 'Partial'>('Full');
  const [paidNow, setPaidNow] = useState(0);

  const availableAssets = assets.filter(a => a.status === 'Available');
  const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) || 1;
  const adminFee = 5000;
  const subtotal = baseRate * days;
  const total = subtotal + adminFee;

  const handleFinalize = () => {
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset) return;

    const newRental: Rental = {
      id: `RA-${Math.floor(Math.random() * 9000) + 1000}`,
      renterName,
      renterEmail,
      renterPhone,
      assetId: selectedAssetId,
      assetName: asset.name,
      startDate,
      endDate,
      baseRate,
      adminFee,
      total,
      paid: paymentPlan === 'Full' ? total : paidNow,
      status: 'Active',
      paymentPlan
    };

    addRental(newRental);
    updateAsset(selectedAssetId, { status: 'On Lease', custodian: renterName });
    navigate('/rentals');
  };

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">New Rental Agreement</h1>
          <p className="text-[#616f89] dark:text-gray-400 mt-1 font-medium text-sm md:text-base">Step {step} of 2: {step === 1 ? 'Logistics & Client Data' : 'Valuation & Payment Strategy'}</p>
        </div>
        <button onClick={() => navigate('/rentals')} className="text-[#616f89] font-bold text-sm flex items-center gap-1 hover:text-[#111318] transition-colors">
          <span className="material-symbols-outlined">close</span> Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 ? (
            <div className="space-y-6 animate-in slide-in-from-left-2 duration-300">
              <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="px-6 py-4 border-b dark:border-gray-800 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">inventory_2</span> Asset Selection
                </h2>
                <div className="p-6">
                  <label className="text-sm font-semibold mb-2 block text-slate-700 dark:text-slate-300">Select Fleet Asset <span className="text-red-500">*</span></label>
                  <select 
                    value={selectedAssetId}
                    onChange={(e) => setSelectedAssetId(e.target.value)}
                    className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4 focus:ring-primary focus:border-primary"
                  >
                    {availableAssets.length === 0 && <option disabled>No assets currently Available</option>}
                    {availableAssets.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.id}) - {a.location}</option>
                    ))}
                  </select>
                  <p className="mt-2 text-[10px] text-slate-400 font-medium">Only assets currently marked as "Available" can be leased.</p>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="px-6 py-4 border-b dark:border-gray-800 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span> Renter Identity
                </h2>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name / Entity <span className="text-red-500">*</span></label>
                    <input value={renterName} onChange={e => setRenterName(e.target.value)} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4" placeholder="e.g. Constructo Inc." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address <span className="text-red-500">*</span></label>
                    <input value={renterEmail} onChange={e => setRenterEmail(e.target.value)} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4" type="email" placeholder="billing@constructo.io" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Phone <span className="text-red-500">*</span></label>
                    <input value={renterPhone} onChange={e => setRenterPhone(e.target.value)} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4" placeholder="+250 788 000 000" />
                  </div>
                </div>
              </section>

              <div className="flex justify-end pt-4">
                <button 
                  disabled={!renterName || !selectedAssetId} 
                  onClick={() => setStep(2)} 
                  className="px-10 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 shadow-lg hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50"
                >
                  Continue to Pricing <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
              <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="px-6 py-4 border-b dark:border-gray-800 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span> Schedule & Rate
                </h2>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expected Return Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Daily Rate (RWF)</label>
                    <input type="number" value={baseRate} onChange={e => setBaseRate(Number(e.target.value))} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 px-4 font-mono font-bold text-primary" />
                    <p className="text-[10px] text-slate-400">Total duration: {days} days.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="px-6 py-4 border-b dark:border-gray-800 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">payments</span> Payment Strategy
                </h2>
                <div className="p-6 space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={() => setPaymentPlan('Full')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all text-left group ${paymentPlan === 'Full' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-gray-800'}`}
                    >
                      <p className={`font-bold text-sm ${paymentPlan === 'Full' ? 'text-primary' : 'text-slate-700 dark:text-white'}`}>Pay Full Amount Now</p>
                      <p className="text-xs text-slate-500 mt-1">Settle 100% of the contractual value immediately at handover.</p>
                    </button>
                    <button 
                      onClick={() => setPaymentPlan('Partial')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all text-left group ${paymentPlan === 'Partial' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-gray-800'}`}
                    >
                      <p className={`font-bold text-sm ${paymentPlan === 'Partial' ? 'text-primary' : 'text-slate-700 dark:text-white'}`}>Partial Payment / Deposit</p>
                      <p className="text-xs text-slate-500 mt-1">Pay an initial deposit now and settle the balance upon asset return.</p>
                    </button>
                  </div>
                  {paymentPlan === 'Partial' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-widest text-[10px]">Initial Deposit Amount (RWF)</label>
                      <input type="number" value={paidNow} onChange={e => setPaidNow(Number(e.target.value))} className="w-full h-12 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-900 px-4 font-mono font-bold text-emerald-600" />
                      <p className="mt-2 text-[10px] text-rose-500 font-bold">Remaining balance of {(total - paidNow).toLocaleString()} RWF will be due at the return date.</p>
                    </div>
                  )}
                </div>
              </section>

              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-slate-500">Back to Identity</button>
                <button onClick={handleFinalize} className="px-10 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 shadow-lg hover:bg-primary-hover transition-all active:scale-95">
                  <span className="material-symbols-outlined">verified</span> Finalize & Lock Agreement
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm sticky top-24">
            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4 border-b dark:border-gray-800">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Agreement Ledger</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Base Lease ({days} Days)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{subtotal.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Processing & Admin</span>
                  <span className="font-bold text-slate-900 dark:text-white">{adminFee.toLocaleString()} RWF</span>
                </div>
                <div className="pt-4 border-t border-dashed dark:border-gray-800">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">Total Valuation</p>
                    <p className="text-3xl font-black text-primary font-mono">{total.toLocaleString()} RWF</p>
                  </div>
                </div>
                {paymentPlan === 'Partial' && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-xs font-bold text-emerald-600">
                      <span>Deposit Collection</span>
                      <span>{paidNow.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-rose-600">
                      <span>Outstanding Balance</span>
                      <span>{(total - paidNow).toLocaleString()} RWF</span>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">info</span>
                    <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 leading-relaxed uppercase">
                      Confirming this agreement will flag the asset as "On Lease" and block it from further rental selection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RentalAgreementPage;