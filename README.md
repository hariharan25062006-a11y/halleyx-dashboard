# Halleyx Custom Dashboard Builder
### Full Stack Engineer Challenge II — 2026

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## Overview
Halleyx Custom Dashboard Builder is a robust, full-stack application designed specifically for a telecom BSS (Business Support Systems) use case. It empowers users to create highly personalized, data-driven interfaces by combining intuitive layout configuration with real-time operational metrics. 

The core feature is an interactive, drag-and-drop dashboard canvas that reads data directly from a unified Customer Orders module. Users can curate their workspace without touching a line of code—simply dragging widgets from the sidebar, resizing their footprints on a responsive 12-column grid, and configuring specific data visualizations to meet their analytical needs in real-time.

There are 7 distinct widget types available out-of-the-box, including graphical Bar, Line, Area, Scatter, and Pie charts powered by Recharts, alongside comprehensive Data Tables and highly visible aggregated KPI Cards.

## Features

**Dashboard Builder**
- Drag and drop widgets from sidebar to canvas
- Mouse drag-to-resize widget dimensions
- Widget settings side panel with live preview
- Preview mode to see final dashboard
- Save and restore dashboard configuration
- 12-column responsive grid (Desktop / Tablet / Mobile)

**Widgets**
- KPI Card (Sum / Average / Count aggregations)
- Bar Chart, Line Chart, Area Chart, Scatter Plot (Recharts)
- Pie Chart with legend toggle
- Data Table with pagination, sort, column selector, filters

**Customer Orders**
- Full CRUD — Create, Edit, Delete orders
- Form validation with inline error messages
- Status tracking: Pending / In Progress / Completed
- Auto-generated Order IDs (ORD-001, ORD-002...)
- Auto-calculated Total Amount (Qty × Unit Price)

**Data & Filters**
- Date range filter: All Time / Today / Last 7 / 30 / 90 Days
- All widgets sync to selected date range
- Live data refresh button

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 |
| ORM/Query | MySQL2 |
| Environment | dotenv |

## Project Structure

```text
halleyx-dashboard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── constants/
        ├── hooks/
        ├── pages/
        └── utils/
```

## Prerequisites
- Node.js >= 18.x
- MySQL >= 8.0
- npm >= 9.x
- Git

## Getting Started

#### Step 1 — Clone the repository
```bash
git clone https://github.com/hariharan25062006-a11y/halleyx-dashboard.git
cd halleyx-dashboard
```

#### Step 2 — Database Setup
1. Open MySQL client
2. Run: `CREATE DATABASE halleyx_dashboard;`
3. `USE halleyx_dashboard;`
4. Run the schema from schema.sql (if exists) or paste the CREATE TABLE statements:

```sql
CREATE TABLE `customer_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `street_address` varchar(150) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `product` varchar(100) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `unit_price` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) GENERATED ALWAYS AS ((`quantity` * `unit_price`)) STORED,
  `status` enum('Pending','In Progress','Completed') DEFAULT 'Pending',
  `created_by` varchar(50) DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dashboard_config` (
  `id` int NOT NULL DEFAULT '1',
  `config_json` json NOT NULL,
  `date_filter` varchar(20) DEFAULT 'all',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

5. Seed data: paste the 6 INSERT statements for sample data.

#### Step 3 — Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
npm run dev
```

#### Step 4 — Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

#### Step 5 — Open the app
Frontend: http://localhost:5173
Backend API: http://localhost:5000

## Environment Variables

**backend/.env**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=halleyx_dashboard
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Get all customer orders |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create new order |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |
| GET | `/api/dashboard` | Get saved dashboard config |
| PUT | `/api/dashboard` | Save dashboard config |

## Widget Configuration Reference

| Widget Type | Default Width | Default Height | Key Settings |
|---|---|---|---|
| KPI Card | 3 | 2 | Sum, Average, Count aggregation selection |
| Bar Chart | 6 | 4 | X-Axis metric, Bar color themes, Tooltips |
| Line Chart | 6 | 4 | X/Y Axis mappings, Line tension, Grid lines |
| Area Chart | 6 | 4 | Data bindings, Fill opacity, Gradient toggles |
| Scatter Plot| 6 | 4 | Independent X/Y point mappings, Dot sizes |
| Pie Chart | 4 | 4 | Variable mappings, Donut width, Legend visibility |
| Data Table | 8 | 5 | Column sorting, Pagination limits |

## Responsive Breakpoints

| Device | Grid Columns | Breakpoint |
|---|---|---|
| Desktop | 12 columns | > 1024px |
| Tablet | 8 columns | 768px – 1024px |
| Mobile | 4 columns | < 768px |

## Screenshots
> Screenshots will be added after final deployment.

## Author
- Name: Hariharan
- GitHub: github.com/hariharan25062006-a11y
- Submission: Halleyx Full Stack Engineer Challenge II — 2026
