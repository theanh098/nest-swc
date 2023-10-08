import type { HttpException } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common";
import { getTableConfig } from "drizzle-orm/pg-core";

import type { DatabaseQueryError } from "./common/DatabaseQueryError";
import { isDatabaseQueryError } from "./common/DatabaseQueryError";
import {
  isDatabaseQueryNotFoundError,
  type DatabaseQueryNotFoundError
} from "./common/DatabaseQueryNotFoundError";
import type { ExecutionError } from "./common/ExecutionError";

export type AnyHow = CommonError;

export type CommonError =
  | ExecutionError
  | DatabaseQueryError
  | DatabaseQueryNotFoundError;

export const encodeError = (err: AnyHow): HttpException => {
  return encodeCommonError(err);
};

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
