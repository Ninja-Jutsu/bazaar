export const formatCurrency = (amount: number | null) => {
  const value = amount || 0
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return currencyFormat.format(value)
}
