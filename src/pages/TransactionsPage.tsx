/**
 * Transactions Page
 * View and manage all transactions
 */

import { useTransactionStore } from '@/hooks/useTransactionStore'
import { useState, useMemo } from 'react'

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactionStore()
  const [searchMerchant, setSearchMerchant] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category).filter(Boolean))
    return Array.from(cats).sort()
  }, [transactions])

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions]

    if (searchMerchant) {
      filtered = filtered.filter((t) =>
        t.merchant.toLowerCase().includes(searchMerchant.toLowerCase())
      )
    }

    if (filterCategory) {
      filtered = filtered.filter((t) => t.category === filterCategory)
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        comparison = a.amount - b.amount
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [transactions, searchMerchant, filterCategory, sortBy, sortOrder])

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage your recorded transactions.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Transactions ({filteredTransactions.length})
          </h2>
          <a href="/quick-add" className="btn-primary">
            ➕ Add Transaction
          </a>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search merchant..."
            value={searchMerchant}
            onChange={(e) => setSearchMerchant(e.target.value)}
            className="input-field"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="input-field"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn-secondary"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Merchant
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No transactions found. Start by{' '}
                      <a href="/quick-add" className="text-[#003d82] hover:underline font-medium">
                        adding one
                      </a>
                      .
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {transaction.merchant}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded text-xs font-medium">
                        {transaction.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.currency} ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {transaction.notes ? (
                        <span title={transaction.notes} className="truncate block max-w-xs">
                          {transaction.notes}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
