import Post from "../../entities/Post";

export default interface PostRepository {
  getById(id: string): Promise<Post>;
  save(data: Post): Promise<void>;
}
