/**
 * Categories Management Page
 * Manage expense categories and subcategories
 */

import { useCategoryStore } from '@/hooks/useCategoryStore'
import { useEffect, useState } from 'react'

export default function CategoriesPage() {
  const { getCategoryHierarchy, initializeDefaults, addCategory } = useCategoryStore()
  const [categories, setCategories] = useState<any[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    initializeDefaults()
    setCategories(getCategoryHierarchy())
  }, [])

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      addCategory({ name: newCategoryName.trim(), isArchived: false })
      setNewCategoryName('')
      setCategories(getCategoryHierarchy())
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your expense categories and rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Category Form */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add Category
          </h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="input-field"
            />
            <button type="submit" className="btn-primary w-full">
              ➕ Add
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Categories ({categories.length})
          </h2>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No categories yet.</p>
            ) : (
              categories.map((cat: any) => (
                <div key={cat.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
                    {cat.subcategories.length > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cat.subcategories.length} subcategories
                      </p>
                    )}
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
