import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Teams } from '../types/Teams';
import { Leaderboard } from '../types/Leaderboard';
import { BalanceEfficiency } from '../types/BalanceEfficiency';

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
    const teams = await this.teamsModel.homeLeaderboard('homeTeam');
    const leaderboards: Leaderboard[] = [];

    teams.forEach((team) => {
      const victories = team.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
      const draws = team.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
      const leaderboard: Leaderboard = {
        name: team[0].teamName,
        totalPoints: victories * 3 + draws,
        totalGames: team.length,
        totalVictories: victories,
        totalDraws: draws,
        totalLosses: team.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length,
        goalsFavor: team.reduce((acc, curr) => acc + (curr.homeTeamGoals), 0),
        goalsOwn: team.reduce((acc, curr) => acc + (curr.awayTeamGoals), 0),
      };
      leaderboards.push(leaderboard);
    });
    return leaderboards;
  }

  async homeBalanceEfficiency() {
    const leaderboards: BalanceEfficiency[] = [];
    const teamsMacthes = await this.homeLeaderboard();

    teamsMacthes.forEach((team) => {
      const balances = team.goalsFavor - team.goalsOwn;
      const efficiencies = (team.totalPoints / (team.totalGames * 3)) * 100;
      const leaderboard: BalanceEfficiency = {
        ...team,
        goalsBalance: balances,
        efficiency: `${efficiencies.toFixed(2)}%`,
      };
      console.log(leaderboard);

      leaderboards.push(leaderboard);
    });

    return leaderboards;
  }

  async awayLeaderboard(): Promise<Leaderboard[]> {
    const teams = await this.teamsModel.homeLeaderboard('awayTeam');
    const leaderboards: Leaderboard[] = [];

    teams.forEach((team) => {
      const victories = team.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
      const draws = team.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
      const leaderboard: Leaderboard = {
        name: team[0].teamName,
        totalPoints: victories * 3 + draws,
        totalGames: team.length,
        totalVictories: victories,
        totalDraws: draws,
        totalLosses: team.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length,
        goalsOwn: team.reduce((acc, curr) => acc + (curr.awayTeamGoals), 0),
        goalsFavor: team.reduce((acc, curr) => acc + (curr.homeTeamGoals), 0),
      };
      leaderboards.push(leaderboard);
    });
    return leaderboards;
  }
}
