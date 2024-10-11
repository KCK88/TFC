import { FindAttributeOptions } from 'sequelize';
import { Matches } from '../types/Matches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import Teams from '../database/models/SequelizeTeams';

const include = [{ model: Teams,
  as: 'homeTeam',
  attributes: { exclude: 'id' } as unknown as FindAttributeOptions | undefined,
},
{ model: Teams,
  as: 'awayTeam',
  attributes: { exclude: 'id' } as unknown as FindAttributeOptions | undefined },
];

export default class MatchesModel implements IMatchesModel {
  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      {
        where: {
          id,
        },
      },
    );
  }

  public async endMatch(id: number): Promise<Matches> {
    const update = await this.model.update(
      { inProgress: false },
      {
        where: {
          id,
        },
      },
    );
    return update as unknown as Matches;
  }

  public async findAllMatches(): Promise<Matches[]> {
    const dbData = await this.model.findAll({
      include,
    });
    return dbData;
  }

  public async findAllMatchesInProgres(inProgress: boolean): Promise<Matches[]> {
    const dbData = await this.model.findAll({
      include,
      where: { inProgress },
    });
    return dbData;
  }

  private model = SequelizeMatches;
}
