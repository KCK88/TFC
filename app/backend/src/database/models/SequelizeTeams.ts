import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model<InferAttributes<Teams>,
InferCreationAttributes<Teams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'home_team_id' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'away_team_id' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'home_team_id' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'away_team_id' });

export default Teams;
