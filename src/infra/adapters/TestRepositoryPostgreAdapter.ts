import Test from "../../entities/Test";
import Database from "../Database";
import TestRepository from "../repositories/TestRepository";

export default class TestRepositoryPostgreAdapter implements TestRepository {
  constructor(readonly db: Database) {}
  delete(id: string, data: Test): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(data: Test): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<Test> {
    const data = await this.db.query("SELECT * FROM test WHERE id = $1", [id]);
    return new Test(data.id, data.type);
  }

  async getByType(type: string): Promise<Test> {
    const data = await this.db.query("SELECT * FROM test WHERE type = $1", [type]);
    return new Test(data.id, data.type);
  }

  async save(data: Test): Promise<void> {
    await this.db.query("INSERT INTO test(id, type) VALUES($1, $2)", [
      data.getId(),
      data.getType(),
    ]);
  }
}
