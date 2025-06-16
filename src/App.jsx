import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Customers from './pages/Customers';
import ActivityManagement from './pages/ActivityManagement';
import SosialMediaMarketing from './pages/SosialMediaMarketing';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Customers />} />
        <Route path="/activity-management" element={<ActivityManagement />} />
        <Route path="/social-media" element={<SosialMediaMarketing />} />
      </Route>
    </Routes>
  );
}

export default App; 