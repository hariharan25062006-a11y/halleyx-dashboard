# Halleyx Dashboard Backend

The Backend architecture powers the core business logic, real-time data persistence, and RESTful API endpoints required by the Halleyx Dashboard ecosystem. It's built on a lightweight **Node.js** + **Express** server directly interfaced with a **MySQL 8.0** relational database.

## Folder Structure
```text
backend/
├── config/
│   └── db.js            # MySQL2 Database connection pool and configuration
├── controllers/
│   ├── dashboardController.js
│   └── ordersController.js
├── models/
│   ├── dashboardModel.js
│   └── orderModel.js
├── routes/
│   ├── dashboard.js
│   └── orders.js
├── .env.example         # Environment variable templates
└── server.js            # Express application entrypoint
```

## Running Locally
1. Ensure you have your local MySQL server running.
2. Initialize the backend workspace:
```bash
cp .env.example .env
npm install
npm run dev
```

## Environment Reference
See `.env.example` in this directory:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Standard MySQL credentials.
- `PORT`: Explicit app port (defaults to 5000).
- `FRONTEND_URL`: Safe CORS origin definition (e.g. `http://localhost:5173`).

## API Endpoints Reference

### Dashboard Config
- **`GET /api/dashboard`**
  - **Description:** Retrieves the saved `config_json` payload and global `date_filter` mapping.
  - **Response Example:** `{"config_json": [], "date_filter": "all"}`
- **`PUT /api/dashboard`**
  - **Description:** Bulk updates the layout configurations.
  - **Body Example:** `{"config_json": "[]", "date_filter": "last30"}`
  
### Customer Orders
- **`GET /api/orders`**
  - **Description:** Fetch the central collection of BSS orders.
- **`GET /api/orders/:id`**
  - **Description:** Fetch a discrete customer order by its internal Primary Key.
- **`POST /api/orders`**
  - **Description:** Create a new order. Triggers SQL computed columns for total pricing.
  - **Body Example:** `{"first_name": "Jane", "product": "Fiber Internet 1 Gbps", "quantity": 1, "unit_price": 40.0, "status": "Pending", "created_by": "System"}`
- **`PUT /api/orders/:id`**
  - **Description:** Update properties of an existing BSS order.
- **`DELETE /api/orders/:id`**
  - **Description:** Permanently destroy a specific order record.

## Error Handling
Centralized catch blocks process errors out to standard HTTP status codes (`400`, `404`, `500`) alongside raw debug responses parsed dynamically in standard `application/json` format (`{ "error": "Reason" }`), allowing the frontend layer to catch errors uniformly for Toast popups or inline fallback UI.
