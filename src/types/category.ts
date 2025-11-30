/**
 * Category Types and Interfaces
 * Defines the structure of expense categories
 */

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string; // For subcategories
  color?: string;
  icon?: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryRule {
  id: string;
  categoryId: string;
  matchType: 'merchant' | 'amount' | 'date' | 'keyword';
  matchValue: string;
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  priority: number;
  isActive: boolean;
  createdAt: Date;
}

export interface CategoryHierarchy extends Category {
  subcategories: CategoryHierarchy[];
}

export interface CategoryStats {
  id: string;
  name: string;
  totalSpend: number;
  transactionCount: number;
  percentageOfTotal: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface DefaultCategory {
  name: string;
  icon?: string;
  color?: string;
  subcategories?: string[];
}

export const DEFAULT_CATEGORIES: DefaultCategory[] = [
  {
    name: 'Travel',
    subcategories: ['Flights', 'Hotels', 'Car Rental', 'Parking', 'Public Transit', 'Other'],
  },
  {
    name: 'Meals & Entertainment',
    subcategories: ['Restaurants', 'Coffee', 'Delivery', 'Entertainment', 'Other'],
  },
  {
    name: 'Office Supplies',
    subcategories: ['Stationery', 'Electronics', 'Furniture', 'Other'],
  },
  {
    name: 'Software & Subscriptions',
    subcategories: ['SaaS', 'Cloud Services', 'Licenses', 'Other'],
  },
  {
    name: 'Professional Services',
    subcategories: ['Consulting', 'Legal', 'Accounting', 'Design', 'Other'],
  },
  {
    name: 'Equipment & Tools',
    subcategories: ['Hardware', 'Software Tools', 'Maintenance', 'Other'],
  },
  {
    name: 'Marketing & Advertising',
    subcategories: ['Digital Ads', 'Print', 'Events', 'Other'],
  },
  {
    name: 'Utilities & Communications',
    subcategories: ['Internet', 'Phone', 'Electricity', 'Other'],
  },
  {
    name: 'Personnel Expenses',
    subcategories: ['Salary', 'Payroll Taxes', 'Benefits', 'Training', 'Other'],
  },
  {
    name: 'Miscellaneous',
    subcategories: ['Reimbursable', 'Other'],
  },
];
