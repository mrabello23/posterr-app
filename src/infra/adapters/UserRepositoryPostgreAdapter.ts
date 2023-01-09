import Database from "../Database";
import User from "../../entities/User";
import UserRepository from "../repositories/UserRepository";

export default class UserRepositoryPostgreAdapter implements UserRepository {
  constructor(readonly db: Database) {}

  async getById(id: string): Promise<User> {
    let data = await this.db.query("SELECT * FROM public.user WHERE id = $1", [id]);
    console.log(data);

    if (data.length > 0) [data] = data;
    return new User(data);
  }

  async getByUsername(username: string): Promise<User> {
    let data = await this.db.query("SELECT * FROM public.user WHERE username = $1", [username]);
    console.log(data);

    if (data.length > 0) [data] = data;
    return new User(data);
  }
}
