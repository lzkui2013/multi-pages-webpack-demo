export const curry = (fn: Function, ...args: any[]) => {
  if (typeof fn !== 'function') {
    throw new Error(`type error`);
  }
  if (args.length === fn.length) {
    return fn(...args);
  }
  return function (...newArgs: any[]) {
    return curry(fn, ...args, ...newArgs);
  };
};
