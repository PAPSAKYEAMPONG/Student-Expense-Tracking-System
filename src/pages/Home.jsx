import React, { useState } from 'react';
import { Bell, Plus, Bus, Book, Lightbulb, Utensils, QrCode } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import AddTransactionModal from '../components/AddTransactionModal';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

function Home() {
  const { state } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic calculations
  const totalBalance = state.wallets.reduce((sum, w) => sum + w.balance, 0);
  
  const currentMonthTransactions = state.transactions; 
  
  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const recentTransactions = state.transactions.slice(0, 4);

  // Dynamic Monthly Budget for right column
  const topBudgets = state.budgets.slice(0, 3);
  const totalBudgeted = state.budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalBudgetSpent = state.transactions
    .filter(t => t.type === 'expense' && state.budgets.some(b => b.category === t.category))
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const overallUsedPercent = totalBudgeted > 0 ? Math.min((totalBudgetSpent / totalBudgeted) * 100, 100) : 0;

  return (
    <div className="page-wrapper">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-page-title">Portfolio Overview</h1>
          <p className="dashboard-page-subtitle">Welcome back, your spending tracks are updated.</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifications"><Bell size={20} /></button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} style={{marginRight: '8px'}}/> Save Expenses
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="grid-left">
          
          {/* Main Balance Card */}
          <div className="balance-card">
            <p className="card-label">Total Available Balance</p>
            <h2 className="card-balance">${totalBalance.toFixed(2)}</h2>
            
            <div className="balance-stats">
              <div>
                <p className="stat-label">MONTHLY INCOME</p>
                <p className="stat-value">${totalIncome.toFixed(2)}</p>
              </div>
              <div>
                <p className="stat-label">TOTAL EXPENSES</p>
                <p className="stat-value">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="section-header">
            <h3>Recent Activity</h3>
            <NavLink to="/dashboard/wallets" className="btn-link" style={{textDecoration: 'none'}}>See Statement</NavLink>
          </div>
          
          <div className="activity-list">
            {recentTransactions.length === 0 ? (
              <p style={{textAlign: 'center', padding: '20px', color: 'var(--text-muted)'}}>No recent activity.</p>
            ) : (
              recentTransactions.map(t => (
                <ActivityItem 
                  key={t.id}
                  icon={t.type === 'income' ? <Plus size={18} color="#159a83"/> : <Utensils size={18} color="#b87a1d" />} 
                  iconBg={t.type === 'income' ? '#dff2ec' : '#fdeaca'}
                  title={t.title} 
                  subtitle={`${t.category} • ${new Date(t.date).toLocaleDateString()}`} 
                  amount={`${t.type === 'income' ? '+' : '-'}$${parseFloat(t.amount).toFixed(2)}`} 
                  type={t.type} 
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="grid-right">
          
          {/* Monthly Budget */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Monthly Budget</h3>
              {totalBudgeted > 0 && <span className="badge">{Math.round(overallUsedPercent)}%</span>}
            </div>
            <div className="budget-bars">
              {topBudgets.length === 0 ? (
                <p style={{fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px 0'}}>
                  No active budgets.
                </p>
              ) : (
                topBudgets.map(b => {
                  const spent = state.transactions
                    .filter(t => t.type === 'expense' && t.category === b.category)
                    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
                  
                  let color = '#455a64';
                  if (b.category.includes('Food')) color = '#f5a623';
                  else if (b.category.includes('Transport')) color = '#19b69b';

                  return (
                    <BudgetBar 
                      key={b.id} 
                      label={b.category.toUpperCase()} 
                      spent={spent.toFixed(2)} 
                      total={b.limit.toFixed(2)} 
                      color={color} 
                    />
                  );
                })
              )}
            </div>
            <NavLink to="/dashboard/budget" className="btn-link w-full text-center mt-16" style={{display: 'block', textDecoration: 'none'}}>
              Manage Budgets
            </NavLink>
          </div>

          {/* Student Tip */}
          <div className="tip-card" style={{marginTop: '24px'}}>
            <div className="tip-icon"><Lightbulb size={20} color="#159a83"/></div>
            <h4>Student Tip</h4>
            <p>You've spent 15% more on coffee this week than your semester average. Switching to the library cafe could save you <strong>$45</strong> by finals.</p>
            <button className="btn-link">Explore Student Discounts →</button>
          </div>

        </div>
      </div>
      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// Subcomponents
const ActivityItem = ({ icon, iconBg, title, subtitle, amount, type }) => (
  <div className="activity-item">
    <div className="activity-icon" style={{ backgroundColor: iconBg }}>{icon}</div>
    <div className="activity-details">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
    <div className={`activity-amount ${type}`}>{amount}</div>
  </div>
);

const BudgetBar = ({ label, spent, total, color }) => {
  const percent = Math.min((spent / total) * 100, 100);
  return (
    <div className="budget-bar-container">
      <div className="budget-bar-header">
        <span className="budget-label">{label}</span>
        <span className="budget-values">${spent} / ${total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
};

export default Home;
