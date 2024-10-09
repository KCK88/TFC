import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export default function validationToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (!verifyToken(authorization.split(' ')[1])) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
