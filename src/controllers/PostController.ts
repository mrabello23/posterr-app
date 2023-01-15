import { Feed, GetPostFeedRequestData, PostType } from "../entities/Post";
import PostRepository from "../infra/repositories/PostRepository";
import QuoteRepository from "../infra/repositories/QuoteRepository";
import CreatePostUseCase from "../usecases/CreatePostUseCase";
import GetPostFeedUseCase from "../usecases/GetPostFeedUseCase";

export default class PostController {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async doPost(data: { userId: string; text: string }): Promise<void> {
    console.log("PostController.doPost");
    const { userId, text } = data;

    const createPostUseCase = new CreatePostUseCase(this.postRepository, this.quoteRepository);
    await createPostUseCase.execute({ text, userId, type: PostType.POST });
  }

  async doRepost(data: { userId: string; text: string; postId: string }): Promise<void> {
    console.log("PostController.doRepost");
    const { userId, text, postId } = data;

    const createPostUseCase = new CreatePostUseCase(this.postRepository, this.quoteRepository);
    await createPostUseCase.execute({ text, userId, postId, type: PostType.REPOST });
  }

  async doQuotePost(): Promise<void> {
    console.log("PostController.doQuotePost");
  }

  async getHomepage(data: GetPostFeedRequestData): Promise<Feed> {
    console.log("PostController.getHomepage");

    const getPostFeedUseCase = new GetPostFeedUseCase(this.postRepository, this.quoteRepository);
    return getPostFeedUseCase.execute(data);
  }
}
