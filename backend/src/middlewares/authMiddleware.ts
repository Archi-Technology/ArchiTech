import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any  => {
  if(req.originalUrl.includes('api/auth') || req.originalUrl.includes('api/user/create')|| req.originalUrl.includes('/create/ai') || req.originalUrl.includes('/uploads')) {
    return next();
  } 
  const token = req.headers['authorization']?.split(' ')[1] ;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const userData = jwt.verify(token, config.JWT_SECRET) as {userId: string};
    (req as Express.Request & { user?: {userId: string} }).user = userData;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
