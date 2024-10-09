import { Users } from '../../types/Users';

export interface IUsersModel {
  findByEmail(email: Users['email'], password: Users['password']): Promise<Users | null>
  // findAll(): Promise<Users[]>,
  // findById(id: Users['id']): Promise<Users | null>
}
