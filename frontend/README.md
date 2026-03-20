# Halleyx Dashboard Frontend

The Frontend is an advanced, fully decoupled Client-Side Rendered (CSR) Single Page Application executing on **React 18** and **Vite**.

## Folder Structure
The architecture isolates specific application layers into unique boundaries inside `src/`.
```text
src/
├── api/             # HTTP clients and remote query bindings (Axios configurations)
├── components/      # UI components (Buttons, Selects, Inputs, Toasts) and Domain scopes (Orders, Dashboard Canvas)
├── constants/       # Predefined schema arrays, geographic listings, widget configuration typings
├── hooks/           # Isolated React context and customized effect hooks (useOrders, useDashboard)
├── pages/           # High-level route boundaries mapped against React Router
└── utils/           # Helper scripts (Date parsing, Array filtering, Formatters)
```

## Running Locally
```bash
cp .env.example .env
npm install
npm run dev
```

## Routing Ecosystem
- `/app/dashboard`: **Dashboard Page** - Final synthesized render of all combined widgets operating strictly read-only against API hooks.
- `/app/config`: **Dashboard Config Page** - Isolated Drag and Drop architectural environment for mutating array shapes and widget aesthetics.
- `/app/orders`: **Customer Orders Page** - Massive dual-pane data array management system for controlling CRUD routines on the backend.

## Key Components
- **`CanvasGrid.jsx`**: Manages the underlying React-Beautiful-DnD architecture for layout positioning.
- **`WidgetCard.jsx`**: Wrapper module parsing specific metric parameters before funneling them uniquely down into dynamic `Recharts` SVG generators.
- **`SettingsSidePanel.jsx`**: Provides an interactive suite of slider steppers, togglers, and mini footprint grids to live-alter a selected element's visualization parameters.
- **`OrderForm.jsx`**: Dense metadata collection form featuring strictly bound string validations explicitly for managing Sales / BSS records.

## Data Binding & Responsive Grids
All interactive canvas widgets map down into the exact same source array of `orders` fetched through `useOrders.js`. Filters (like global `dateFilter` selections) alter the parent data collection uniformly, allowing every live KPI and Rechart visualization parallelized re-rendering simultaneously. 

Layout structures seamlessly stack depending on standard CSS Grid viewport queries defined structurally through inline mathematically calculated column offsets ranging seamlessly along responsive `w-mob (4)`, `w-tab (8)`, and `w-desk (12)` intervals.

## Environment Variables
The application exclusively consumes `VITE_API_URL` to identify the appropriate remote target to route internal `/api/*` REST calls.
