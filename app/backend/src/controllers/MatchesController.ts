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
    await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Match updated.' });
  }

  async createMatch(req: Request, res: Response) {
    const match = req.body;
    if (match.awayTeamId === match.homeTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    try {
      const newMatch = await this.matchesService.createMatch(match);
      return res.status(201).json(newMatch);
    } catch (error) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
}
