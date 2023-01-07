import Test from "../../entities/Test";

export default interface TestRepository {
  getById(id: string): Promise<Test>;
  getByType(type: string): Promise<Test>;
  save(data: Test): Promise<void>;
  delete(id: string, data: Test): Promise<void>;
  update(data: Test): Promise<void>;
}
