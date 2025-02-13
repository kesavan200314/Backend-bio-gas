import { Router } from "express";
import { createUser, signinuser } from "../controller/userController";

const router=Router();

router.post('/register',createUser);
router.post('/login',signinuser);



export default router;