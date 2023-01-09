import { Feed, GetPostRequestData } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";

export default class GetPostUseCase {
  constructor(readonly postRepository: PostRepository) {}

  async execute(data: GetPostRequestData): Promise<Feed> {
    console.log("GetPostUseCase.execute", data);
    throw new Error("not implemented.");
  }
}
