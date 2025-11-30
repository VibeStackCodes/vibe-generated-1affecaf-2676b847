/**
 * Category Store Hook
 * Manages category state and operations
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { Category, CategoryHierarchy, CategoryRule, DEFAULT_CATEGORIES } from '@/types/category';
import { generateId } from '@/utils/idGenerator';

interface CategoryContextType {
  categories: Category[];
  categoryRules: CategoryRule[];
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategory: (id: string) => Category | undefined;
  getCategoryHierarchy: () => CategoryHierarchy[];
  getSubcategories: (parentId: string) => Category[];
  addCategoryRule: (rule: Omit<CategoryRule, 'id' | 'createdAt'>) => string;
  updateCategoryRule: (id: string, updates: Partial<CategoryRule>) => void;
  deleteCategoryRule: (id: string) => void;
  getCategoryRules: (categoryId: string) => CategoryRule[];
  initializeDefaults: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryRules, setCategoryRules] = useState<CategoryRule[]>([]);

  const addCategory = (
    category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
  ): string => {
    const id = generateId('cat');
    const newCategory: Category = {
      ...category,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCategories((prev) => [...prev, newCategory]);
    return id;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updates, updatedAt: new Date() }
          : c
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCategoryRules((prev) => prev.filter((r) => r.categoryId !== id));
  };

  const getCategory = (id: string): Category | undefined => {
    return categories.find((c) => c.id === id);
  };

  const getCategoryHierarchy = (): CategoryHierarchy[] => {
    const buildHierarchy = (parentId?: string): CategoryHierarchy[] => {
      return categories
        .filter((c) => c.parentId === parentId && !c.isArchived)
        .map((c) => ({
          ...c,
          subcategories: buildHierarchy(c.id),
        }));
    };
    return buildHierarchy();
  };

  const getSubcategories = (parentId: string): Category[] => {
    return categories.filter((c) => c.parentId === parentId && !c.isArchived);
  };

  const addCategoryRule = (rule: Omit<CategoryRule, 'id' | 'createdAt'>): string => {
    const id = generateId('rule');
    const newRule: CategoryRule = {
      ...rule,
      id,
      createdAt: new Date(),
    };
    setCategoryRules((prev) => [...prev, newRule]);
    return id;
  };

  const updateCategoryRule = (id: string, updates: Partial<CategoryRule>) => {
    setCategoryRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const deleteCategoryRule = (id: string) => {
    setCategoryRules((prev) => prev.filter((r) => r.id !== id));
  };

  const getCategoryRules = (categoryId: string): CategoryRule[] => {
    return categoryRules.filter((r) => r.categoryId === categoryId && r.isActive);
  };

  const initializeDefaults = () => {
    if (categories.length === 0) {
      DEFAULT_CATEGORIES.forEach((defaultCat) => {
        const parentId = addCategory({
          name: defaultCat.name,
          icon: defaultCat.icon,
          color: defaultCat.color,
          isArchived: false,
        });

        if (defaultCat.subcategories) {
          defaultCat.subcategories.forEach((subName) => {
            addCategory({
              name: subName,
              parentId,
              isArchived: false,
            });
          });
        }
      });
    }
  };

  const contextValue: CategoryContextType = {
    categories,
    categoryRules,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryHierarchy,
    getSubcategories,
    addCategoryRule,
    updateCategoryRule,
    deleteCategoryRule,
    getCategoryRules,
    initializeDefaults,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryStore = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryStore must be used within CategoryProvider');
  }
  return context;
};
