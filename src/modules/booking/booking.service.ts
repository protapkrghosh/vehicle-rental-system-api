import { pool } from "../../config/database";

interface BookingPayload {
   customer_id: number;
   vehicle_id: number;
   rent_start_date: string;
   rent_end_date: string;
}

const createBooking = async (payload: BookingPayload) => {
   const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

   const checkCustomer = await pool.query(
      "SELECT id FROM users WHERE id = $1",
      [customer_id]
   );

   if (checkCustomer.rows.length === 0) {
      throw new Error("Customer not found");
   }

   const checkVehicle = await pool.query(
      "SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1",
      [vehicle_id]
   );

   if (checkVehicle.rows.length === 0) {
      throw new Error("Vehicle not found");
   }

   const vehicle = checkVehicle.rows[0];
   if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available for booking");
   }

   const startDate = new Date(rent_start_date).getTime();
   const endDate = new Date(rent_end_date).getTime();

   console.log(startDate, endDate);

   if (isNaN(startDate) || isNaN(endDate)) {
      throw new Error("Invalid date format");
   }

   if (endDate <= startDate) {
      throw new Error("End date must be after start date");
   }

   const days = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
   );

   const total_price = vehicle.daily_rent_price * days;

   const bookingResult = await pool.query(
      `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
       VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
         customer_id,
         vehicle_id,
         rent_start_date,
         rent_end_date,
         total_price,
         "active",
      ]
   );

   await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
      ["booked", vehicle_id]
   );
   const booking = bookingResult.rows[0];

   const result = {
      id: booking.id,
      customer_id: booking.customer_id,
      vehicle_id: booking.vehicle_id,
      rent_start_date: booking.rent_start_date,
      rent_end_date: booking.rent_end_date,
      total_price: booking.total_price,
      status: booking.status,
      vehicle: {
         vehicle_name: vehicle.vehicle_name,
         daily_rent_price: vehicle.daily_rent_price,
      },
   };

   return result;
};

export const bookingServices = {
   createBooking,
};
