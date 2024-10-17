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
        efficiency: `${efficiencies.toFixed(2)}`,
      };
      leaderboards.push(leaderboard);
    });

    return leaderboards;
  }

  async homeOrdered() {
    const leaderboard = await this.homeBalanceEfficiency();

    leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return leaderboard;
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
        goalsOwn: team.reduce((acc, curr) => acc + (curr.homeTeamGoals), 0),
        goalsFavor: team.reduce((acc, curr) => acc + (curr.awayTeamGoals), 0),
      };
      leaderboards.push(leaderboard);
    });
    return leaderboards;
  }

  async awayBalanceEfficiency() {
    const leaderboards: BalanceEfficiency[] = [];
    const teamsMacthes = await this.awayLeaderboard();

    teamsMacthes.forEach((team) => {
      const balance = team.goalsFavor - team.goalsOwn;
      const efficiencies = (team.totalPoints / (team.totalGames * 3)) * 100;
      const leaderboard: BalanceEfficiency = {
        ...team,
        goalsBalance: balance,
        efficiency: `${efficiencies.toFixed(2)}`,
      };
      leaderboards.push(leaderboard);
    });

    return leaderboards;
  }

  async awayOrdered() {
    const leaderboard = await this.awayBalanceEfficiency();

    TeamsService.order(leaderboard);
    return leaderboard;
  }

  private static order(leaderboard: BalanceEfficiency[]) {
    leaderboard.sort((x, y) => {
      if (y.totalPoints !== x.totalPoints) {
        return y.totalPoints - x.totalPoints;
      }
      if (y.totalVictories !== x.totalVictories) {
        return y.totalVictories - x.totalVictories;
      }
      if (y.goalsBalance !== x.goalsBalance) {
        return y.goalsBalance - x.goalsBalance;
      }
      return y.goalsFavor - x.goalsFavor;
    });
    return leaderboard;
  }

  async leaderboard() {
    const [awayLeaderboard, homeLeaderboard] = [await this.awayOrdered(), await this.homeOrdered()];

    const leaderboard = homeLeaderboard.map((home) => {
      const ar = awayLeaderboard.find((away) => away.name === home.name);

      return ar === undefined ? null : {
        name: home.name,
        totalPoints: ar.totalPoints + home.totalPoints,
        totalGames: ar.totalGames + home.totalGames,
        totalVictories: ar.totalVictories + home.totalVictories,
        totalDraws: ar.totalDraws + home.totalDraws,
        totalLosses: ar.totalLosses + home.totalLosses,
        goalsOwn: ar.goalsOwn + home.goalsOwn,
        goalsFavor: ar.goalsFavor + home.goalsFavor,
        goalsBalance: (ar.goalsFavor + home.goalsFavor) - (ar.goalsOwn + home.goalsOwn),
        efficiency: `${(((ar.totalPoints + home.totalPoints)
          / ((ar.totalGames + home.totalGames) * 3)) * 100).toFixed(2)}`,
      };
    });
    return TeamsService.order(leaderboard as BalanceEfficiency[]);
  }
}
