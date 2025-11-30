/**
 * Dashboard Page
 * Main analytics and overview page with spending insights
 */

import { useCategoryStore } from '@/hooks/useCategoryStore'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { initializeDefaults } = useCategoryStore()

  useEffect(() => {
    initializeDefaults()
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to SpendSight. Track and analyze your spending patterns.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">$0.00</div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">This month</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Transactions
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">0</div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Total count</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Average Transaction
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">$0.00</div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Mean value</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">0</div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Active</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Spending by Category
          </h3>
          <div className="mt-4 flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Spending Trend
          </h3>
          <div className="mt-4 flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <a href="/quick-add" className="btn-primary">
            ➕ Add Expense
          </a>
          <a href="/import" className="btn-secondary">
            📥 Import Transactions
          </a>
          <a href="/categories" className="btn-secondary">
            🏷️ Manage Categories
          </a>
        </div>
      </div>
    </div>
  )
}
