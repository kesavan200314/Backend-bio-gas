import { Request,Response } from "express";
import { getUser, getUsersInfo, saveUser, UserEmailExists, UserNameExists} from "../repository/userRepository";
import { hash } from "crypto";
import { comparePasswords, hashPassword } from "../utils/utils";
import { generateToken } from "../utils/auth";

//Function to create a new user
export async function createUser(req:Request, res: Response) {
    const { username,email,password } = req.body;
    

    //check user name exists
    const isuserNameExists = await UserNameExists(username);

    //if user name exists return 400
    if(isuserNameExists) {
        res.status(400).send(" name already exists");
        return;
    }

    //check  email exists
    const isuserEmailExists = await UserEmailExists(email);

    //if  email exists return 400
    if(isuserEmailExists) {
        res.status(400).send("email already exists")
        return;
    }

    //hash password
    const hashedPassword = await hashPassword(password)

    //save user to database 
    console.log(username, email, password)
    const savedUser = await saveUser(username,email,hashedPassword);
    res.status(201).send(savedUser)

}

//User Interface
interface User{
    user_id:number;
    username: string;
    email: string;
    password: string;
}

//login page

export async function signinuser(req:Request,res:Response){
    const {email:resEmail,password} = req.body;

    //get user from database
    const user:User = await getUser(resEmail);

    //if user not found return 400
    if(!user){
        res.status(400).send("User not Found");
        return;
    }
 
    //compare password
    const isPasswordCorrect = await comparePasswords(password,user.password);
    

    //if password is not correct return 400
    if(!isPasswordCorrect) {
        res.status(400).send("Password is incorrect");
        return;
    }

    //if password is correct return token
    const token= generateToken(user);
    
    // Set the token in a cookie
    res.cookie('token', token, {
        httpOnly: true, 
        sameSite: 'strict', 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    });

    const { user_id,username,email}= user;
    
    res.status(200).send({user:{user_id,username,email},token:token});
}

// Function to get user details
export async function getUsers(req: Request, res: Response) {
    const users = await getUsersInfo();
    res.status(200).send(users.rows);
}

