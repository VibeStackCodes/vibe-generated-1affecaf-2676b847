/**
 * CSV Import Page
 * Import transactions from CSV file
 */

export default function ImportPage() {
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

        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Drag and drop your CSV file here
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            or click to browse your computer
          </p>
          <input type="file" accept=".csv" className="hidden" />
        </div>

        {/* Format Instructions */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            CSV Format Requirements
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Date (YYYY-MM-DD format)</li>
            <li>• Merchant name</li>
            <li>• Amount (numeric value)</li>
            <li>• Currency (3-letter code: USD, EUR, etc.)</li>
            <li>• Category (optional)</li>
            <li>• Notes (optional)</li>
          </ul>
        </div>

        {/* Sample Data */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Example</h3>
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
