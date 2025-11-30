import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from '@/App'

/**
 * Lazy-loaded page components for code splitting
 */
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'))
const QuickAddPage = lazy(() => import('@/pages/QuickAddPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const ImportPage = lazy(() => import('@/pages/ImportPage'))
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage'))
const AuditLogPage = lazy(() => import('@/pages/AuditLogPage'))
const UsersPage = lazy(() => import('@/pages/UsersPage'))

/**
 * Loading fallback component
 */
const PageLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-[#003d82] border-t-transparent rounded-full mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
)

/**
 * Get basename dynamically from window location or environment
 * Supports both preview proxy and direct deployment
 */
function getBasename(): string {
  // Check if basename is set by preview proxy script
  if (typeof window !== 'undefined') {
    const previewBasename = (window as { __PREVIEW_BASENAME__?: string }).__PREVIEW_BASENAME__
    if (previewBasename) {
      console.log('[Router] Using basename from window.__PREVIEW_BASENAME__:', previewBasename)
      return previewBasename
    }

    // Fallback: detect basename from current URL pathname
    // This handles cases where the script hasn't run yet or for preview proxy URLs
    if (window.location.pathname.startsWith('/api/preview/')) {
      const pathMatch = window.location.pathname.match(/^(\/api\/preview\/[^/]+)/)
      if (pathMatch) {
        const detectedBasename = pathMatch[1]
        console.log('[Router] Detected basename from URL pathname:', detectedBasename)
        // Also set it on window for consistency
        ;(window as { __PREVIEW_BASENAME__?: string }).__PREVIEW_BASENAME__ = detectedBasename
        return detectedBasename
      }
    }
  }

  // Check environment variable (for build-time configuration)
  if (import.meta.env.VITE_BASENAME) {
    return import.meta.env.VITE_BASENAME
  }

  // Default: no basename (root deployment)
  console.log('[Router] No basename detected, using root')
  return ''
}

/**
 * Application routes
 * Add new routes here for code splitting
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: (
            <Suspense fallback={<PageLoader />}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: 'transactions',
          element: (
            <Suspense fallback={<PageLoader />}>
              <TransactionsPage />
            </Suspense>
          ),
        },
        {
          path: 'quick-add',
          element: (
            <Suspense fallback={<PageLoader />}>
              <QuickAddPage />
            </Suspense>
          ),
        },
        {
          path: 'categories',
          element: (
            <Suspense fallback={<PageLoader />}>
              <CategoriesPage />
            </Suspense>
          ),
        },
        {
          path: 'import',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ImportPage />
            </Suspense>
          ),
        },
        {
          path: 'templates',
          element: (
            <Suspense fallback={<PageLoader />}>
              <TemplatesPage />
            </Suspense>
          ),
        },
        {
          path: 'audit-log',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AuditLogPage />
            </Suspense>
          ),
        },
        {
          path: 'users',
          element: (
            <Suspense fallback={<PageLoader />}>
              <UsersPage />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: getBasename(),
  }
)
