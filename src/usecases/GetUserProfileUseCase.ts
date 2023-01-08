import Profile from "../entities/Profile";
import UserRepository from "../infra/repositories/UserRepository";

export default class GetUserProfileUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<Profile> {
    const userData = await this.userRepository.getById(userId);
    userData.createdAtFormatted = this.formatDate(userData.getCreatedAt());

    return {
      feed: [],
      totalPosts: 0,
      user: userData,
    };
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date);
    const monthString = formattedDate.toLocaleString("en-US", {
      month: "long",
    });

    return `${monthString} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
  }
}
