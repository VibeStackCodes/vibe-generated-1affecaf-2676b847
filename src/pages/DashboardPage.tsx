/**
 * Dashboard Page
 * Main analytics and overview page with spending insights
 * Displays real-time statistics from transactions
 */

import { useCategoryStore } from '@/hooks/useCategoryStore'
import { useTransactionStore } from '@/hooks/useTransactionStore'
import { useEffect, useMemo } from 'react'

export default function DashboardPage() {
  const { initializeDefaults } = useCategoryStore()
  const { transactions, getStats } = useTransactionStore()

  useEffect(() => {
    initializeDefaults()
  }, [])

  // Calculate statistics
  const stats = useMemo(() => {
    return getStats()
  }, [transactions, getStats])

  // Calculate current month transactions
  const now = new Date()
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  const monthlyStats = useMemo(() => {
    return getStats({
      startDate: currentMonth,
      endDate: nextMonth,
    })
  }, [transactions, getStats, currentMonth, nextMonth])

  // Group transactions by category
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {}
    transactions.forEach((t) => {
      if (t.category) {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
      }
    })
    return Object.entries(breakdown)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }, [transactions])

  // Daily spending trend (last 7 days)
  const dailyTrend = useMemo(() => {
    const trend: Record<string, number> = {}
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      trend[dateStr] = 0
    }

    transactions.forEach((t) => {
      const dateStr = t.date.toISOString().split('T')[0]
      if (trend.hasOwnProperty(dateStr)) {
        trend[dateStr] += t.amount
      }
    })

    return Object.entries(trend).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount,
    }))
  }, [transactions])

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
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${monthlyStats.totalAmount.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">This month</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Transactions
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {monthlyStats.totalCount}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">This month</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Average Transaction
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${(monthlyStats.averageAmount || 0).toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Mean value</div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total All Time</div>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${stats.totalAmount.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {stats.totalCount} transactions
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Categories */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Spending Categories
          </h3>
          {categoryBreakdown.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 dark:text-gray-400">
                No transactions yet. Add some to see patterns.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {categoryBreakdown.map(([category, amount]) => {
                const maxAmount = Math.max(...categoryBreakdown.map(([, a]) => a))
                const percentage = (amount / maxAmount) * 100
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#003d82]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Daily Spending Trend */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            7-Day Spending Trend
          </h3>
          {dailyTrend.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyTrend.map((day) => {
                const maxAmount = Math.max(...dailyTrend.map((d) => d.amount))
                const percentage = maxAmount > 0 ? (day.amount / maxAmount) * 100 : 0
                return (
                  <div key={day.date}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {day.date}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ${day.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ff7a00]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
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
          <a href="/transactions" className="btn-secondary">
            📋 View Transactions
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
