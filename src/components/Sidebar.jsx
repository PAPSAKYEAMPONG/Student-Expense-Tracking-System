import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wallet, PieChart, Target, User, Settings, X } from 'lucide-react';

function Sidebar({ isOpen, onClose }) {
  const handleLinkClick = () => {
    if (window.innerWidth <= 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 className="brand-title">SETS</h1>
          <button className="mobile-close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={handleLinkClick}>
            <Home size={20} className="sidebar-icon" />
            Home
          </NavLink>
          <NavLink to="/dashboard/wallets" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={handleLinkClick}>
            <Wallet size={20} className="sidebar-icon" />
            Wallets
          </NavLink>
          <NavLink to="/dashboard/budget" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={handleLinkClick}>
            <Target size={20} className="sidebar-icon" />
            Budget
          </NavLink>
          <NavLink to="/dashboard/analytics" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={handleLinkClick}>
            <PieChart size={20} className="sidebar-icon" />
            Analytics
          </NavLink>
          <NavLink to="/dashboard/profile" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={handleLinkClick}>
            <User size={20} className="sidebar-icon" />
            Profile
          </NavLink>
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar" style={{marginRight: '12px'}}>
             JD
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Student</span>
          </div>
          <button className="settings-btn" aria-label="Settings">
            <Settings size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
