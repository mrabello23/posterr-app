import Quote from "../../entities/Quote";

export type Pagination = {
  page: string;
  size: string;
};

export type DateFilter = {
  from?: string;
  to?: string;
};

export default interface QuoteRepository {
  save(data: Quote): Promise<void>;
  getById(id: string): Promise<Quote>;
  getAll(pagination: Pagination): Promise<Quote[]>;
  getTotalByUserId(userId: string): Promise<number>;
  getAllByUserId(userId: string, pagination: Pagination): Promise<Quote[]>;
  getAllByCreatedAt(data: DateFilter, pagination: Pagination): Promise<Quote[]>;
  getAllByUserIdAndCreatedAt(
    userId: string,
    data: DateFilter,
    pagination: Pagination,
  ): Promise<Quote[]>;
}
