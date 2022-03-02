export const asyncPipeWithContext = context => (...fns) => x =>
  fns.reduce(async (y, f) => f(context)(await y), x);
