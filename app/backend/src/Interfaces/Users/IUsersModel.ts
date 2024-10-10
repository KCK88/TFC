import { Users } from '../../types/Users';

export interface IUsersModel {
  findByEmail(email: Users['email']): Promise<Users | null>
}
