import Post from "../../entities/Post";

export type Pagination = {
  page: string;
  size: string;
};

export type DateFilter = {
  from?: string;
  to?: string;
};

export default interface PostRepository {
  save(data: Post): Promise<void>;
  getById(id: string): Promise<Post>;
  getAll(pagination: Pagination): Promise<Post[]>;
  getTotalPostsByUserId(userId: string): Promise<number>;
  getAllByUserId(userId: string, pagination: Pagination): Promise<Post[]>;
  getAllByCreatedAt(data: DateFilter, pagination: Pagination): Promise<Post[]>;
  getAllByUserIdAndCreatedAt(
    userId: string,
    data: DateFilter,
    pagination: Pagination,
  ): Promise<Post[]>;
}
