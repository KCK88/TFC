import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import validationToken from '../middlewares/tokenValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id',
  validationToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  validationToken,
  (req: Request, res: Response) => matchesController.endMatch(req, res),
);

router.post(
  '/',
  validationToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
