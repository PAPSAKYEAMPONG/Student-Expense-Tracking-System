import React from 'react';
import { Calendar, Download, TrendingUp } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import './Dashboard.css';

function Analytics() {
  const { state } = useExpense();

  const totalBalance = state.wallets.reduce((sum, w) => sum + w.balance, 0);

  const expenses = state.transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Calculate breakdown by category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});

  const breakdownData = Object.keys(categoryTotals).map(cat => ({
    label: cat,
    amount: categoryTotals[cat],
    percent: totalExpense > 0 ? (categoryTotals[cat] / totalExpense) * 100 : 0
  })).sort((a, b) => b.amount - a.amount);

  return (
    <div className="page-wrapper">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-page-title">Financial Analytics</h1>
          <p className="dashboard-page-subtitle">Detailed insights for your Academic Journey.</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn"><Calendar size={20} /></button>
          <button className="btn btn-primary btn-sm" style={{borderRadius: '24px'}}><Download size={18} style={{marginRight: '8px'}}/> Export Data</button>
        </div>
      </header>

      {/* Top Stats Cards */}
      <div className="wallets-cards-grid" style={{ gridTemplateColumns: 'minmax(0, 400px)' }}>
        <div className="wallet-card dark" style={{justifyContent: 'center', padding: '32px'}}>
          <span style={{fontSize: '11px', fontWeight: 600, opacity: 0.8, letterSpacing: '0.5px', marginBottom: '8px'}}>TOTAL BALANCE</span>
          <h2 className="wallet-card-balance" style={{marginBottom: '16px'}}>GH¢{totalBalance.toFixed(2)}</h2>
          <div>
            <span style={{backgroundColor: 'rgba(25, 182, 155, 0.4)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600}}>
              Tracking Active
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="grid-left">
          <div className="widget-card" style={{minHeight: '340px', display: 'flex', flexDirection: 'column'}}>
            <div className="widget-header">
              <h3>Monthly Comparisons</h3>
              <div style={{display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--card-dark)'}}></div> Current</span>
                <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#e0e0e0'}}></div> Previous</span>
              </div>
            </div>
            
            <div style={{flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', position: 'relative'}}>
               {/* Decorative bars placeholder tied indirectly to spending amount */}
               {Array.from({length: 5}).map((_, i) => (
                  <div key={i} style={{width: '24px', height: `${Math.random() * 60 + 20}%`, backgroundColor: i === 4 ? 'var(--card-dark)' : '#e0e0e0', borderRadius: '4px'}}></div>
               ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)'}}>
              <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid-right">
          <div className="widget-card">
            <h3 style={{marginBottom: '24px'}}>Spending Breakdown</h3>
            
            {breakdownData.length === 0 ? (
               <p style={{fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0'}}>Add expenses to see breakdown.</p>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  {breakdownData.map((item, idx) => {
                    let icon = '🛒'; let iconBg = '#eceff1'; let color = '#455a64';
                    if (item.label.includes('Food')) { icon = '🍴'; iconBg = '#fdeaca'; color = '#f5a623'; }
                    else if (item.label.includes('Transport')) { icon = '🚆'; iconBg = '#dff2ec'; color = '#19b69b'; }
                    else if (item.label.includes('Learn') || item.label.includes('Education')) { icon = '🎓'; iconBg = '#dbeafe'; color = '#1d4ed8'; }
                    
                    return (
                      <BreakdownItem 
                        key={idx}
                        icon={<span style={{fontSize: '18px', display: 'flex', alignContent: 'center'}}>{icon}</span>} 
                        iconBg={iconBg} 
                        label={item.label} 
                        amount={`GH¢${item.amount.toFixed(2)}`} 
                        percent={item.percent} 
                        color={color} 
                      />
                    );
                  })}
                </div>
            )}

            {breakdownData.length > 0 && (
              <button className="btn btn-white w-full text-center mt-24" style={{backgroundColor: '#e2e8f0', color: 'var(--text-main)', border: 'none'}}>
                View Full Inventory
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card */}
      <div className="widget-card mt-24" style={{minHeight: '260px'}}>
        <div className="widget-header">
          <div>
            <h3>Weekly Trends</h3>
            <p style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px'}}>Daily spending volatility</p>
          </div>
          <button className="btn-white" style={{padding: '6px 12px', fontSize: '12px', border: '1px solid var(--border-color)', borderRadius: '16px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)'}}>Last 7 Days ˇ</button>
        </div>
        
        <div style={{height: '140px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'flex-end', paddingBottom: '16px', position: 'relative'}}>
           {/* Chart line placeholder using SVG */}
           <svg width="100%" height="80" style={{position: 'absolute', bottom: 16, left: 0}} preserveAspectRatio="none" viewBox="0 0 100 100">
             <path d="M0,80 Q20,60 40,90 T80,40 T100,60" fill="none" stroke="var(--card-dark)" strokeWidth="3" />
             <circle cx="20" cy="70" r="4" fill="var(--card-dark)" />
             <circle cx="40" cy="90" r="4" fill="var(--card-dark)" />
             <circle cx="60" cy="65" r="4" fill="var(--card-dark)" />
             <circle cx="80" cy="40" r="4" fill="var(--card-dark)" />
           </svg>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)'}}>
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
      </div>
      
    </div>
  );
}

const BreakdownItem = ({ icon, iconBg, label, amount, percent, color }) => (
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <div className="activity-icon" style={{ backgroundColor: iconBg, margin: 0, width: '48px', height: '48px', borderRadius: '16px' }}>{icon}</div>
    <div style={{flex: 1}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600}}>
        <span>{label}</span>
        <span>{amount}</span>
      </div>
      <div className="progress-track" style={{height: '6px', backgroundColor: '#f0f0f0'}}>
        <div className="progress-fill" style={{width: `${percent}%`, backgroundColor: color}}></div>
      </div>
    </div>
  </div>
);

export default Analytics;
