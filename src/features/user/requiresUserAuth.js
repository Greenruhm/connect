// TODO: Update to take protected action and check that user has the correct privileges
const requiresUserAuth = context => params => {
  if (!context?.user?.isSignedIn)
    throw new Error('You must be signed in to create a drop.');
  return params;
};

export default requiresUserAuth;
