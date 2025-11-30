import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { VibeStackBadge } from '@/components/vibestack-badge'
import { AuthProvider } from '@/hooks/useAuth'
import { TransactionProvider } from '@/hooks/useTransactionStore'
import { CategoryProvider } from '@/hooks/useCategoryStore'
import { Layout } from '@/components/Layout'

/**
 * Main App component with routing
 * Provides context providers for global state management
 * Uses React Router for SPA navigation
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TransactionProvider>
          <CategoryProvider>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              }
            >
              <Layout>
                <Outlet />
              </Layout>
            </Suspense>
            <VibeStackBadge />
          </CategoryProvider>
        </TransactionProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
