import TestRepository from "../infra/repositories/UserRepository";

export default class UseCaseTest {
  constructor(readonly testRepository: TestRepository) {}
  async execute(): Promise<void> {}
}
