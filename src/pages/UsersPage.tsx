/**
 * Users Management Page
 * Manage team members and access control
 */

import { useAuth } from '@/hooks/useAuth'

export default function UsersPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage team members and their access permissions.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Team Members
          </h2>
          <button className="btn-primary">➕ Add User</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {user?.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {user?.name}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="badge badge-primary capitalize">{user?.role}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="badge badge-success">Active</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-[#003d82] hover:underline font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
