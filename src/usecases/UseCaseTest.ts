import TestRepository from "../infra/repositories/TestRepository";

export default class UseCaseTest {
  constructor(readonly testRepository: TestRepository) {}
  async execute(): Promise<void> {}
}
