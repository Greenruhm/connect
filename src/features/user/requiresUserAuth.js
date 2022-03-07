import { getUser } from './reducer';

// TODO: Update to take protected action and check that user has the correct privileges
const requiresUserAuth = params => {
  if (!getUser(params.store.getState()).isSignedIn)
    throw new Error('You must be signed in to create a drop.');
  return params;
};

export default requiresUserAuth;
