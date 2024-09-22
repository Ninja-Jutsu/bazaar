'use client'
import { ThemeProvider } from '@/components/theme-provider'
import ProductProvider from '@/components/contexts/ProductContext'
import { Toaster } from '@/components/ui/toaster'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <ProductProvider>{children}</ProductProvider>
      </ThemeProvider>
    </>
  )
}
export default Providers
