import * as express from 'express';
import 'express-async-errors';

import errorMiddleware from './middlewares/errorMiddleware';
import teamRouter from './routes/teams.routes';
import userRouter from './routes/users.router';
import matchesRouter from './routes/matches.router';
import leaderboardRouter from './routes/leaderboard.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private routes(): void {
    this.app.use('/teams', teamRouter);
    this.app.use('/login', userRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela!!!
export const { app } = new App();
