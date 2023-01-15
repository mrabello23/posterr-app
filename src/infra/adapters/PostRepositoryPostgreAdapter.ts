import Database from "../Database";
import Post from "../../entities/Post";
import PostRepository, { Pagination, DateFilter } from "../repositories/PostRepository";

export default class PostRepositoryPostgreAdapter implements PostRepository {
  constructor(readonly db: Database) {}

  async getById(id: string): Promise<Post> {
    let data = await this.db.query("SELECT * FROM public.post WHERE id = $1", [id]);

    if (data.length > 0) [data] = data;
    return new Post(data);
  }

  async save(data: Post): Promise<void> {
    await this.db.query(
      "INSERT INTO public.post(id, text, user_id, repost, original_post_id) VALUES($1, $2, $3, $4, $5)",
      [data.getId(), data.getText(), data.getUserId(), data.getRepost(), data.getOriginalPostId()],
    );
  }

  async getAllByUserId(userId: string, pagination: Pagination): Promise<Post[]> {
    const data = await this.db.query(
      `SELECT * FROM public.post WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET (($3 - 1) * $2)`,
      [userId, pagination.size, pagination.page],
    );

    return data;
  }

  async getAllByCreatedAt(date: DateFilter, pagination: Pagination): Promise<Post[]> {
    let whereComplement = "";
    const params = [pagination.size, pagination.page];

    if (date.from && date.to) {
      whereComplement = ` WHERE created_at >= $3 AND created_at <= $4`;
      params.push(date.from);
      params.push(date.to);
    } else {
      if (date.from) {
        whereComplement = ` WHERE created_at >= $3`;
        params.push(date.from);
      }

      if (date.to) {
        whereComplement = ` WHERE created_at <= $3`;
        params.push(date.to);
      }
    }

    const data = await this.db.query(
      `SELECT * FROM public.post ${whereComplement} ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)`,
      params,
    );

    return data;
  }

  async getAllByUserIdAndCreatedAt(
    userId: string,
    date: DateFilter,
    pagination: Pagination,
  ): Promise<Post[]> {
    let whereComplement = "";
    const params = [userId, pagination.size, pagination.page];

    if (date.from && date.to) {
      whereComplement = ` AND created_at >= $4 AND created_at <= $5`;
      params.push(date.from);
      params.push(date.to);
    } else {
      if (date.from) {
        whereComplement = ` AND created_at >= $4`;
        params.push(date.from);
      }

      if (date.to) {
        whereComplement = ` AND created_at <= $4`;
        params.push(date.to);
      }
    }

    const data = await this.db.query(
      `SELECT * FROM public.post WHERE user_id = $1 ${whereComplement} ORDER BY created_at DESC LIMIT $2 OFFSET (($3 - 1) * $2)`,
      params,
    );

    return data;
  }

  async getTotalPostsByUserId(userId: string): Promise<number> {
    let data = await this.db.query(
      "SELECT COUNT(id) as total_posts FROM public.post WHERE user_id = $1",
      [userId],
    );

    if (data.length > 0) [data] = data;
    return data.total_posts;
  }

  async getAll(pagination: Pagination): Promise<Post[]> {
    const data = await this.db.query(
      `SELECT * FROM public.post ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)`,
      [pagination.size, pagination.page],
    );

    return data;
  }
}
