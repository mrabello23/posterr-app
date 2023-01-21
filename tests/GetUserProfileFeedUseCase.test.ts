import PostgreAdapter from "../src/infra/adapters/PostgreAdapter";
import PostRepositoryPostgreAdapter from "../src/infra/adapters/PostRepositoryPostgreAdapter";
import QuoteRepositoryPostgreAdapter from "../src/infra/adapters/QuoteRepositoryPostgreAdapter";
import Post from "../src/entities/Post";
import Quote from "../src/entities/Quote";
import GetUserProfileFeedUseCase from "../src/usecases/GetUserProfileFeedUseCase";

jest.mock("../src/infra/adapters/PostgreAdapter");
jest.mock("../src/infra/adapters/PostRepositoryPostgreAdapter");
jest.mock("../src/infra/adapters/QuoteRepositoryPostgreAdapter");

const database = new PostgreAdapter();
const PostRepositoryMock = new PostRepositoryPostgreAdapter(database);
const QuoteRepositoryMock = new QuoteRepositoryPostgreAdapter(database);

const dateStr = new Date().toLocaleDateString();

const posts = [
  new Post({
    id: "post_id",
    text: "Get UserProfile Feed UseCase",
    user_id: "user_id",
    repost: false,
    created_at: dateStr,
  }),
];

const quotes = [
  new Quote({
    id: "quote_id",
    text: "Get UserProfile Feed UseCase",
    user_id: "user_id",
    original_post_id: "original_post_id",
    created_at: dateStr,
  }),
];

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("GetUserProfileFeedUseCase Test", () => {
  it("Should get User Profile Feed", async () => {
    const totalPostsByUser = 1;
    const totalQuotesByUser = 1;

    jest.spyOn(PostRepositoryMock, "getAllByUserId").mockResolvedValueOnce(posts);
    jest.spyOn(PostRepositoryMock, "getTotalPostsByUserId").mockResolvedValueOnce(totalPostsByUser);

    jest.spyOn(QuoteRepositoryMock, "getAllByUserId").mockResolvedValueOnce(quotes);
    jest.spyOn(QuoteRepositoryMock, "getTotalByUserId").mockResolvedValueOnce(totalQuotesByUser);

    const usecase = new GetUserProfileFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);
    const data = await usecase.execute({ userId: "user_id", from: dateStr, to: dateStr });

    const returnData = {
      feed: {
        posts,
        quotes,
        previousPage: 1,
        nextPage: 2,
      },
      userId: "user_id",
      totalPosts: Number(totalPostsByUser) + Number(totalQuotesByUser),
    };

    expect(data).toStrictEqual(returnData);

    expect(PostRepositoryMock.getAllByUserId).toBeCalledTimes(1);
    expect(PostRepositoryMock.getTotalPostsByUserId).toBeCalledTimes(1);

    expect(QuoteRepositoryMock.getAllByUserId).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.getTotalByUserId).toBeCalledTimes(1);
  });

  it("Should get error when user_id is not presented", async () => {
    const usecase = new GetUserProfileFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);

    await expect(usecase.execute({ from: dateStr, to: dateStr })).rejects.toThrow(
      "UserId is missing.",
    );
  });
});
