import * as E from "fp-ts/Either";

import type { AnyHow } from "../adapter";

export const executionContextErrorTag: unique symbol = Symbol(
  "executionContextErrorTag"
);

export type ExecutionContextError = Readonly<{
  _tag: typeof executionContextErrorTag;
  reason: Error;
}>;

export const executionContextError = (e: unknown): ExecutionContextError => ({
  _tag: executionContextErrorTag,
  reason: E.toError(e)
});

export const isExecutionContextError = (
  err: AnyHow
): err is ExecutionContextError => err._tag === executionContextErrorTag;
