# User Sign In

```js
connection.signIn(email: String) => Promise(User)
```

To sign in a user, you must first initialize the Greenruhm connect API:

```js
import { connect } from '@greenruhm/connect';

const connection = connect({ apiKey: '<your API key here>' });

const getSignedInUser = async (email) => {
  const user = await connection.signIn(email);
  // You can now use user.displayName, user.avatarImage, etc.
  return user;
};
```

Call the asynchronous `connection.signIn()` method with the user's email address. Greenruhm Connect will send the user an email containing a button to click.

If the user account exists, they'll be signed in and the promise returned by `connection.signIn()` will be resolved with user details such as their `email`, `username`, `displayName`, `avatarImage`, and `walletAddress`.

```js
type User {
  email: String!
  walletAddress: String!
  # True if user is signed in
  isSignedIn: Boolean!
  username: String
  displayName: String
  avatarImage: String
  # Used to uniquely identify you for credits and royalties in various systems.
  # Register for free here: https://sound.credit/account/login
  isni: String
  # Your IPI is assigned when you join a Performing Rights Organization (PRO).
  # e.g. BMI, ASCAP, or SESAC
  ipi: String
}
```

## Error Handling

The Greenruhm Connect API includes a `handleSignInErrors` method for handling any errors thrown while the user is trying to sign in.

`signIn` and `handleSignInErrors` can be destructured from the Greenruhm Connect API:

```js
const { signIn, handleSignInErrors } = connect({ apiKey: '<your-api-key>' });
```

The `handleSignInErrors` method should be passed to the `catch()` method of the `connection.signIn()` promise and you should define how you want each potential sign in error cause to be handled.

You can define some helper functions in your React component:

```js
const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningIn: 'Signing In',
  SignedIn: 'Signed In',
};

const setAuthStatus = (authStatus) => () =>
  setState((state) => ({
    ...state,
    authStatus,
  }));

const setSignedOut = setAuthStatus(AuthStatuses.SignedOut);
const setSigningIn = setAuthStatus(AuthStatuses.SigningIn);
const setSignedIn = setAuthStatus(AuthStatuses.SignedIn);

const setErrorAndSignOut = ({ message }) => {
  setErrorMessage(message);
  setSignedOut();
};
```

The code snippet below includes all known potential sign in error causes and sample handlers to pass to `handleSignInErrors`:

```js
const handleSignIn = async () => {
  try {
    setSigningIn();
    await signIn({ email, username })
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
```

Note that all named sign in error causes with the prefix "Auth" already display an error message through the built-in Connect UX for you, so your UX should not display the error again. Instead, handle any cleanup that is needed to allow the user to try the sign in request again.

For all named error causes that are NOT prefixed with "Auth", you should destructure the `message` parameter in your handler function and include any logic to display the error message in your UX—as well as any cleanup that is required for the user to attempt another sign in request.

Greenruhm use the [`error-causes`](https://github.com/paralleldrive/error-causes) library to accomplish the automatic error branching you see above. If you pass an object to `handleSignInErrors` that does not include all of the named sign in error causes shown in the code snippet above `handleSignInErrors` will throw an error with the message: `"Missing error handler"` in order to protect you from forgetting to handle a known error cause.
