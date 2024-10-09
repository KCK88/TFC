import { DataTypes, Model, QueryInterface } from "sequelize";
import { Users } from "../../types/Users";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Users>>('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },
  
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  }
};