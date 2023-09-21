import * as E from "fp-ts/Either";

import type { AnyHow } from "../adapter";

export const executionErrorTag: unique symbol = Symbol(
  "executionContextErrorTag"
);

export type ExecutionError = Readonly<{
  _tag: typeof executionErrorTag;
  reason: Error;
}>;

export const executionContextError = (e: unknown): ExecutionError => ({
  _tag: executionErrorTag,
  reason: E.toError(e)
});

export const isExecutionContextError = (err: AnyHow): err is ExecutionError =>
  err._tag === executionErrorTag;