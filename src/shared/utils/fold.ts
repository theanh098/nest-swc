type Handlers<V extends string | number | symbol, T> = {
  [K in V]: (value?: V) => T;
};

export const fold = <V extends string | number | symbol, T>(
  value: V,
  handlers: Handlers<V, T>
): T => handlers[value](value);
