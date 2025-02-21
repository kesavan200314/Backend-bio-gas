import bcrypt from 'bcrypt'

export function hashPassword(password:string):Promise<string>{
    return bcrypt.hash(password,10)
}

export function comparePasswords(password:string, hashedPassword: string): Promise<boolean>{
    return bcrypt.compare(password,hashedPassword);
}

// booing content topic 
import { Request } from "express";

// Function to validate required fields for booking
export const validateBookingFields = (req: Request): boolean => {
    const { username, telephone_number, service_id, category_id, event_date, biogas_fitting, waste_product } = req.body;
    return username && telephone_number && service_id && category_id && event_date && biogas_fitting && waste_product !== undefined;
};

// Function to format event date to a specific format
export const formatDate = (date: string): string => {
    const eventDate = new Date(date);
    return `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
};


