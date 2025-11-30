/**
 * Card and Bank Feed Types
 * Defines payment cards and connected bank accounts
 */

export type CardType = 'credit' | 'debit' | 'amex' | 'visa' | 'mastercard' | 'discover';
export type CardStatus = 'active' | 'inactive' | 'archived' | 'suspended';
export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export interface Card {
  id: string;
  name: string;
  cardType: CardType;
  lastFourDigits: string;
  currency: string;
  status: CardStatus;
  integrationStatus: IntegrationStatus;
  integrationProvider?: 'plaid' | 'stripe' | 'manual'; // For future integrations
  connectedAt?: Date;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardIngestionConfig {
  cardId: string;
  autoSync: boolean;
  syncFrequency?: 'hourly' | 'daily' | 'weekly'; // For scheduled syncing
  lastSyncAt?: Date;
  nextSyncAt?: Date;
  isActive: boolean;
}

export interface CardIngestionResult {
  cardId: string;
  transactionsAdded: number;
  transactionsUpdated: number;
  errors: string[];
  syncedAt: Date;
}
