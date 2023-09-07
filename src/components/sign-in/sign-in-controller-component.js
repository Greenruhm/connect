/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SignInView from './sign-in-view-component';

export const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningIn: 'Signing In',
  SignedIn: 'Signed In',
};

const onSuccessDefault = (props) => {
  console.log(
    'SignIn success! Replace this onSuccess function with a custom implementation.'
  );
  console.log(JSON.stringify(props));
};

const SignInController = ({
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
  connect,
  ErrorComponent,
  FormComponent,
  LoadingComponent,
  onSuccess = onSuccessDefault,
  SuccessComponent,
  ViewComponent = SignInView,
} = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

  useEffect(() => {
    async function checkSignInStatus() {
      const user = await connect.getUser();
      if (user.isSignedIn) {
        setState((state) => ({
          ...state,
          authStatus: AuthStatuses.SignedIn,
          email: user.email,
          username: user.username,
        }));
      }
    }
    checkSignInStatus();
  }, [connect]);

  const { signIn, handleSignInErrors, signOut } = connect;

  const setAuthStatus = (authStatus) => () =>
    setState((state) => ({
      ...state,
      authStatus,
    }));

  const setSignedOut = setAuthStatus(AuthStatuses.SignedOut);
  const setSigningIn = setAuthStatus(AuthStatuses.SigningIn);

  const setErrorMessage = (message) =>
    setState((state) => ({
      ...state,
      errors: [...state.errors, message],
    }));

  const setErrorAndSignOut = ({ message }) => {
    setErrorMessage(message);
    setSignedOut();
  };

  const clearErrors = (e) => {
    setState((state) => ({
      ...state,
      errors: [],
    }));
  };

  const handleSignInSuccess = (userData) => {
    const props = {
      authStatus: AuthStatuses.SignedIn,
      email: userData?.email,
      username: userData?.username,
    };
    setState((state) => ({
      ...state,
      ...props,
    }));
    onSuccess(props);
  };

  const handleSignIn = async () => {
    try {
      setSigningIn();
      await signIn()
        .then(handleSignInSuccess)
        .catch(
          handleSignInErrors({
            /*
             * All causes prefixed with "Auth" are handled by the
             * built-in authentication flow, so all you need to do
             * in most cases is reset the state.
             */

            // An error was encountered during the authentication flow.
            AuthInternalError: setSignedOut,
            AuthInvalidEmail: setSignedOut,
            AuthLinkExpired: setSignedOut,

            /*
             * User requested to edit their email address during
             * the authentication flow.
             */
            AuthUserRequestEditEmail: setSignedOut,

            /*
             * In this case, the user intentionally rejected email sharing
             * in the authentication flow. If you need their email, you
             * should explain why you need it and ask them to try again.
             */
            AuthUserRejectedConsentToShareEmail: setErrorAndSignOut,

            // The account does not exist in Greenruhm.
            AccountNotFound: setErrorAndSignOut,

            // The user did not supply an email address.
            EmailIsRequired: setErrorAndSignOut,

            // An unknown error occurred signing the user into Greenruhm.
            InternalServerError: setErrorAndSignOut,
          })
        );
    } catch (e) {
      setErrorAndSignOut(e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      setErrorMessage(e.message);
    }
    setSignedOut();
  };

  const props = {
    authStatus,
    AuthStatuses,
    clearErrors,
    disabled: AuthStatuses.SigningIn === authStatus,
    email,
    errors,
    ErrorComponent,
    FormComponent,
    handleSignIn,
    handleSignOut,
    LoadingComponent,
    SuccessComponent,
    username,
  };

  return <ViewComponent {...props} />;
};

export default SignInController;
