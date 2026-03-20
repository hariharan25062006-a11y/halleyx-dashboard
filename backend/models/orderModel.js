const db = require('../config/db');

const getAllOrders = async () => {
  const [rows] = await db.execute('SELECT * FROM orders ORDER BY order_date DESC');
  return rows;
};

const getOrderById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
};

const createOrder = async (data) => {
  // Auto-generate order_id
  const [countResult] = await db.execute('SELECT COUNT(*) as count FROM orders');
  const count = countResult[0].count + 1;
  const order_id = `ORD-${String(count).padStart(3, '0')}`;

  // Compute total_amount server-side
  const total_amount = data.quantity * data.unit_price;

  const [result] = await db.execute(
    `INSERT INTO orders (order_id, first_name, last_name, email, phone, street_address, city, state, postal_code, country, product, quantity, unit_price, total_amount, status, created_by, order_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      order_id,
      data.first_name,
      data.last_name,
      data.email,
      data.phone,
      data.street_address,
      data.city,
      data.state,
      data.postal_code,
      data.country,
      data.product,
      data.quantity,
      data.unit_price,
      total_amount,
      data.status || 'Pending',
      data.created_by,
    ]
  );

  return { id: result.insertId, order_id, total_amount };
};

const updateOrder = async (id, data) => {
  const total_amount = data.quantity * data.unit_price;

  const [result] = await db.execute(
    `UPDATE orders SET first_name=?, last_name=?, email=?, phone=?, street_address=?, city=?, state=?, postal_code=?, country=?, product=?, quantity=?, unit_price=?, total_amount=?, status=?, created_by=? WHERE id=?`,
    [
      data.first_name,
      data.last_name,
      data.email,
      data.phone,
      data.street_address,
      data.city,
      data.state,
      data.postal_code,
      data.country,
      data.product,
      data.quantity,
      data.unit_price,
      total_amount,
      data.status,
      data.created_by,
      id,
    ]
  );

  return { ...result, total_amount };
};

const deleteOrder = async (id) => {
  const [result] = await db.execute('DELETE FROM orders WHERE id = ?', [id]);
  return result;
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
