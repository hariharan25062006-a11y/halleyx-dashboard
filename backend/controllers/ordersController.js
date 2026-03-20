const orderModel = require('../models/orderModel');

const REQUIRED_FIELDS = [
  'first_name', 'last_name', 'email', 'phone',
  'street_address', 'city', 'state', 'postal_code', 'country',
  'product', 'quantity', 'unit_price', 'created_by',
];

const validateFields = (data) => {
  const missing = REQUIRED_FIELDS.filter((f) => !data[f] && data[f] !== 0);
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  return null;
};

const getAll = async (req, res, next) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const order = await orderModel.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const error = validateFields(req.body);
    if (error) return res.status(400).json({ error });

    const result = await orderModel.createOrder(req.body);
    res.status(201).json({ message: 'Order created successfully', ...result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const error = validateFields(req.body);
    if (error) return res.status(400).json({ error });

    const existing = await orderModel.getOrderById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    const result = await orderModel.updateOrder(req.params.id, req.body);
    res.json({ message: 'Order updated successfully', total_amount: result.total_amount });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const existing = await orderModel.getOrderById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    await orderModel.deleteOrder(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
