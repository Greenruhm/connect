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

`handleSignInErrors` can be imported from the Greenruhm Connect API like so:

```js
const { signIn, handleSignInErrors } = connect({ apiKey: '<your-api-key>' });
```

The `handleSignInErrors` method should be passed to the `catch()` method of the `connection.signIn()` promise and you should define how you want each potential sign in error cause to be handled.

The code snippet belows includes all known potential sign in error causes with example handler functions individually defined for them within the `handleSignInErrors` method:

```js
const handleSignIn = async () => {
  try {
    setState((state) => ({
      ...state,
      authStatus: 'Signing In',
    }));
    await signIn({ email, username })
      .then(handleSignInSuccess)
      .catch(
        handleSignInErrors({
          AccountNotFound: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          AuthInternalError: () => setAuthStatusToSignedOut(),
          AuthInvalidEmail: () => setAuthStatusToSignedOut(),
          AuthLinkExpired: () => setAuthStatusToSignedOut(),
          AuthUserRequestEditEmail: () => setAuthStatusToSignedOut(),
          AuthUserRejectedConsentToShareEmail: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          EmailIsRequired: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          InternalServerError: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
        })
      );
  } catch (e) {
    setErrorMessage(e.message);
    setAuthStatusToSignedOut();
  }
};
```

Note that all named sign in error causes with the prefix "Auth" already display an error message through the built-in Connect UX for you, so your UX should not display the error again. Instead, handle any cleanup that is necessary to allow the user to try the sign in request again.

For all named error causes that are NOT prefixed with "Auth", you should destructure the `message` parameter in your handler function and include any logic to display the error message in your UX—as well as any cleanup that is required for the user to attempt another sign in request.

Since the `handleSignInErrors` method is defined with the [`error-causes`](https://github.com/paralleldrive/error-causes) package, if you pass an errors handler object to `handleSignInErrors` that does not include all of the named sign in error causes shown in the code snippet above `handleSignInErrors` will throw an error with the message: `"Missing error handler"`. This error is thrown to encourage you not to accidentally forget to handle a known potential sign in error.
