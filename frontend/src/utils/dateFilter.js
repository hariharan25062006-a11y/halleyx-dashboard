export const DATE_FILTERS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
];

export const filterByDateRange = (items, filter) => {
  if (!items || filter === 'all') return items;

  const now = new Date();
  const past = new Date();

  switch (filter) {
    case 'today':
      past.setHours(0, 0, 0, 0);
      break;
    case '7d':
      past.setDate(now.getDate() - 7);
      break;
    case '30d':
      past.setDate(now.getDate() - 30);
      break;
    case '90d':
      past.setDate(now.getDate() - 90);
      break;
    default:
      return items;
  }

  return items.filter((item) => {
    const itemDate = new Date(item.order_date || item.created_at);
    return itemDate >= past && itemDate <= now;
  });
};
