export function formatPrice(amount: number): string {
  const formatted = amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
  return `₪${formatted}`;
}
