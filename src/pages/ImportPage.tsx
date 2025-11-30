/**
 * CSV Import Page
 * Import transactions from CSV file with bulk import capability
 */

import { useTransactionStore } from '@/hooks/useTransactionStore'
import { useCategoryStore } from '@/hooks/useCategoryStore'
import { generateId } from '@/utils/idGenerator'
import { useState, useRef } from 'react'
import { Transaction } from '@/types/transaction'

export default function ImportPage() {
  const { importTransactions } = useTransactionStore()
  const { initializeDefaults } = useCategoryStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'info'
    message: string
    count?: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Parse CSV file
  const parseCSV = (text: string): string[][] => {
    const lines = text.split('\n')
    const result: string[][] = []

    for (const line of lines) {
      if (!line.trim()) continue

      // Simple CSV parsing (handles basic cases)
      const row: string[] = []
      let current = ''
      let insideQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (char === '"') {
          insideQuotes = !insideQuotes
        } else if (char === ',' && !insideQuotes) {
          row.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      row.push(current.trim())

      result.push(row)
    }

    return result
  }

  // Validate and convert CSV row to transaction
  const parseTransaction = (headers: string[], row: string[]): Transaction | null => {
    try {
      const data: Record<string, string> = {}
      headers.forEach((header, index) => {
        if (row[index] !== undefined) {
          data[header.toLowerCase().trim()] = row[index].trim()
        }
      })

      // Required fields
      if (!data.date || !data.merchant || !data.amount || !data.currency) {
        return null
      }

      // Parse date
      const parsedDate = new Date(data.date)
      if (isNaN(parsedDate.getTime())) {
        return null
      }

      // Parse amount
      const amount = parseFloat(data.amount)
      if (isNaN(amount) || amount <= 0) {
        return null
      }

      return {
        id: generateId('trx'),
        date: parsedDate,
        merchant: data.merchant,
        amount,
        currency: data.currency.toUpperCase() as any,
        category: data.category || 'Uncategorized',
        cardId: data.cardid || 'card_imported',
        isReimbursable: data.reimbursable?.toLowerCase() === 'true' || false,
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    } catch {
      return null
    }
  }

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setStatus({
        type: 'error',
        message: 'Please select a CSV file',
      })
      return
    }

    setIsLoading(true)
    setStatus(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const rows = parseCSV(text)

        if (rows.length < 2) {
          setStatus({
            type: 'error',
            message: 'CSV file must contain headers and at least one data row',
          })
          setIsLoading(false)
          return
        }

        const headers = rows[0]
        const transactions: Transaction[] = []
        let successCount = 0
        let errorCount = 0

        // Parse transactions
        for (let i = 1; i < rows.length; i++) {
          const transaction = parseTransaction(headers, rows[i])
          if (transaction) {
            transactions.push(transaction)
            successCount++
          } else {
            errorCount++
          }
        }

        if (successCount === 0) {
          setStatus({
            type: 'error',
            message: `No valid transactions found. Please check your CSV format. (${errorCount} invalid rows)`,
          })
        } else {
          initializeDefaults()
          importTransactions(transactions)
          setStatus({
            type: 'success',
            message: `Successfully imported ${successCount} transaction${successCount !== 1 ? 's' : ''}${errorCount > 0 ? ` (${errorCount} rows skipped due to errors)` : ''}`,
            count: successCount,
          })
        }
      } catch (error) {
        setStatus({
          type: 'error',
          message: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        })
      } finally {
        setIsLoading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    reader.onerror = () => {
      setStatus({
        type: 'error',
        message: 'Error reading file',
      })
      setIsLoading(false)
    }

    reader.readAsText(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Import Transactions</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Upload a CSV file to import transactions in bulk.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Upload CSV</h2>

        {/* Status Message */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : status.type === 'error'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
            }`}
          >
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        {/* File Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {isLoading ? 'Importing...' : 'Drag and drop your CSV file here'}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? 'Please wait...' : 'or click to browse your computer'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0])
              }
            }}
            className="hidden"
            disabled={isLoading}
          />
        </div>

        {/* Format Instructions */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            CSV Format Requirements
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>
              <strong>Date</strong> - Date (YYYY-MM-DD format) - <span className="text-red-600 dark:text-red-400">Required</span>
            </li>
            <li>
              <strong>Merchant</strong> - Merchant name - <span className="text-red-600 dark:text-red-400">Required</span>
            </li>
            <li>
              <strong>Amount</strong> - Numeric value (e.g., 5.50) - <span className="text-red-600 dark:text-red-400">Required</span>
            </li>
            <li>
              <strong>Currency</strong> - 3-letter code (USD, EUR, etc.) - <span className="text-red-600 dark:text-red-400">Required</span>
            </li>
            <li>
              <strong>Category</strong> - Category name (optional)
            </li>
            <li>
              <strong>Notes</strong> - Transaction notes (optional)
            </li>
            <li>
              <strong>Reimbursable</strong> - true/false (optional)
            </li>
          </ul>
        </div>

        {/* Sample Data */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Example CSV</h3>
          <pre className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg overflow-x-auto text-xs text-gray-100 font-mono">
{`Date,Merchant,Amount,Currency,Category,Notes
2024-01-15,Starbucks,5.50,USD,Meals,Coffee
2024-01-15,Amazon,49.99,USD,Shopping,Books
2024-01-16,Delta Airlines,250.00,USD,Travel,Flight to NY`}
          </pre>
        </div>
      </div>
    </div>
  )
}
