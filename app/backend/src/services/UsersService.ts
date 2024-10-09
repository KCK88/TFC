import { compareSync } from 'bcryptjs';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import UsersModel from '../models/UsersModel';
import { Users } from '../types/Users';
import { PayloadObject, create } from '../utils/jwt.util';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email: string) => emailRegex.test(email);

export default class UsersService {
  constructor(private usersModel : IUsersModel = new UsersModel()) { }

  async findByEmail(email: Users['email'], password: Users['password']) {
    const user = await this.usersModel.findByEmail(email);

    if (user === null || !isValidEmail(email) || email !== user.email) {
      return { status: 'UNAUTHORIZED ', errorMessage: 'Invalid email or password', token: null };
    }
    if (password.length < 6 || !compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED ', errorMessage: 'Invalid email or password', token: null };
    }
    const playload: PayloadObject = {
      email,
      password,
    };
    const token = create(playload);
    return { status: 'SUCCESSFUL', errorMessage: null, token };
  }

  async findUserByEmail(email: Users['email']) {
    const user = await this.usersModel.findByEmail(email);
    return user;
  }
}
