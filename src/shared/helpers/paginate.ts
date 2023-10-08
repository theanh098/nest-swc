import type { PaginateResponse } from "../IO/Paginate";

export const paginate = <T>({
  nodes,
  limit,
  page,
  total
}: {
  nodes: Array<T>;
  page: number;
  limit: number;
  total: number;
}): PaginateResponse<T> => ({ nodes, limit, page, total });
