/**
 * Validation Utilities
 * Validation functions for transactions, categories, and other entities
 */

import { Transaction } from '@/types/transaction';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate a transaction object
 */
export const validateTransaction = (transaction: Partial<Transaction>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!transaction.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  } else if (transaction.date > new Date()) {
    errors.push({ field: 'date', message: 'Date cannot be in the future' });
  }

  if (!transaction.amount || transaction.amount <= 0) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' });
  }

  if (transaction.amount && transaction.amount > 1000000) {
    errors.push({ field: 'amount', message: 'Amount seems unusually large' });
  }

  if (!transaction.merchant || transaction.merchant.trim().length === 0) {
    errors.push({ field: 'merchant', message: 'Merchant is required' });
  }

  if (!transaction.currency || transaction.currency.length !== 3) {
    errors.push({ field: 'currency', message: 'Valid currency code is required (e.g., USD, EUR)' });
  }

  if (!transaction.cardId) {
    errors.push({ field: 'cardId', message: 'Card is required' });
  }

  if (!transaction.category || transaction.category.trim().length === 0) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  if (transaction.notes && transaction.notes.length > 500) {
    errors.push({ field: 'notes', message: 'Notes must be 500 characters or less' });
  }

  return errors;
};

/**
 * Validate email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate currency code
 */
export const validateCurrencyCode = (code: string): boolean => {
  // ISO 4217 currency codes are 3 uppercase letters
  return /^[A-Z]{3}$/.test(code);
};

/**
 * Validate date range
 */
export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};

/**
 * Check for potential duplicate transaction
 */
export const isDuplicateTransaction = (
  transactions: Transaction[],
  newTransaction: Partial<Transaction>,
  threshold = 300 // Time window in seconds
): boolean => {
  if (!newTransaction.date || !newTransaction.amount || !newTransaction.merchant) {
    return false;
  }

  const timeDiff = threshold * 1000; // Convert to milliseconds

  return transactions.some((t) => {
    const dateDiff = Math.abs(t.date.getTime() - newTransaction.date!.getTime());
    return (
      dateDiff < timeDiff &&
      t.amount === newTransaction.amount &&
      t.merchant.toLowerCase() === newTransaction.merchant.toLowerCase()
    );
  });
};

/**
 * Sanitize transaction notes
 */
export const sanitizeNotes = (notes: string): string => {
  return notes
    .trim()
    .substring(0, 500)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
};
