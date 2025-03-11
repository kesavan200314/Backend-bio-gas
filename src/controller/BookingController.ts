import { console } from "inspector";
import { pool } from "../database";
import { Request,Response } from "express";
import { CustomRequest } from "../utils/auth";

export const getAllBookings = async (req: Request, res: Response) => {
    console.log("jbdnjaskbd")
    try {
        const result = await pool.query('SELECT * FROM public."Booking"'); // Your SQL query to fetch bookings
        res.status(200).json(result.rows);  // Responding with bookings data
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Sending error response with status 500
    }
};

// // 3. Create a New Booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        console.log("Inside booking/....");

        const customReq = req as CustomRequest;

        if (!customReq.token) {
            console.log("Token is missing in request");
            res.status(401).send("Authentication required");
            return
        }

        const { number, product, product_name } = req.body;
        const user_name = customReq.token.name;

        console.log(`User Name: ${user_name}`); // ✅ Debugging

        const result = await pool.query(
            'INSERT INTO public."Booking" (name, number, product, product_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_name, number, product, product_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log("Comes HERE:", err);
        res.status(500).send(err);
        return;
    }
};


// 4. Edit a Booking
const editBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, phone_number, product, product_name } = req.body;

    try {
        const result = await pool.query(
            'UPDATE bookings SET name = $1, phone_number = $2, product = $3, product_name = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, phone_number, product, product_name, id] // Passing id at position 5
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {

        res.status(500).send('Server Error');
    }
};


// 5. Delete a Booking
const deleteBooking = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.json({ msg: 'Booking deleted successfully' });
    } 
    catch (err) {

        res.status(500).send('Server Error');
    }
};




