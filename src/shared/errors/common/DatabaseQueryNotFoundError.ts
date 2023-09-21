import type { PgColumn } from "drizzle-orm/pg-core";

import type { SwcTable } from "@root/shared/database";

import type { AnyHow } from "../adapter";

export const databaseQueryNotFoundErrorTag: unique symbol = Symbol(
  "databaseQueryNotFoundTag"
);

export type DatabaseQueryNotFoundError<V = number> = Readonly<{
  _tag: typeof databaseQueryNotFoundErrorTag;
  filterValue: V;
  table: SwcTable;
  filterColumn: PgColumn;
}>;

export const databaseQueryNotFoundError = <V>({
  filterColumn,
  filterValue,
  table
}: {
  table: SwcTable;
  filterColumn: PgColumn;
  filterValue: V;
}): DatabaseQueryNotFoundError<V> => ({
  _tag: databaseQueryNotFoundErrorTag,
  filterColumn,
  table,
  filterValue
});

export const isDatabaseQueryNotFoundError = (
  err: AnyHow
): err is DatabaseQueryNotFoundError =>
  err._tag === databaseQueryNotFoundErrorTag;
