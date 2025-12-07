import { pool } from "../../config/database";

interface BookingPayload {
   customer_id: number;
   vehicle_id: number;
   rent_start_date: string;
   rent_end_date: string;
}

interface UserPayload {
   id: number;
   role: string;
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

   const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

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

const getAllBookings = async (user: UserPayload) => {
   const { id, role } = user;

   let query = "";
   let params: any[] = [];

   if (role === "admin") {
      query = `
         SELECT 
            bookings.id,
            bookings.customer_id,
            bookings.vehicle_id,
            bookings.rent_start_date,
            bookings.rent_end_date,
            bookings.total_price,
            bookings.status,
            json_build_object(
               'name', customer.name,
               'email', customer.email
            ) as customer,

            json_build_object(
               'vehicle_name', vehicle.vehicle_name,
               'registration_number', vehicle.registration_number
            ) as vehicle

         FROM bookings
         JOIN users customer ON bookings.customer_id = customer.id
         JOIN vehicles vehicle ON bookings.vehicle_id = vehicle.id
      `;
   } else {
      query = `
         SELECT 
            bookings.id,
            bookings.vehicle_id,
            bookings.rent_start_date,
            bookings.rent_end_date,
            bookings.total_price,
            bookings.status,
            json_build_object(
               'vehicle_name', vehicle.vehicle_name,
               'registration_number', vehicle.registration_number,
               'type', vehicle.type
            ) as vehicle

         FROM bookings
         JOIN vehicles vehicle ON bookings.vehicle_id = vehicle.id
         WHERE bookings.customer_id = $1
      `;
      params = [id];
   }

   const result = await pool.query(query, params);
   return result;
};

export const bookingServices = {
   createBooking,
   getAllBookings,
};
