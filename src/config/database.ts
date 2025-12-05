import { Pool } from "pg";
import config from ".";

// DB
export const pool = new Pool({
   connectionString: `${config.connection_str}`,
});

const initDB = async () => {
   // Users Table
   await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
         password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
         phone TEXT NOT NULL,
         role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
      );
   `);

   // Vehicles Table
   await pool.query(`
         CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name TEXT NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(20) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
         )
      `);

   // Bookings Table
   await pool.query(`
         CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price INT NOT NULL CHECK (total_price > 0),
            status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
         )
      
      `);
};

export default initDB;
