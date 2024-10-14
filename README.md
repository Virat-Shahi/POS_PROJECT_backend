# EVEREST POS System Backend

This is the backend for the EVEREST Point of Sale (POS) System. It provides API endpoints for managing restaurant operations including user authentication, table management, menu management, order processing, payment handling, and category management.

## API Endpoints

### Authentication

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `auth/register` | POST | Register a new user | `{ "email": "user@example.com", "password": "password123" }` |
| `auth/login` | POST | Authenticate a user and receive a token | `{ "email": "user@example.com", "password": "password123" }` |

### Table Management

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `/tables` | GET | Retrieve a list of all tables | N/A |
| `/tables/:tablesId` | GET | Get details of a specific table | N/A |
| `tables/:tablesId` | PUT | Update the status of a table (e.g., mark as occupied or free) | `{ "isOccupied": true }` |

### Menu Management

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `/menu-items` | GET | Retrieve a list of all menu items | N/A |
| `/menu-items` | POST | Add a new item to the menu | `{ "name": "Burger", "description": "Juicy beef burger", "price": 9.99, "categoryId": 1 }` |
| `/menu-items/:menu-itemsId` | PUT | Update details of a menu item | `{ "name": "Cheeseburger", "price": 10.99 }` |
| `/menu-items/:menu-itemsid` | DELETE | Remove a menu item | N/A |

### Order Processing

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `/orders` | POST | Create a new order | `{ "tableId": 1, "items": [{ "menuItemId": 1, "quantity": 2 }] }` |
| `/orders` | GET | Retrieve a list of all orders | N/A |
| `/orders/:ordersid` | GET | Get details of a specific order | N/A |
| `/orders/:ordersid` | PUT | Update an existing order (e.g., add/remove items) | `{ "items": [{ "menuItemId": 1, "quantity": 3 }, { "menuItemId": 2, "quantity": 1 }] }` |
| `/orders/:ordersid` | DELETE | Cancel an order | N/A |

### Payment Processing

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `/payments` | POST | Process payment for an order | `{ "orderId": 1, "amount": 29.99, "method": "CASH" }` |

### Category Management

| Path | Method | Description | Body Example |
|------|--------|-------------|--------------|
| `/categories` | GET | Retrieve all categories | N/A |
| `/categories` | POST | Create a new category | `{ "name": "Appetizers", "description": "Starters and small plates" }` |
| `/categories/:categoryId` | GET | Get details of a specific category | N/A |
| `/categories/:categoryId` | PUT | Update a category | `{ "name": "Main Courses", "description": "Primary dishes" }` |
| `/categories/:categoryId` | DELETE | Delete a category | N/A |

## Setup and Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your MySQL database and update the connection string in the `.env` file
4. Run `npx prisma migrate dev` to set up the database schema
5. Start the server with `npm start`

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- MySQL

For more detailed information about each endpoint, please refer to the controller files in the project.