const mysql = require('mysql2/promise');
require('dotenv').config();

const mockOrders = [
  {
    order_id: 'ORD-001',
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice@example.com',
    phone: '+1 (555) 123-4567',
    street_address: '123 Tech Lane',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94105',
    country: 'United States',
    product: 'Fiber Internet 1 Gbps',
    quantity: 1,
    unit_price: 120.00,
    total_amount: 120.00,
    status: 'Completed',
    created_by: 'demo@gmail.com'
  },
  {
    order_id: 'ORD-002',
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob@example.com',
    phone: '+1 (555) 987-6543',
    street_address: '456 Startup Blvd',
    city: 'Austin',
    state: 'TX',
    postal_code: '78701',
    country: 'United States',
    product: 'Cloud PBX Pro',
    quantity: 2,
    unit_price: 200.00,
    total_amount: 400.00,
    status: 'In Progress',
    created_by: 'demo@gmail.com'
  },
  {
    order_id: 'ORD-003',
    first_name: 'Carol',
    last_name: 'Williams',
    email: 'carol@example.com',
    phone: '+44 20 7946 0958',
    street_address: '789 Enterprise Way',
    city: 'London',
    state: 'Greater London',
    postal_code: 'E1 6AN',
    country: 'United Kingdom',
    product: 'IoT Connectivity Bundle',
    quantity: 5,
    unit_price: 30.00,
    total_amount: 150.00,
    status: 'Pending',
    created_by: 'demo@gmail.com'
  }
];

async function seedOrders() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    for (const order of mockOrders) {
      const query = `
        INSERT IGNORE INTO orders 
        (order_id, first_name, last_name, email, phone, street_address, city, state, postal_code, country, product, quantity, unit_price, total_amount, status, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        order.order_id, order.first_name, order.last_name, order.email, order.phone,
        order.street_address, order.city, order.state, order.postal_code, order.country,
        order.product, order.quantity, order.unit_price, order.total_amount, order.status, order.created_by
      ];
      await connection.execute(query, values);
    }
    console.log('Successfully seeded 3 orders for the demo account!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    if (connection) await connection.end();
  }
}

seedOrders();
