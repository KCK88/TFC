import { Teams } from '../types/Teams';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import Matches from '../database/models/SequelizeMatches';

export default class TeamsModel implements ITeamsModel {
  async homeLeaderboard(): Promise<Teams[]> {
    const dbData = await this
      .model
      .findAll({ include: [{ model: Matches, as: 'homeTeam' }] });
    return dbData;
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
