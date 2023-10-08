import { InternalServerErrorException } from "@nestjs/common";
import { getTableConfig } from "drizzle-orm/pg-core";

import type { DatabaseQueryError } from "./DatabaseQueryError";
import { isDatabaseQueryError } from "./DatabaseQueryError";
import type { DatabaseQueryNotFoundError } from "./DatabaseQueryNotFoundError";
import { isDatabaseQueryNotFoundError } from "./DatabaseQueryNotFoundError";
import type { ExecutionError } from "./ExecutionError";

export type CommonError =
  | ExecutionError
  | DatabaseQueryError
  | DatabaseQueryNotFoundError;

export const encodeCommonError = (
  err: CommonError
): InternalServerErrorException => {
  if (isDatabaseQueryError(err))
    return new InternalServerErrorException(
      `Database query error, with reason: ${JSON.stringify(err.reason)}`
    );

  if (isDatabaseQueryNotFoundError(err))
    return new InternalServerErrorException(
      `Not found records on table ${getTableConfig(err.table).name} with ${
        err.filterColumn.name
      } is '${err.filterValue}'`
    );

  return new InternalServerErrorException(
    `Execution context error occurs, with reason: ${JSON.stringify(err.reason)}`
  );
};
