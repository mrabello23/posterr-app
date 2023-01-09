import User from "../entities/User";
import UserRepository from "../infra/repositories/UserRepository";

export default class GetUserProfileUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const userData = await this.userRepository.getById(userId);
    if (!userData.getId()) return userData;

    userData.createdAtFormatted = this.formatDate(userData.getCreatedAt());

    return userData;
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date);
    const monthString = formattedDate.toLocaleString("en-US", {
      month: "long",
    });

    return `${monthString} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
  }
}
