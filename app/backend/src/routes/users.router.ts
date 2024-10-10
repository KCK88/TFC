import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import loginValidation from '../middlewares/loginValidation';
import validationToken from '../middlewares/tokenValidation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  loginValidation,
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);
router.get(
  '/role',
  validationToken,
  (req: Request, res: Response) => usersController.findRoleByEmail(req, res),
);

export default router;
