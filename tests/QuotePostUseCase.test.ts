import PostgreAdapter from "../src/infra/adapters/PostgreAdapter";
import PostRepositoryPostgreAdapter from "../src/infra/adapters/PostRepositoryPostgreAdapter";
import QuoteRepositoryPostgreAdapter from "../src/infra/adapters/QuoteRepositoryPostgreAdapter";
import QuotePostUseCase from "../src/usecases/QuotePostUseCase";
import Post, { PostType } from "../src/entities/Post";
import Quote from "../src/entities/Quote";

jest.mock("../src/infra/adapters/PostgreAdapter");
jest.mock("../src/infra/adapters/PostRepositoryPostgreAdapter");
jest.mock("../src/infra/adapters/QuoteRepositoryPostgreAdapter");

const database = new PostgreAdapter();
const PostRepositoryMock = new PostRepositoryPostgreAdapter(database);
const QuoteRepositoryMock = new QuoteRepositoryPostgreAdapter(database);

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("QuotePostUseCase Test", () => {
  it("Should create a Quote post", async () => {
    jest.spyOn(QuoteRepositoryMock, "save").mockResolvedValueOnce();

    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    await usecase.execute({
      text: "Create Post UseCase - Post text",
      userId: "user_id",
      postId: "post_id",
      type: PostType.QUOTEPOST,
    });

    expect(QuoteRepositoryMock.save).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.save).not.toThrowError();
  });

  it("Should throw error if a post text has more than 777 characters", async () => {
    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    const requestData = {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      userId: "user_id",
      postId: "post_id",
      type: PostType.QUOTEPOST,
    };

    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);
    await expect(usecase.execute(requestData)).rejects.toThrow(
      "Your Post is too long. Max 777 characters.",
    );
  });

  it("Should throw error if a user try to Post more than 5 times on same day", async () => {
    const posts = [
      new Post({
        id: "post_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        repost: false,
        created_at: "2023-01-01",
      }),
      new Post({
        id: "post_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        repost: false,
        created_at: "2023-01-01",
      }),
      new Post({
        id: "post_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        repost: true,
        created_at: "2023-01-01",
      }),
    ];

    const quotes = [
      new Quote({
        id: "quote_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        original_post_id: "original_post_id",
        created_at: "2023-01-01",
      }),
      new Quote({
        id: "quote_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        original_post_id: "original_post_id",
        created_at: "2023-01-01",
      }),
    ];

    jest.spyOn(PostRepositoryMock, "getAllByUserIdAndCreatedAt").mockResolvedValueOnce(posts);
    jest.spyOn(QuoteRepositoryMock, "getAllByUserIdAndCreatedAt").mockResolvedValueOnce(quotes);

    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    const requestData = {
      text: "Create Post UseCase - Repost text",
      userId: "user_id",
      postId: "post_id",
      type: PostType.QUOTEPOST,
    };

    await expect(usecase.execute(requestData)).rejects.toThrow(
      "You reached the daily post limit (up to 5).",
    );
    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);
  });

  it("Should throw error if a user try to Quote a quoted post", async () => {
    jest.spyOn(QuoteRepositoryMock, "getById").mockResolvedValueOnce(
      new Quote({
        id: "quote_id",
        text: "Create Post UseCase",
        user_id: "user_id",
        original_post_id: "original_post_id",
        created_at: "2023-01-01",
      }),
    );

    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    const requestData = {
      text: "Create Post UseCase - Repost text",
      userId: "user_id",
      postId: "post_id",
      type: PostType.QUOTEPOST,
    };

    await expect(usecase.execute(requestData)).rejects.toThrow("You cannot quote a quoted post.");
    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);
  });

  it("Should throw error if a user try to Quote Post whitout a post_id set", async () => {
    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    const requestData = {
      text: "Create Post UseCase - Post text",
      userId: "user_id",
      type: PostType.QUOTEPOST,
    };

    await expect(usecase.execute(requestData)).rejects.toThrow(
      "Post Id is required for this request.",
    );
    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);
  });

  it("Should throw error if text or user_id not present", async () => {
    const usecase = new QuotePostUseCase(QuoteRepositoryMock, PostRepositoryMock);
    const requestData = {
      text: "Create Post UseCase - Post text",
      userId: "",
      type: PostType.QUOTEPOST,
    };

    await expect(usecase.execute(requestData)).rejects.toThrow("User Id not found.");
    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);

    requestData.userId = "user_id";
    requestData.text = "";

    await expect(usecase.execute(requestData)).rejects.toThrow("Post text not found.");
    expect(QuoteRepositoryMock.save).toBeCalledTimes(0);
  });
});
