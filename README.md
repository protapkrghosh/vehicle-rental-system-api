# 🚗 Vehicle Rental Management System (Backend)

A complete backend API for managing vehicles, bookings, users, and role-based access control. Built with Node.js, Express, TypeScript, PostgreSQL, and JWT Authentication. This project implements a fully functional vehicle rental system with automated booking management, real-time vehicle availability tracking, and comprehensive security features. Features secure user authentication, role-based access control for admins and customers, and intelligent booking logic with automatic price calculation.

---

## 🌐 Live Deployment

🔗 **Live URL:** https://vehicle-rental-system-api-one.vercel.app

---

## ✨ Features

### 👤 User Management
- User registration & login
- JWT-based authentication
- Role-based access (admin, customer)
- Admin can manage all users

### 🚗 Vehicle Management
- Add, update & delete vehicles (Admin only)
- Vehicles have type, rent price, status, registration number (unique)
- Availability tracking: available / booked

### 📅 Booking System
- Customers can book vehicles
- Validates availability
- Calculates total price
- Updates vehicle status automatically
- Customer can cancel before start date
- Admin can mark booking as returned
- System logic prevents invalid actions

### 🔒 Security
- Encrypted passwords
- Protected routes using JWT
- Role-based middleware for authorization

---

## ⚙️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JWT, bcrypt.js |
| ORM / Querying | pg (node-postgres) |
| Deployment | Vercel |

---

## 📝 Setup & Usage Instructions

### Prerequisites
```
✓ Node.js v14 or higher
✓ PostgreSQL v12 or higher
✓ npm or yarn
```

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
```
PORT=5000
JWT_SECRET="b6861d9f4dfe4658adafc8046f7df952fh531e4b0411373c86858d1ed78504e3"
CONNECTION_STR=postgresql://username:password@localhost:5432/vehicle_rental_system
```

### Step 4: Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```
🎉 **Server running on:** `http://localhost:5000`

<br/>

---
## 📚 API Endpoints

### Authentication
```
POST   /api/v1/auth/signup           - Register new user
POST   /api/v1/auth/signin           - Login user (receive JWT token)
```

### Users
```
GET    /api/v1/users                 - View all users (Admin only)
PUT    /api/v1/users/:userId         - Update user (Admin/Owner)
DELETE /api/v1/users/:userId         - Delete user (Admin only)
```

### Vehicles
```
POST   /api/v1/vehicles              - Create vehicle (Admin only)
GET    /api/v1/vehicles              - View all vehicles
GET    /api/v1/vehicles/:vehicleId   - View specific vehicle details
PUT    /api/v1/vehicles/:vehicleId   - Update vehicle (Admin only)
DELETE /api/v1/vehicles/:vehicleId   - Delete vehicle (Admin only)
```

### Bookings
```
POST   /api/v1/bookings              - Create booking (Admin or Customer)
GET    /api/v1/bookings              - View bookings (role-based)
PUT    /api/v1/bookings/:bookingId   - Update booking status (role-based)
```

**Made with ❤️ by [Protap Ghosh](https://github.com/protapkrghosh)**