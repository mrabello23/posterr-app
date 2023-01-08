import User from "../../entities/User";

export default interface UserRepository {
  getById(id: string): Promise<User>;
  getByUsername(username: string): Promise<User>;
}
