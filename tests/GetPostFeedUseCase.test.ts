import PostgreAdapter from "../src/infra/adapters/PostgreAdapter";
import PostRepositoryPostgreAdapter from "../src/infra/adapters/PostRepositoryPostgreAdapter";
import QuoteRepositoryPostgreAdapter from "../src/infra/adapters/QuoteRepositoryPostgreAdapter";
import Post from "../src/entities/Post";
import Quote from "../src/entities/Quote";
import GetPostFeedUseCase from "../src/usecases/GetPostFeedUseCase";

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
    text: "Get Post Feed UseCase",
    user_id: "user_id",
    repost: false,
    created_at: dateStr,
  }),
];

const quotes = [
  new Quote({
    id: "quote_id",
    text: "Get Post Feed UseCase",
    user_id: "user_id",
    original_post_id: "original_post_id",
    created_at: dateStr,
  }),
];

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("GetPostFeedUseCase Test", () => {
  it("Should get Posts By UserId And Posted Date", async () => {
    jest.spyOn(PostRepositoryMock, "getAllByUserIdAndCreatedAt").mockResolvedValueOnce(posts);
    jest.spyOn(QuoteRepositoryMock, "getAllByUserIdAndCreatedAt").mockResolvedValueOnce(quotes);

    const usecase = new GetPostFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);
    const data = await usecase.execute({ userId: "user_id", from: dateStr, to: dateStr });

    const returnData = {
      posts,
      quotes,
      previousPage: 1,
      nextPage: 2,
    };

    expect(data).toStrictEqual(returnData);
    expect(PostRepositoryMock.getAllByUserIdAndCreatedAt).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.getAllByUserIdAndCreatedAt).toBeCalledTimes(1);
  });

  it("Should get Posts By Posted Date", async () => {
    jest.spyOn(PostRepositoryMock, "getAllByCreatedAt").mockResolvedValueOnce(posts);
    jest.spyOn(QuoteRepositoryMock, "getAllByCreatedAt").mockResolvedValueOnce(quotes);

    const usecase = new GetPostFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);
    const data = await usecase.execute({ from: dateStr, to: dateStr });

    const returnData = {
      posts,
      quotes,
      previousPage: 1,
      nextPage: 2,
    };

    expect(data).toStrictEqual(returnData);
    expect(PostRepositoryMock.getAllByCreatedAt).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.getAllByCreatedAt).toBeCalledTimes(1);
  });

  it("Should get Only Mine Posts", async () => {
    jest.spyOn(PostRepositoryMock, "getAllByUserId").mockResolvedValueOnce(posts);
    jest.spyOn(QuoteRepositoryMock, "getAllByUserId").mockResolvedValueOnce(quotes);

    const usecase = new GetPostFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);
    const data = await usecase.execute({ userId: "user_id" });

    const returnData = {
      posts,
      quotes,
      previousPage: 1,
      nextPage: 2,
    };

    expect(data).toStrictEqual(returnData);
    expect(PostRepositoryMock.getAllByUserId).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.getAllByUserId).toBeCalledTimes(1);
  });

  it("Should get All Posts", async () => {
    jest.spyOn(PostRepositoryMock, "getAll").mockResolvedValueOnce(posts);
    jest.spyOn(QuoteRepositoryMock, "getAll").mockResolvedValueOnce(quotes);

    const usecase = new GetPostFeedUseCase(PostRepositoryMock, QuoteRepositoryMock);
    const data = await usecase.execute();

    const returnData = {
      posts,
      quotes,
      previousPage: 1,
      nextPage: 2,
    };

    expect(data).toStrictEqual(returnData);
    expect(PostRepositoryMock.getAll).toBeCalledTimes(1);
    expect(QuoteRepositoryMock.getAll).toBeCalledTimes(1);
  });
});
