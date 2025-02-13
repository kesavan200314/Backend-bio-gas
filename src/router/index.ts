import { Router } from "express";
import userRoute from "./userRouter"

const router = Router();
 
router.use('/user',userRoute)

export default router;