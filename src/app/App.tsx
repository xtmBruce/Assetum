import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import DashboardLayout from '../components/DashboardLayout';
import MainDashboardPage from '../pages/MainDashboardPage';
import InventoryPage from '../pages/InventoryPage';
import AddAssetPage from '../pages/AddAssetPage';
import AssetDetailPage from '../pages/AssetDetailPage';
import RentalsOverviewPage from '../pages/RentalsOverviewPage';
import RentalAgreementPage from '../pages/RentalAgreementPage';
import RentalDetailPage from '../pages/RentalDetailPage';
import DamageDashboardPage from '../pages/DamageDashboardPage';
import IncidentReportPage from '../pages/IncidentReportPage';
import IncidentDetailPage from '../pages/IncidentDetailPage';
import DamageAssessmentDetailPage from '../pages/DamageAssessmentDetailPage';
import UserAdminPage from '../pages/UserAdminPage';
import AddMemberPage from '../pages/AddMemberPage';
import NotificationsPage from '../pages/NotificationsPage';
import SettingsPage from '../pages/SettingsPage';
import SuccessPage from '../pages/SuccessPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<MainDashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="assets/add" element={<AddAssetPage />} />
            <Route path="assets/add/:id" element={<AddAssetPage />} />
            <Route path="assets/success" element={<SuccessPage />} />
            <Route path="assets/:id" element={<AssetDetailPage />} />
            <Route path="rentals" element={<RentalsOverviewPage />} />
            <Route path="rentals/new" element={<RentalAgreementPage />} />
            <Route path="rentals/:id" element={<RentalDetailPage />} />
            <Route path="incidents/dashboard" element={<DamageDashboardPage />} />
            <Route path="incidents/new" element={<IncidentReportPage />} />
            <Route path="incidents/:id" element={<IncidentDetailPage />} />
            <Route path="incidents/:id/assess" element={<DamageAssessmentDetailPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/users" element={<UserAdminPage />} />
            <Route path="settings/users/add" element={<AddMemberPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;