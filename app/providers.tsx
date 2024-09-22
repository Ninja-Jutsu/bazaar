'use client'
import { ThemeProvider } from '@/components/theme-provider'
import ProductProvider from '@/components/contexts/ProductContext'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <ProductProvider>{children}</ProductProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}
export default Providers
