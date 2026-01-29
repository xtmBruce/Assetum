
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Asset, User, Rental, Incident, Notification, RentalStatus } from '../types';

interface AppContextType {
  assets: Asset[];
  users: User[];
  rentals: Rental[];
  incidents: Incident[];
  notifications: Notification[];
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRental: (rental: Rental) => void;
  updateRental: (id: string, updates: Partial<Rental>) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  markNotificationRead: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const safeParse = (key: string, fallback: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(() => safeParse('assetum_assets', [
    { id: 'V-10294', name: 'Volvo FH16', type: 'Vehicle', status: 'Available', location: 'Berlin Depot', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIpqNOuOmjjePelU0-MzJ1oOvziGIS7ofQ_NeLT8lFDNT2sjBi1PN9mKvluxMbc5E_-28m7Z-dqI_9JixaqlTvLY5Ac4kuulfjxsszljbv9g6xjvupOZYh_Rao8UZzr9E6-1ZcqkZieUsp9LBOasoE7WylJIwykc8zzB8TKoI80NAKxfrg9I8_Tt-L4KUnJ6AGynBht6vNGYhdOqr1Ux-iGrJroeCRAu4cCq5vTwsqZCiLvkyglDUvqfCTx9fQdju7ianSZVdTkM4m', serial: 'VOL-FH-991', vin: '4V1NC234567890', health: 92, custodian: 'Logistics Pro AG' },
    { id: 'E-7721', name: 'CAT 320D Excavator', type: 'Equipment', status: 'On Lease', location: 'Munich Site A', img: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=200&h=200', serial: 'CAT-320-X', health: 88, custodian: 'Constructo Inc.' },
    { id: 'F-4412', name: 'Toyota 5t Forklift', type: 'Equipment', status: 'Maintenance', location: 'Hamburg Warehouse', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200&h=200', serial: 'TOY-5T-001', health: 65 }
  ]));

  const [users, setUsers] = useState<User[]>(() => safeParse('assetum_users', [
    { id: '1', name: 'Sarah Connor', email: 'sarah.c@assetum.com', role: 'Admin', status: 'Active', lastLogin: 'Oct 24, 2023', ip: '192.168.1.1', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaBCg1wSTfuaeWoKnxT16CkkOcSgVMxJ94E0mNteTvLlgPGsbTOcqBm23hWmcCFc77oO85hxNKJM9Ct9YGfUwy9zlOlK3K5j81c1rC1cUqgEp3pHpZXczuPOLYMxVKOcxO2KPAZFlXtc9yq7gJg9pBSeXJjAO_Vo1UCu8Z777LILQl5H14oHuNJdvexotGcQW_woBeVgPxIMsVkXmTgJG1YrPr41UuMqvQ8WwFoB5BhWgKxIBgfElpjROWl_3gUkr-CeGhaOzhTAYr' },
    { id: '2', name: 'Marcus Wright', email: 'm.wright@assetum.com', role: 'Staff', status: 'Active', lastLogin: 'Oct 23, 2023', ip: '104.22.4.12', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ahte6GymjiZ3nqr02fFQLBVqDN6vP0uTuizZJR6XZCZQbIgNtL6jB6XsrPlFQx8_wXALNwvkhXP_YZs86OlLzxyYJups-oO0gUt1l69CsPK-O4hANz8kraQBilv6QE2TzeYd-92c7Ek7QVTkWtloqU9fJgOhudZoN9CFyDe0J5Xs7YM52gn1-jVAGBJJKQAITu--cHPkUwVXRrF4OF8TRIYS35MIaUGSLtjrQo1JvQKpQCMyWJzGO_CjAjy-9KfJG6MfTTmNu9Ht' }
  ]));

  const [rentals, setRentals] = useState<Rental[]>(() => {
    const data: Rental[] = safeParse('assetum_rentals', [
      { id: 'RA-2201', renterName: 'Constructo Inc.', renterEmail: 'billing@constructo.io', renterPhone: '+49 123 456', assetId: 'E-7721', assetName: 'CAT 320D Excavator', startDate: '2023-10-01', endDate: '2023-10-14', baseRate: 450000, adminFee: 5000, total: 6305000, paid: 6305000, status: 'Active', paymentPlan: 'Full' }
    ]);
    const now = new Date();
    return data.map(r => {
      if (r.status === 'Active' && new Date(r.endDate) < now) {
        return { ...r, status: 'Overdue' as RentalStatus };
      }
      return r;
    });
  });

  const [incidents, setIncidents] = useState<Incident[]>(() => safeParse('assetum_incidents', [
    { id: 'CON-7782', assetId: 'E-7721', assetName: 'CAT 320D Excavator', severity: 'Critical', status: 'Needs Review', dateReported: 'Oct 24, 2023', description: 'Heavy hydraulic leakage discovered after site shift.', initialEstimate: 125000, partsCost: 0, laborCost: 0, adminFee: 2500, totalCost: 127500, client: 'Constructo Inc.', images: [] }
  ]));

  const [notifications, setNotifications] = useState<Notification[]>(() => safeParse('assetum_notifications', [
    { id: 1, title: 'Overdue Rental', message: 'Excavator CAT 320D is past return date.', time: '10m ago', urgent: true, category: 'Lease', link: '/rentals/RA-2201', read: false },
    { id: 2, title: 'New Incident', message: 'V-10294 reported minor damage.', time: '1h ago', urgent: false, category: 'Incident', link: '/incidents/CON-7782', read: false }
  ]));

  useEffect(() => {
    localStorage.setItem('assetum_assets', JSON.stringify(assets));
    localStorage.setItem('assetum_users', JSON.stringify(users));
    localStorage.setItem('assetum_rentals', JSON.stringify(rentals));
    localStorage.setItem('assetum_incidents', JSON.stringify(incidents));
    localStorage.setItem('assetum_notifications', JSON.stringify(notifications));
  }, [assets, users, rentals, incidents, notifications]);

  const addAsset = (asset: Asset) => setAssets(prev => [asset, ...prev]);
  const updateAsset = (id: string, updates: Partial<Asset>) => setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  const deleteAsset = (id: string) => setAssets(prev => prev.filter(a => a.id !== id));
  
  const addUser = (user: User) => setUsers(prev => [user, ...prev]);
  const updateUser = (id: string, updates: Partial<User>) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  const deleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));
  
  const addRental = (rental: Rental) => setRentals(prev => [rental, ...prev]);
  const updateRental = (id: string, updates: Partial<Rental>) => setRentals(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  
  const addIncident = (incident: Incident) => setIncidents(prev => [incident, ...prev]);
  const updateIncident = (id: string, updates: Partial<Incident>) => setIncidents(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  
  const markNotificationRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <AppContext.Provider value={{ 
      assets, users, rentals, incidents, notifications, 
      addAsset, updateAsset, deleteAsset, 
      addUser, updateUser, deleteUser,
      addRental, updateRental, 
      addIncident, updateIncident, 
      markNotificationRead 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
