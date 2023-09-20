import type { HttpException } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common";

import type { DatabaseQueryError } from "./common/DatabaseQueryError";
import { isDatabaseQueryError } from "./common/DatabaseQueryError";
import {
  isDatabaseQueryNotFoundError,
  type DatabaseQueryNotFoundError
} from "./common/DatabaseQueryNotFoundError";
import type { ExecutionContextError } from "./common/ExecutionContextError";

export type AnyHow = CommonError;

export type CommonError =
  | ExecutionContextError
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
      `Database query error, reason ${err.reason}`
    );

  if (isDatabaseQueryNotFoundError(err))
    return new InternalServerErrorException(
      `Not found records on table ${err.table} with ${err.filterColumn} is ${err.filterValue}`
    );

  return new InternalServerErrorException(
    `Execution context error occurs, reason ${err.reason}`
  );
};
