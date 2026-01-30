// API service layer - ready for backend integration
// Currently using localStorage, but structured for easy API replacement

import { Asset, User, Rental, Incident } from '../types';

class ApiService {
  private baseUrl = process.env.VITE_API_URL || '';

  // Asset services
  async getAssets(): Promise<Asset[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/assets`).then(res => res.json());
    const stored = localStorage.getItem('assetum_assets');
    return stored ? JSON.parse(stored) : [];
  }

  async createAsset(asset: Asset): Promise<Asset> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/assets`, { method: 'POST', body: JSON.stringify(asset) });
    return asset;
  }

  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
    // TODO: Replace with actual API call
    throw new Error('Not implemented');
  }

  // User services
  async getUsers(): Promise<User[]> {
    // TODO: Replace with actual API call
    const stored = localStorage.getItem('assetum_users');
    return stored ? JSON.parse(stored) : [];
  }

  // Rental services
  async getRentals(): Promise<Rental[]> {
    // TODO: Replace with actual API call
    const stored = localStorage.getItem('assetum_rentals');
    return stored ? JSON.parse(stored) : [];
  }

  // Incident services
  async getIncidents(): Promise<Incident[]> {
    // TODO: Replace with actual API call
    const stored = localStorage.getItem('assetum_incidents');
    return stored ? JSON.parse(stored) : [];
  }
}

export const apiService = new ApiService();