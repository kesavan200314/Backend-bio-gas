import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'secretkey';

export interface CustomRequest extends Request {
  token: {
    _id: string;
    name: string
  };
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Not authenticated');
    return;
  }

   const decoded = jwt.verify(token, SECRET_KEY) as { _id: string; name: string; iat: number; exp: number; };
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};

export function generateToken(user: any): string {
    const token = jwt.sign({ _id: user.id?.toString(), name: user.username }, SECRET_KEY, {
        expiresIn: '2 days',
      });
  
        return token;
}
