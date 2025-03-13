import { Pool } from "pg";
import { text } from "stream/consumers";


export const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST ,
    database:process.env.DATABASE,
    password:process.env.PASSWORD ,
    port:5432
})

export const query = ( text: string,params?: any[]) => {
    return pool.query(text,params)
}


