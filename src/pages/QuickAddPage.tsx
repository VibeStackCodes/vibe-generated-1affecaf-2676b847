/**
 * Quick Add Expense Page
 * Simple form to quickly add a new expense
 */

import { useState } from 'react'
import { useTransactionStore } from '@/hooks/useTransactionStore'
import { useCategoryStore } from '@/hooks/useCategoryStore'
import { generateId } from '@/utils/idGenerator'
import { validateTransaction } from '@/utils/validators'

export default function QuickAddPage() {
  const { addTransaction } = useTransactionStore()
  const { getCategoryHierarchy } = useCategoryStore()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    amount: '',
    currency: 'USD',
    category: '',
    cardId: 'card_default',
    isReimbursable: false,
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transactionData = {
      date: new Date(formData.date),
      merchant: formData.merchant,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      category: formData.category,
      cardId: formData.cardId,
      isReimbursable: formData.isReimbursable,
      notes: formData.notes,
    }

    const errors = validateTransaction(transactionData)

    if (errors.length > 0) {
      setMessage({
        type: 'error',
        text: errors.map((e) => e.message).join(', '),
      })
      return
    }

    addTransaction({
      id: generateId('trx'),
      ...transactionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    setMessage({ type: 'success', text: 'Transaction added successfully!' })
    setFormData({
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      amount: '',
      currency: 'USD',
      category: '',
      cardId: 'card_default',
      isReimbursable: false,
      notes: '',
    })

    setTimeout(() => setMessage(null), 3000)
  }

  const categories = getCategoryHierarchy()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Expense</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Quickly add a new expense entry.</p>
      </div>

      <div className="card p-6">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="input-field"
                  required
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="input-field w-24"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>CAD</option>
                  <option>AUD</option>
                </select>
              </div>
            </div>

            {/* Merchant */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Merchant *
              </label>
              <input
                type="text"
                name="merchant"
                value={formData.merchant}
                onChange={handleChange}
                placeholder="Store or service name"
                className="input-field"
                required
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <optgroup key={cat.id} label={cat.name}>
                    {cat.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional notes"
                rows={3}
                className="input-field"
              />
            </div>

            {/* Reimbursable */}
            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                name="isReimbursable"
                id="isReimbursable"
                checked={formData.isReimbursable}
                onChange={handleChange}
                className="w-4 h-4 accent-[#003d82]"
              />
              <label
                htmlFor="isReimbursable"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mark as reimbursable
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              💾 Add Expense
            </button>
            <button
              type="reset"
              className="btn-secondary"
              onClick={() =>
                setFormData({
                  date: new Date().toISOString().split('T')[0],
                  merchant: '',
                  amount: '',
                  currency: 'USD',
                  category: '',
                  cardId: 'card_default',
                  isReimbursable: false,
                  notes: '',
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
