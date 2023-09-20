import type { SwcTable } from "@root/shared/database";

import type { AnyHow } from "../adapter";

export const databaseQueryNotFoundErrorTag: unique symbol = Symbol(
  "databaseQueryNotFound"
);

export type DatabaseQueryNotFoundError<T = number> = Readonly<{
  _tag: typeof databaseQueryNotFoundErrorTag;
  filterColumn: string;
  table: SwcTable;
  filterValue: T;
}>;

export const databaseQueryNotFoundError = <T>(
  filterColumn: string,
  table: SwcTable,
  filterValue: T
): DatabaseQueryNotFoundError<T> => ({
  _tag: databaseQueryNotFoundErrorTag,
  filterColumn,
  table,
  filterValue
});

export const isDatabaseQueryNotFoundError = (
  err: AnyHow
): err is DatabaseQueryNotFoundError =>
  err._tag === databaseQueryNotFoundErrorTag;
