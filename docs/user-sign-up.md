# New User Sign Up

```js
connection.signUp({
  email: String!,
  username: String!,
  displayName: String, // Optional. Defaults to username.
) => Promise(User) | Promise(Error)
```

If the account does not already exist, the `connection.signUp()` method will resolve with the new user account details, including the user's `email` and `walletAddress`.

## Error Handling

The Greenruhm Connect API includes a `handleSignUpErrors` method for handling any errors thrown while the user is trying to sign up.

`signUp` and `handleSignUpErrors` can be destructured from the Greenruhm Connect API:

```js
const { signUp, handleSignUpErrors } = connect({ apiKey: '<your-api-key>' });
```

The `handleSignUpErrors` method should be passed to the `catch()` method of the `connection.signUp()` promise and you should define how you want each potential sign up error cause to be handled.

You can define some helper functions in your React component:

```js
const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningUp: 'Signing Up',
  SignedIn: 'Signed In',
};

const setAuthStatus = (authStatus) => () =>
  setState((state) => ({
    ...state,
    authStatus,
  }));

const setSignedOut = setAuthStatus(AuthStatuses.SignedOut);
const setSigningUp = setAuthStatus(AuthStatuses.SigningUp);
const setSignedIn = setAuthStatus(AuthStatuses.SignedIn);

const setErrorAndSignOut = ({ message }) => {
  setErrorMessage(message);
  setSignedOut();
};
```

The code snippet below includes all known potential sign up error causes and sample handlers to pass to `handleSignUpErrors`:

```js
const handleSignUp = async () => {
  try {
    setSigningUp();
    await signUp({ email, username })
      .then(handleSignUpSuccess)
      .catch(
        handleSignUpErrors({
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

          // The account already exists in Greenruhm.
          AccountAlreadyExists: setErrorAndSignOut,

          // The user did not supply an email address.
          EmailIsRequired: setErrorAndSignOut,

          // The user did not supply a valid email address.
          InvalidEmail: setErrorAndSignOut,

          // The user did not supply a username.
          UsernameIsRequired: setErrorAndSignOut,

          // The user did not supply a valid username.
          InvalidUsername: setErrorAndSignOut,

          // The user provided a username that is already taken.
          UsernameIsUnavailable: setErrorAndSignOut,

          // An unknown error occurred signing up the user with Greenruhm.
          InternalServerError: setErrorAndSignOut,
        })
      );
  } catch (e) {
    setErrorAndSignOut(e);
  }
};
```

Note that all named sign up error causes with the prefix "Auth" already display an error message through the built-in Connect UX for you, so your UX should not display the error again. Instead, handle any cleanup that is needed to allow the user to try the sign up request again.

For all named error causes that are NOT prefixed with "Auth", you should destructure the `message` parameter in your handler function and include any logic to display the error message in your UX, and handle any cleanup that is required for the user to attempt another sign up request.

Greenruhm uses the [`error-causes`](https://github.com/paralleldrive/error-causes) library to accomplish the automatic error branching you see above. If you pass an object to `handleSignUpErrors` that does not include all of the named sign up error causes shown in the code snippet above, `handleSignUpErrors` will throw an error with the message: `"Missing error handler"` in order to protect you from forgetting to handle a known error cause.
