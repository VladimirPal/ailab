export const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

export const delay = (ms, defaultResolve = null) =>
  new Promise((resolve) => setTimeout(() => resolve(defaultResolve), ms));
