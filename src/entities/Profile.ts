import User from "./User";

export default interface Profile {
  user: User;
  feed: []; // last 5 posts
  totalPosts: number;
}
