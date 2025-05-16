export const formatPrice = (price: number, currency: string = 'USD'): string => {
  if (price === 0) {
    return 'Free';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};