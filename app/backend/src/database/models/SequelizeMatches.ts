import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Teams from './SequelizeTeams';
// import OtherModel from './OtherModel';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'home_team_id' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'away_team_id' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'home_team_id' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'away_team_id' });

export default Matches;
