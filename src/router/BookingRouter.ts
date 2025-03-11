import { Router } from "express";
import {createBooking, getAllBookings} from '../controller/BookingController'
import { auth } from '../utils/auth';

const router = Router();

router.get ('/', getAllBookings);
router.post('/create', auth, createBooking);

export default router;     
