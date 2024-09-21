'use client'
import { ThemeProvider } from '@/components/theme-provider'
import ProductProvider from '@/components/contexts/ProductContext'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ProductProvider>{children}</ProductProvider>
    </ThemeProvider>
  )
}
export default Providers
