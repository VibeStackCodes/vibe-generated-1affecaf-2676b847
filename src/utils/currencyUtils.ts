/**
 * Currency Utilities
 * Handles currency conversion and formatting
 */

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
}

// Mock exchange rates for demo purposes
const MOCK_EXCHANGE_RATES: Record<string, Record<string, number>> = {
  USD: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.53,
    JPY: 149.5,
  },
  EUR: {
    USD: 1.09,
    EUR: 1,
    GBP: 0.86,
    CAD: 1.48,
    AUD: 1.67,
    JPY: 163.5,
  },
  GBP: {
    USD: 1.27,
    EUR: 1.16,
    GBP: 1,
    CAD: 1.72,
    AUD: 1.94,
    JPY: 190.0,
  },
  CAD: {
    USD: 0.74,
    EUR: 0.68,
    GBP: 0.58,
    CAD: 1,
    AUD: 1.13,
    JPY: 110.0,
  },
  AUD: {
    USD: 0.65,
    EUR: 0.60,
    GBP: 0.51,
    CAD: 0.88,
    AUD: 1,
    JPY: 97.5,
  },
  JPY: {
    USD: 0.0067,
    EUR: 0.0061,
    GBP: 0.0053,
    CAD: 0.0091,
    AUD: 0.0103,
    JPY: 1,
  },
};

/**
 * Convert amount from one currency to another
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rate =
    MOCK_EXCHANGE_RATES[fromCurrency]?.[toCurrency] ||
    MOCK_EXCHANGE_RATES['USD']?.[toCurrency] ||
    1;

  return Math.round(amount * rate * 100) / 100;
};

/**
 * Get exchange rate between two currencies
 */
export const getExchangeRate = (from: string, to: string): number => {
  if (from === to) return 1;
  return MOCK_EXCHANGE_RATES[from]?.[to] || 1;
};

/**
 * Format amount with currency symbol
 */
export const formatCurrency = (amount: number, currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
  };

  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
};

/**
 * Parse amount from formatted currency string
 */
export const parseCurrencyAmount = (formatted: string): number => {
  const cleaned = formatted.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Get all supported currencies
 */
export const getSupportedCurrencies = (): string[] => {
  return Object.keys(MOCK_EXCHANGE_RATES);
};

/**
 * Check if currency code is valid
 */
export const isValidCurrency = (currency: string): boolean => {
  return getSupportedCurrencies().includes(currency.toUpperCase());
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
  };
  return symbols[currency] || currency;
};
