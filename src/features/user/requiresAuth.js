const requiresAuth = ({ errorMsg, predicate }) => params => {
  if (!predicate) throw new Error(errorMsg);
  return params;
};

export default requiresAuth;
