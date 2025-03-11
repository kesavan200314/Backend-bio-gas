import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const SECRET_KEY: Secret = 'secretkey';

export interface CustomRequest extends Request {
  token: {
    _id: string;
    name: string
  };
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log("Cookies received:", req.cookies); // ✅ Log cookies

    const token = req.cookies?.token;
    if (!token) {
      console.log("No token found in cookies");
      res.status(401).send('Not authenticated');
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { _id: string; name: string; iat: number; exp: number };
    (req as CustomRequest).token = decoded;

    console.log("Decoded Token:", decoded); // ✅ Log token
    next(); // Move to the next middleware
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(401).send('Please authenticate');
  }
};
 
export function generateToken(user: any): string {
    const token = jwt.sign({ _id: user.id?.toString(), name: user.username }, SECRET_KEY, {
        expiresIn: '2 days',
      });
  
        return token;
}
