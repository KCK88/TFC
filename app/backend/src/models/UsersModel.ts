import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import { Users } from '../types/Users';

export default class UsersModel implements IUsersModel {
  async findByEmail(email: Users['email'], password: Users['password']): Promise<Users | null> {
    const dbData = await this.model.findOne({ raw: true, where: { email, password } });
    return dbData;
  }

  private model = SequelizeUsers;
}
