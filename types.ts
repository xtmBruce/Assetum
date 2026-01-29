
export type Severity = 'Minor' | 'Major' | 'Critical';
export type AssetStatus = 'Available' | 'On Lease' | 'Maintenance' | 'Needs Review' | 'Deactivated';
export type RentalStatus = 'Draft' | 'Active' | 'Overdue' | 'Completed' | 'Terminated';
export type IncidentStatus = 'Needs Review' | 'Pending Approval' | 'Approved' | 'Fixed' | 'Sent to Insurance';
export type AssetType = 'Vehicle' | 'Property' | 'Equipment' | 'Tools';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  location: string;
  img: string;
  serial: string;
  vin?: string;
  health: number;
  custodian?: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Inspector' | 'Financial Controller';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  ip: string;
  avatar: string;
}

export interface Rental {
  id: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  assetId: string;
  assetName: string;
  startDate: string;
  endDate: string;
  baseRate: number;
  adminFee: number;
  total: number;
  paid: number;
  status: RentalStatus;
  paymentPlan: 'Full' | 'Partial';
}

export interface Incident {
  id: string;
  assetId: string;
  assetName: string;
  severity: Severity;
  status: IncidentStatus;
  dateReported: string;
  description: string;
  initialEstimate: number;
  partsCost: number;
  laborCost: number;
  adminFee: number;
  totalCost: number;
  client: string;
  images: string[];
  findings?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  urgent: boolean;
  category: 'Lease' | 'Incident' | 'Maintenance' | 'System' | 'User';
  link: string;
  read: boolean;
}
