/**
 * Transaction Store Hook
 * Manages transaction state using React hooks and Context
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, TransactionFilter, TransactionStats } from '@/types/transaction';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransaction: (id: string) => Transaction | undefined;
  getFilteredTransactions: (filter: TransactionFilter) => Transaction[];
  getStats: (filter?: TransactionFilter) => TransactionStats;
  importTransactions: (transactions: Transaction[]) => void;
  clearTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const getTransaction = (id: string) => {
    return transactions.find((t) => t.id === id);
  };

  const getFilteredTransactions = (filter: TransactionFilter): Transaction[] => {
    return transactions.filter((t) => {
      if (filter.startDate && t.date < filter.startDate) return false;
      if (filter.endDate && t.date > filter.endDate) return false;
      if (filter.category && t.category !== filter.category) return false;
      if (filter.cardId && t.cardId !== filter.cardId) return false;
      if (filter.merchant && !t.merchant.toLowerCase().includes(filter.merchant.toLowerCase()))
        return false;
      if (filter.currency && t.currency !== filter.currency) return false;
      if (filter.minAmount && t.amount < filter.minAmount) return false;
      if (filter.maxAmount && t.amount > filter.maxAmount) return false;
      if (filter.isReimbursable !== undefined && t.isReimbursable !== filter.isReimbursable)
        return false;
      return true;
    });
  };

  const getStats = (filter?: TransactionFilter): TransactionStats => {
    const filtered = filter ? getFilteredTransactions(filter) : transactions;

    if (filtered.length === 0) {
      return {
        totalCount: 0,
        totalAmount: 0,
        averageAmount: 0,
        minAmount: 0,
        maxAmount: 0,
        currencyBreakdown: {},
      };
    }

    const amounts = filtered.map((t) => t.amount);
    const currencyBreakdown: Record<string, number> = {};

    filtered.forEach((t) => {
      currencyBreakdown[t.currency] = (currencyBreakdown[t.currency] || 0) + t.amount;
    });

    return {
      totalCount: filtered.length,
      totalAmount: amounts.reduce((a, b) => a + b, 0),
      averageAmount: amounts.reduce((a, b) => a + b, 0) / amounts.length,
      minAmount: Math.min(...amounts),
      maxAmount: Math.max(...amounts),
      currencyBreakdown,
    };
  };

  const importTransactions = (newTransactions: Transaction[]) => {
    setTransactions((prev) => [...prev, ...newTransactions]);
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const contextValue: TransactionContextType = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
    getFilteredTransactions,
    getStats,
    importTransactions,
    clearTransactions,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionStore = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionStore must be used within TransactionProvider');
  }
  return context;
};
