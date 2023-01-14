import UserRepository from "../infra/repositories/UserRepository";
import MakePostUseCase from "../usecases/MakePostUseCase";

export default class PostController {
  constructor(
    private readonly makePost: MakePostUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  async doPost(): Promise<void> {
    console.log("PostController.doPost");
  }

  async doRepost(): Promise<void> {
    console.log("PostController.doRepost");
  }

  async doQuotePost(): Promise<void> {
    console.log("PostController.doQuotePost");
  }
}
