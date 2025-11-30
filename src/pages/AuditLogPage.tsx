/**
 * Audit Log Page
 * View system audit trail and changes
 */

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Log</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track all changes and activities in the system.
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search audit log..."
              className="input-field"
            />
            <select className="input-field">
              <option value="">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">System initialized</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Demo User • Just now</p>
              </div>
              <span className="badge badge-primary">SYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
