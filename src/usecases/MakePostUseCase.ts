import PostRepository from "../infra/repositories/PostRepository";

// Constraints:
// - A user is not allowed to post more than 5 posts in one day (including reposts and quote posts)
// - Posts can have a maximum of 777 characters
// - Reposting: Users can repost other users' posts, limited to original posts and quote posts, not reposts
// - Quote-post: Users can repost other users' posts and leave a comment limited to original and reposts, not quote-posts

export default class MakePostUseCase {
  constructor(readonly postRepository: PostRepository) {}

  async execute() {
    console.log("MakePostUseCase.execute");
  }
}
