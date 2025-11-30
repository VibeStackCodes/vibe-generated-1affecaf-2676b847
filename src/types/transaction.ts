/**
 * Transaction Types and Interfaces
 * Defines the structure of transaction objects used throughout the application
 */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | string;

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  currency: Currency;
  merchant: string;
  category: string;
  categoryId?: string;
  cardId: string;
  receiptUrl?: string;
  isReimbursable: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  originalAmount?: number;
  originalCurrency?: Currency;
  convertedAmount?: number;
}

export interface TransactionFilter {
  startDate?: Date;
  endDate?: Date;
  category?: string;
  cardId?: string;
  merchant?: string;
  currency?: Currency;
  minAmount?: number;
  maxAmount?: number;
  isReimbursable?: boolean;
}

export interface TransactionStats {
  totalCount: number;
  totalAmount: number;
  averageAmount: number;
  minAmount: number;
  maxAmount: number;
  currencyBreakdown: Record<Currency, number>;
}

export type TransactionStatus = 'uncategorized' | 'categorized' | 'flagged' | 'archived';

export interface TransactionWithStatus extends Transaction {
  status: TransactionStatus;
}
