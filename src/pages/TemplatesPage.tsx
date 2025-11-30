/**
 * Expense Templates Page
 * Manage recurring expense templates
 */

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Templates</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create and manage recurring expense templates.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Templates
          </h2>
          <button className="btn-primary">➕ Create Template</button>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No templates yet. Create one to automate recurring expenses.
          </p>
        </div>
      </div>
    </div>
  )
}
