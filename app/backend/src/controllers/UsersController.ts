import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { verifyToken } from '../utils/jwt.util';

export default class UsersController {
  constructor(private userService = new UsersService()) {}

  async findByEmail(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.findByEmail(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res
        .status(mapStatusHTTP(serviceResponse.status))
        .json({ message: serviceResponse.errorMessage });
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json({ token: serviceResponse.token });
  }

  async findRoleByEmail(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = authorization.split(' ')[1];

    const { email, password } = verifyToken(token);
    const user = await this.userService.findUserByEmail(email, password);

    return user === null ? res.status(404).send() : res.status(200).json({ role: user.role });
  }
}
