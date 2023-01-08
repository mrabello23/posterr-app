import Database from "../Database";
import Post from "../../entities/Post";
import PostRepository from "../repositories/PostRepository";

export default class PostRepositoryPostgreAdapter implements PostRepository {
  constructor(readonly db: Database) {}

  async getById(id: string): Promise<Post> {
    const [data] = await this.db.query("SELECT * FROM public.post WHERE id = $1", [id]);
    return new Post(data);
  }

  async save(data: Post): Promise<void> {
    await this.db.query(
      "INSERT INTO public.post(id, text, user_id, quote, repost) VALUES(gen_random_uuid(), $1, $2, $3, $4)",
      [data.getText(), data.getUserId(), data.getQuote(), data.getRepost()],
    );
  }
}
