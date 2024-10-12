import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Teams } from '../types/Teams';

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

  async homeLeaderboard() {
    const teams = await this.teamsModel.homeLeaderboard();
    const Leaderboard = teams.map((team) => (
      {
        name: team.teamName,
        totalPoints: team.team?.filter((points) => points.homeTeamGoals > points.awayTeamGoals),
        totalGames: team.team?.length,
        totalVictories: team.team?.filter((p) => p.homeTeamGoals > p.awayTeamGoals).length,
        totalDraws: team.team?.filter((p) => p.homeTeamGoals === p.awayTeamGoals).length,
        totalLosses: team.team?.filter((p) => p.homeTeamGoals < p.awayTeamGoals).length,
        goalsFavor: team.team?.forEach((goals) => goals.homeTeamGoals),
        goalsOwn: team.team?.forEach((goals) => goals.awayTeamGoals),
      }
    ));
    console.log(Leaderboard);

    return Leaderboard;
  }
}
