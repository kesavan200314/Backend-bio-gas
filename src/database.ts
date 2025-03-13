import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config();

export const pool=new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST ,
    database: process.env.DATABASE,
    password: process.env.PASSWORD ,
    port: parseInt(String(process.env.PORT))
})

export const query = ( text: string,params?: any[]) => {
    return pool.query(text,params)
}
