import { Router } from "express";
import { createUser, getUsers, signinuser } from "../controller/userController";

const router=Router();

router.post('/register',createUser);
router.post('/login',signinuser);
router.get('/', getUsers)

export default router;  