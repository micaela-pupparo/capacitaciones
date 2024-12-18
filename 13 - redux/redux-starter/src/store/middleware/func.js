const func =
  ({ dispath, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") action(dispath, getState);
    else next(action);
  };

export default func;
