import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    return res.status(200).json(serviceResponse);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamsService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  async homeLeaderboard(_req: Request, res: Response) {
    const dbData = await this.teamsService.homeOrdered();
    return res.status(200).json(dbData);
  }

  async awayLeaderboard(_req: Request, res: Response) {
    const dbData = await this.teamsService.awayOrdered();
    return res.status(200).json(dbData);
  }

  async leaderboard(_req: Request, res: Response) {
    const dbData = await this.teamsService.leaderboard();
    return res.status(200).json(dbData);
  }
}
