import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

type OptionFn = <A, B, C>(a: A, onNone: () => B, onSome: (a: A) => C) => B | C;

type OneSome = <A, B, C>(o: A, main: B, onSome: (o: A, main: B) => C) => B | C;

export const onSome: OneSome = <O, A, D>(
  o: O,
  main: A,
  handle: (o: O, main: A) => D
) =>
  pipe(
    o,
    O.fromNullable,
    O.matchW(
      () => main,
      o => handle(o, main)
    )
  );

export const option: OptionFn = <A, B, C>(
  a: A,
  onNone: () => B,
  onSome: (a: A) => C
) => pipe(a, O.fromNullable, O.matchW(onNone, onSome));
