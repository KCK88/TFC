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
  async findAllMatches(): Promise<Matches[]> {
    const dbData = await this.model.findAll({
      include,
    });
    console.log(dbData.length);

    return dbData;
  }

  async findAllMatchesInProgres(inProgress: boolean): Promise<Matches[]> {
    const dbData = await this.model.findAll({
      include,
      where: { inProgress },
    });
    console.log(dbData.length);
    return dbData;
  }

  private model = SequelizeMatches;
}
