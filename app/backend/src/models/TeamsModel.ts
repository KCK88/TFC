import { Teams } from '../types/Teams';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import Matches from '../database/models/SequelizeMatches';
import { TeamMatches } from '../types/TeamMatches';
// import { TeamMatches } from '../types/TeamMatches';

export default class TeamsModel implements ITeamsModel {
  async homeLeaderboard(): Promise<Map<number, TeamMatches[]>> {
    const dict = new Map<number, TeamMatches[]>();
    const dbData = await this.model
      .findAll({ raw: true, include: [{ model: Matches, as: 'homeTeam' }] });
    const dbMap = dbData.map((item: any) => ({
      id: item.id,
      teamName: item.teamName,
      homeTeamId: item['homeTeam.homeTeamId'],
      homeTeamGoals: item['homeTeam.homeTeamGoals'],
      awayTeamId: item['homeTeam.awayTeamId'],
      awayTeamGoals: item['homeTeam.awayTeamGoals'],
      inProgress: item['homeTeam.inProgress'],
    } as TeamMatches));
    dbMap.forEach((il) => {
      const value = dict.get(il.id) ?? [];
      value.push(il);
      dict.set(il.id, value);
    });

    return dict;
  }

  async findAll(): Promise<Teams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: Teams['id']): Promise<Teams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: Teams = dbData;
    return { id, teamName };
  }

  private model = SequelizeTeams;
}
