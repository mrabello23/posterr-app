import Post from "./Post";
import User from "./User";

export default interface Profile {
  user: User;
  feed: Post[]; // last 5 posts
  totalPosts: number;
}
