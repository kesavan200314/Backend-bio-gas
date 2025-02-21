import express, { Request, Response } from 'express';
import { pool } from '../database'; // Make sure your database connection is correct!
import {createBooking} from '../controller/BookingController'
import { auth } from '../utils/auth';

const bookRoute = express.Router();

 bookRoute.post('/create', auth, createBooking)


 export default bookRoute



