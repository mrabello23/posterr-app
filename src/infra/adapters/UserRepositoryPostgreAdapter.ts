import User from "../../entities/User";
import Database from "../Database";
import UserRepository from "../repositories/UserRepository";

export default class UserRepositoryPostgreAdapter implements UserRepository {
  constructor(readonly db: Database) {}

  async getById(id: string): Promise<User> {
    const data = await this.db.query("SELECT * FROM user WHERE id = $1", [id]);
    return new User(data);
  }

  async getByUsername(username: string): Promise<User> {
    const data = await this.db.query("SELECT * FROM user WHERE username = $1", [username]);
    return new User(data);
  }
}
