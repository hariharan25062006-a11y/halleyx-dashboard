// --- KPI Metrics ---

export function getTotalRevenue(orders) {
  return orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
}

export function getTotalOrders(orders) {
  return orders.length;
}

export function getAvgOrderValue(orders) {
  if (orders.length === 0) return 0;
  return getTotalRevenue(orders) / orders.length;
}

export function getCompletedRate(orders) {
  if (orders.length === 0) return 0;
  const completed = orders.filter(o => o.status === 'Completed').length;
  return (completed / orders.length) * 100;
}

// --- Bar/Line/Area chart data ---

export function getRevenueByProduct(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.product || 'Unknown';
    map[key] = (map[key] || 0) + (parseFloat(o.total_amount) || 0);
  });
  return Object.entries(map)
    .map(([name, revenue]) => ({ name, revenue: Math.round(revenue * 100) / 100 }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getCountByProduct(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.product || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRevenueByCountry(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.country || 'Unknown';
    map[key] = (map[key] || 0) + (parseFloat(o.total_amount) || 0);
  });
  return Object.entries(map)
    .map(([name, revenue]) => ({ name, revenue: Math.round(revenue * 100) / 100 }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getCountByCountry(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.country || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getWeekNumber(d) {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d - start + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000);
  return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

export function getOrdersByDate(orders, groupBy = 'day') {
  const map = {};

  orders.forEach(o => {
    const d = new Date(o.order_date);
    let key, label;

    if (groupBy === 'day') {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      label = `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
    } else if (groupBy === 'week') {
      const wn = getWeekNumber(d);
      key = `${d.getFullYear()}-W${String(wn).padStart(2, '0')}`;
      label = `W${wn} ${MONTH_NAMES[d.getMonth()]}`;
    } else {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      label = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    }

    if (!map[key]) map[key] = { date: label, count: 0, revenue: 0, _sort: key };
    map[key].count += 1;
    map[key].revenue += parseFloat(o.total_amount) || 0;
  });

  return Object.values(map)
    .sort((a, b) => a._sort.localeCompare(b._sort))
    .map(({ date, count, revenue }) => ({ date, count, revenue: Math.round(revenue * 100) / 100 }));
}

// --- Pie chart data ---

export function getStatusDistribution(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.status || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getProductDistribution(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.product || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getCountryDistribution(orders) {
  const map = {};
  orders.forEach(o => {
    const key = o.country || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

// --- Table widget data ---

export function getTopOrders(orders, n = 5, sortBy = 'total_amount') {
  return [...orders]
    .sort((a, b) => (parseFloat(b[sortBy]) || 0) - (parseFloat(a[sortBy]) || 0))
    .slice(0, n)
    .map(o => ({
      order_id: o.order_id || o.id,
      first_name: o.first_name,
      last_name: o.last_name,
      product: o.product,
      quantity: o.quantity,
      total_amount: o.total_amount,
      status: o.status,
    }));
}
