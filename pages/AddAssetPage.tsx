
import React, { useState, useMemo } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Asset, AssetType, AssetStatus } from '../types';

const AddAssetPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { assets, addAsset, updateAsset } = useApp();
  
  const existingAsset = id ? assets.find(a => a.id === id) : null;

  const [step, setStep] = useState(existingAsset ? 2 : 1);
  const [assetType, setAssetType] = useState<AssetType>(existingAsset?.type || 'Vehicle');
  const [formData, setFormData] = useState({
    name: existingAsset?.name || '',
    serial: existingAsset?.serial || '',
    location: existingAsset?.location || '',
    img: existingAsset?.img || '',
    vin: existingAsset?.vin || '',
    health: existingAsset?.health || 100,
    status: existingAsset?.status || 'Available'
  });

  const isSerialRequired = useMemo(() => {
    return assetType === 'Equipment' || assetType === 'Tools';
  }, [assetType]);

  const handleSelectType = (type: AssetType) => {
    setAssetType(type);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && existingAsset) {
      updateAsset(id, {
        ...formData,
        type: assetType
      } as Partial<Asset>);
    } else {
      const newId = `ASSET-${Math.floor(Math.random() * 90000) + 10000}`;
      addAsset({
        id: newId,
        ...formData,
        type: assetType,
        img: formData.img || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400&h=400'
      } as Asset);
    }
    navigate('/inventory');
  };

  const assetTypes = [
    { id: 'Vehicle', label: 'Car / Vehicle', icon: 'directions_car' },
    { id: 'Property', label: 'House / Property', icon: 'home_work' },
    { id: 'Equipment', label: 'Heavy Equipment', icon: 'construction' },
    { id: 'Tools', label: 'Tools', icon: 'handyman' },
  ];

  const statusHelpers = {
    'Available': 'Ready for new rental agreements.',
    'On Lease': 'Currently deployed with a client.',
    'Maintenance': 'Undergoing repair or inspection.',
    'Needs Review': 'Requires admin attention after an incident.'
  };

  return (
    <div className="max-w-[1000px] mx-auto py-8 px-8 animate-in fade-in duration-300">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
           <nav className="flex items-center gap-2 text-sm text-[#616f89]">
              <Link to="/inventory" className="hover:text-primary transition-colors font-semibold">Inventory</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-bold text-[#111318] dark:text-white">{id ? 'Edit Asset' : 'Add Asset'}</span>
           </nav>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">
          {id ? `Editing ${existingAsset?.name}` : 'Register New Asset'}
        </h1>
        <p className="text-[#616f89] text-sm mt-1">
          {step === 1 ? 'Choose the category of the asset you want to track.' : `Provide detailed information for the ${assetType.toLowerCase()}.`}
        </p>
      </div>

      {step === 1 && !id && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
          {assetTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectType(t.id as AssetType)}
              className="group p-8 bg-white dark:bg-gray-900 border-2 border-[#f0f2f4] dark:border-gray-800 rounded-2xl text-left hover:border-primary transition-all flex items-center gap-6 shadow-sm"
            >
              <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-4xl">{t.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 text-[#111318] dark:text-white">{t.label}</h3>
                <p className="text-[#616f89] text-sm">Automated tracking templates for {t.id.toLowerCase()}.</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#616f89]">Core Identity</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Asset Name <span className="text-red-500">*</span></label>
                    <input 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700" 
                      placeholder="e.g. 2023 Volvo FH16" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Serial / SKU Number {isSerialRequired && <span className="text-red-500">*</span>}</label>
                    <input 
                      value={formData.serial}
                      onChange={e => setFormData({...formData, serial: e.target.value})}
                      required={isSerialRequired}
                      className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700" 
                      placeholder="SN-9912-X" 
                    />
                    {!isSerialRequired && <p className="text-[10px] text-slate-400">Optional for {assetType.toLowerCase()} categories.</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Current Location</label>
                    <input 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700" 
                      placeholder="e.g. Berlin Depot" 
                    />
                  </div>
                  {assetType === 'Vehicle' && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold">VIN Number</label>
                      <input 
                        value={formData.vin}
                        onChange={e => setFormData({...formData, vin: e.target.value})}
                        className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700" 
                        placeholder="Vehicle Identification Number" 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#616f89]">Status & Visuals</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Asset Status</label>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value as AssetStatus})}
                      className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="Available">Available</option>
                      <option value="On Lease">On Lease</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Needs Review">Needs Review</option>
                    </select>
                    <p className="text-[10px] text-primary font-medium">{statusHelpers[formData.status as keyof typeof statusHelpers]}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Health Score (%)</label>
                    <input 
                      type="number"
                      max="100"
                      min="0"
                      value={formData.health}
                      onChange={e => setFormData({...formData, health: parseInt(e.target.value) || 0})}
                      className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Reference Image URL</label>
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input 
                          value={formData.img}
                          onChange={e => setFormData({...formData, img: e.target.value})}
                          className="w-full rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700" 
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div className="size-12 rounded-lg bg-slate-100 dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm shrink-0 overflow-hidden">
                        {formData.img ? (
                          <img src={formData.img} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Invalid')} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t dark:border-gray-800 flex justify-between items-center">
              {!id && (
                <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Change Category
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <Link to="/inventory" className="px-6 py-2.5 rounded-lg border dark:border-gray-700 font-bold text-sm">Cancel</Link>
                <button type="submit" className="px-10 py-2.5 bg-primary text-white rounded-lg font-bold text-sm shadow-lg hover:bg-primary-hover active:scale-95 transition-all">
                  {id ? 'Save Changes' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
};

export default AddAssetPage;
