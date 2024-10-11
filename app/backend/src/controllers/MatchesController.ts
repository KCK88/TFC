import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const q = req.query.inProgress as unknown as string | undefined;
    let serviceResponse;
    if (q !== undefined) {
      serviceResponse = await this.matchesService.findAllMatchesInProgres(q);
    } else {
      serviceResponse = await this.matchesService.getAllMatches();
    }
    return res.status(200).json(serviceResponse);
  }

  public async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.matchUpdate(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).send();
  }
}
