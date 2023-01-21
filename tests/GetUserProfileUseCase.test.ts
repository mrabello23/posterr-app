import User from "../src/entities/User";
import PostgreAdapter from "../src/infra/adapters/PostgreAdapter";
import UserRepositoryPostgreAdapter from "../src/infra/adapters/UserRepositoryPostgreAdapter";
import GetUserProfileUseCase from "../src/usecases/GetUserProfileUseCase";

jest.mock("../src/infra/adapters/PostgreAdapter");
jest.mock("../src/infra/adapters/UserRepositoryPostgreAdapter");

const database = new PostgreAdapter();
const UserRepositoryMock = new UserRepositoryPostgreAdapter(database);

const user = new User({
  id: "user_id",
  name: "name",
  email: "email",
  username: "username",
  created_at: "2023-01-01",
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("GetUserProfileUseCase Test", () => {
  it("Should get User Profile", async () => {
    jest.spyOn(UserRepositoryMock, "getById").mockResolvedValueOnce(user);

    const usecase = new GetUserProfileUseCase(UserRepositoryMock);
    const data = await usecase.execute("user_id");

    const date = new Date(user.getCreatedAt());
    const monthString = date.toLocaleString("en-US", {
      month: "long",
    });
    const createdAtFormatted = `${monthString} ${date.getDate()}, ${date.getFullYear()}`;
    user.createdAtFormatted = createdAtFormatted;

    expect(data).toStrictEqual(user);
    expect(UserRepositoryMock.getById).toBeCalledTimes(1);
  });
});
