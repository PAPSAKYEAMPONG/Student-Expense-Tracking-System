import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  // Empty state as requested by the user
  wallets: [],
  transactions: [],
  budgets: []
};

const ExpenseContext = createContext();

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD_WALLET':
      return { ...state, wallets: [...state.wallets, action.payload] };
    
    case 'ADD_TRANSACTION': {
      // Adjust wallet balance accordingly
      const updatedWallets = state.wallets.map(w => {
        if (w.id === action.payload.walletId) {
          const amount = parseFloat(action.payload.amount);
          return {
            ...w,
            balance: action.payload.type === 'income' ? w.balance + amount : w.balance - amount
          };
        }
        return w;
      });
      
      return {
        ...state,
        wallets: updatedWallets,
        transactions: [action.payload, ...state.transactions]
      };
    }
    
    case 'ADD_BUDGET':
      // Prevent duplicate categories
      const exists = state.budgets.find(b => b.category === action.payload.category);
      if (exists) {
        return {
          ...state,
          budgets: state.budgets.map(b => b.category === action.payload.category ? { ...b, ...action.payload } : b)
        };
      }
      return { ...state, budgets: [...state.budgets, action.payload] };
      
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Helper actions
  const addWallet = (wallet) => dispatch({ 
    type: 'ADD_WALLET', 
    payload: { 
      ...wallet, 
      id: Date.now().toString(), 
      balance: parseFloat(wallet.balance) || 0 
    } 
  });
  
  const addTransaction = (transaction) => dispatch({ 
    type: 'ADD_TRANSACTION', 
    payload: { 
      ...transaction, 
      id: Date.now().toString(), 
      date: new Date().toISOString() 
    } 
  });
  
  const addBudget = (budget) => dispatch({ 
    type: 'ADD_BUDGET', 
    payload: { 
      ...budget, 
      id: Date.now().toString() 
    } 
  });

  return (
    <ExpenseContext.Provider value={{ state, addWallet, addTransaction, addBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpense = () => useContext(ExpenseContext);
