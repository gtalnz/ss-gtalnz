const formatter = Intl.NumberFormat('en-nz', {
  style: 'currency',
  currency: 'NZD',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
