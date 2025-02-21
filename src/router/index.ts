import { Router } from "express";
import userRoute from "./userRouter"
import bookRoute from "./BookingRouter";

const router = Router();

 
router.use('/user',userRoute)
router.use('/booking',bookRoute )

export default router;