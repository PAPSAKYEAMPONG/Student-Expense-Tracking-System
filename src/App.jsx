import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Wallets from './pages/Wallets';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import { ExpenseProvider } from './context/ExpenseContext';
import './index.css';

const Placeholder = ({ title }) => (
  <div className="dashboard-page-wrapper">
    <h1 className="dashboard-page-title">{title}</h1>
    <p className="dashboard-page-subtitle">Coming soon...</p>
  </div>
);

function App() {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="wallets" element={<Wallets />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="budget" element={<Budget />} />
            <Route path="profile" element={<Placeholder title="Profile" />} />
          </Route>
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;
