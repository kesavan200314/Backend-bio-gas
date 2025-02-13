import { query } from "../database";

export const UserNameExists = async (username: string) => {
    const { rows } = await query ("SELECT Username FROM public.User u where u.username = $1", [username]);
    return rows.length >0;
}

export const UserEmailExists = async (email:string) => {
    const { rows } = await query ("SELECT email From public.User u where u.email = $1", [email])
   return rows.length >0
}

export const saveUser = async (username: string, email: string, password: string) => {
    const { rows } = await query ("INSERT INTO public.User ( email, password) VALUES ($1, $2, $3) RETURNING User, Username, email", [username, email, password]);
    return rows[0];
}

export const getUser =  async (username:string) => {
    const { rows } = await query("SELECT * FROM public.User u where u.username = $1",[username]);
    return rows[0];
}

export const getUsersInfo = async () => {
    const users = await query ("SELECT * FROM public.User");
    return users;
};