import { Pool } from "pg";
import { text } from "stream/consumers";


export const pool=new Pool({
    user:"postgres",
    host: "localhost",
    database:"postgres",
    password: "root0",
    port:5432
})

export const query = ( text: string,params?: any[]) => {
    return pool.query(text,params)
}


