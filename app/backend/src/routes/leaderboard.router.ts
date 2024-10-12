import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/home', (req: Request, res: Response) => teamsController.leaderboard(req, res));

export default router;
