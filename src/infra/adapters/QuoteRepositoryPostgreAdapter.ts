import Database from "../Database";
import Quote from "../../entities/Quote";
import QuoteRepository, { Pagination, DateFilter } from "../repositories/QuoteRepository";

export default class QuoteRepositoryPostgreAdapter implements QuoteRepository {
  constructor(readonly db: Database) {}

  async getById(id: string): Promise<Quote> {
    let data = await this.db.query("SELECT * FROM public.quotes WHERE id = $1", [id]);

    if (data.length > 0) [data] = data;
    return new Quote(data);
  }

  async save(data: Quote): Promise<void> {
    await this.db.query(
      "INSERT INTO public.quotes(id, text, user_id, original_post_id) VALUES($1, $2, $3, $4)",
      [data.getId(), data.getText(), data.getUserId(), data.getOriginalPostId()],
    );
  }

  async getAllByUserId(userId: string, pagination: Pagination): Promise<Quote[]> {
    const data = await this.db.query(
      `SELECT * FROM public.quotes WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET (($3 - 1) * $2)`,
      [userId, pagination.size, pagination.page],
    );

    return data;
  }

  async getAllByCreatedAt(date: DateFilter, pagination: Pagination): Promise<Quote[]> {
    let whereComplement = "";
    const params = [pagination.size, pagination.page];

    if (date.from && date.to) {
      whereComplement = ` WHERE created_at >= $3 AND created_at <= $4`;
      params.push(date.from);
      params.push(date.to);

      return this.db.query(
        `SELECT * FROM public.quotes ${whereComplement} ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)`,
        params,
      );
    }

    if (date.from) {
      whereComplement = ` WHERE created_at >= $3`;
      params.push(date.from);
    }

    if (date.to) {
      whereComplement = ` WHERE created_at <= $3`;
      params.push(date.to);
    }

    return this.db.query(
      `SELECT * FROM public.quotes ${whereComplement} ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)`,
      params,
    );
  }

  async getAllByUserIdAndCreatedAt(
    userId: string,
    date: DateFilter,
    pagination: Pagination,
  ): Promise<Quote[]> {
    let whereComplement = "";
    const params = [userId, pagination.size, pagination.page];

    if (date.from && date.to) {
      whereComplement = ` AND created_at >= $4 AND created_at <= $5`;
      params.push(date.from);
      params.push(date.to);

      return this.db.query(
        `SELECT * FROM public.quotes WHERE user_id = $1 ${whereComplement} ORDER BY created_at DESC LIMIT $2 OFFSET (($3 - 1) * $2)`,
        params,
      );
    }

    if (date.from) {
      whereComplement = ` AND created_at >= $4`;
      params.push(date.from);
    }

    if (date.to) {
      whereComplement = ` AND created_at <= $4`;
      params.push(date.to);
    }

    return this.db.query(
      `SELECT * FROM public.quotes WHERE user_id = $1 ${whereComplement} ORDER BY created_at DESC LIMIT $2 OFFSET (($3 - 1) * $2)`,
      params,
    );
  }

  async getTotalByUserId(userId: string): Promise<number> {
    let data = await this.db.query(
      "SELECT COUNT(id) as total_quotes FROM public.quotes WHERE user_id = $1",
      [userId],
    );

    if (data.length > 0) [data] = data;
    return data.total_quotes;
  }

  async getAll(pagination: Pagination): Promise<Quote[]> {
    const data = await this.db.query(
      `SELECT * FROM public.quotes ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)`,
      [pagination.size, pagination.page],
    );

    return data;
  }
}
