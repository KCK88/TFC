import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Teams } from '../types/Teams';
import { Leaderboard } from '../types/Leaderboard';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<Teams[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async getTeamById(id: number): Promise<ServiceResponse<Teams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }

  async homeLeaderboard(): Promise<Leaderboard[]> {
    const teams = await this.teamsModel.homeLeaderboard();
    const leaderboards: Leaderboard[] = [];

    teams.forEach((matches) => {
      const leaderboard: Leaderboard = {
        goalsFavor: matches.reduce((acc, curr) => acc + (curr.homeTeamGoals ?? 0), 0),
        goalsOwn: 0,
        name: matches[0].teamName,
        totalDraws: 0,
        totalGames: 0,
        totalLosses: 0,
        totalPoints: 0,
        totalVictories: 0,
      };
      leaderboards.push(leaderboard);
    });
    return leaderboards;
  }
}
