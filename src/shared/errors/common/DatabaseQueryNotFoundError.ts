import type { PgColumn } from "drizzle-orm/pg-core";

import type { SwcTable } from "@root/shared/database";

import type { AnyHow } from "..";

export const databaseQueryNotFoundErrorTag: unique symbol = Symbol(
  "DatabaseQueryNotFoundTag"
);

export type DatabaseQueryNotFoundError<V = number> = Readonly<{
  _tag: typeof databaseQueryNotFoundErrorTag;
  table: SwcTable;
  target: {
    column: PgColumn;
    value: V;
  };
}>;

export const databaseQueryNotFoundError = <V>({
  table,
  target
}: {
  table: SwcTable;
  target: {
    column: PgColumn;
    value: V;
  };
}): DatabaseQueryNotFoundError<V> => ({
  _tag: databaseQueryNotFoundErrorTag,
  table,
  target
});

export const isDatabaseQueryNotFoundError = (
  err: AnyHow
): err is DatabaseQueryNotFoundError =>
  err._tag === databaseQueryNotFoundErrorTag;
