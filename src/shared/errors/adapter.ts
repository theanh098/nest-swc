import type { HttpException } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common";

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
      `Database query error, reason: ${JSON.stringify(err.reason)}`
    );

  if (isDatabaseQueryNotFoundError(err))
    return new InternalServerErrorException(
      `Not found records on table ${err.table._.name} with ${err.filterColumn._.name} is '${err.filterValue}'`
    );

  return new InternalServerErrorException(
    `Execution context error occurs, reason: ${JSON.stringify(err.reason)}`
  );
};
