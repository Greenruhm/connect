const requiresAuth =
  ({ errorMsg, predicate }) =>
  (params) => {
    if (!predicate(params)) throw new Error(errorMsg);
    return params;
  };

export default requiresAuth;
