import * as E from "fp-ts/Either";

import type { AnyHow } from "../adapter";

export const executionErrorTag: unique symbol = Symbol("executionErrorTag");

/**
 * Represent to any error.
 * Not recommended.
 * Let's define specific error in your context instead.
 */
export type ExecutionError = Readonly<{
  _tag: typeof executionErrorTag;
  reason: Error;
}>;

export const executionError = (e: unknown): ExecutionError => ({
  _tag: executionErrorTag,
  reason: E.toError(e)
});

export const isExecutionError = (err: AnyHow): err is ExecutionError =>
  err._tag === executionErrorTag;
