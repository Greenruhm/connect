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

`handleSignUpErrors` can be imported from the Greenruhm Connect API like so:

```js
const { signUp, handleSignUpErrors } = connect({ apiKey: '<your-api-key>' });
```

The `handleSignUpErrors` method should be passed to the `catch()` method of the `connection.signUp()` promise and you should define how you want each potential sign up error cause to be handled.

The code snippet belows includes all known potential sign up error causes with example handler functions individually defined for them within the `handleSignUpErrors` method:

```js
const handleSignUp = async () => {
  try {
    setState((state) => ({
      ...state,
      authStatus: 'Signing Up',
    }));
    await signUp({ email, username })
      .then(handleSignUpSuccess)
      .catch(
        handleSignUpErrors({
          AccountAlreadyExists: ({ message }) => {
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
          InvalidEmail: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          InvalidUsername: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          UsernameIsUnavailable: ({ message }) => {
            setErrorMessage(message);
            setAuthStatusToSignedOut();
          },
          UsernameIsRequired: ({ message }) => {
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

Note that all named sign up error causes with the prefix "Auth" already display an error message through the built-in Connect UX for you, so your UX should not display the error again. Instead, handle any cleanup that is necessary to allow the user to try the sign up request again.

For all named error causes that are NOT prefixed with "Auth", you should destructure the `message` parameter in your handler function and include any logic to display the error message in your UX—as well as any cleanup that is required for the user to attempt another sign up request.

Since the `handleSignUpErrors` method is defined with the [`error-causes`](https://github.com/paralleldrive/error-causes) package, if you pass an errors handler object to `handleSignUpErrors` that does not include all of the named sign up error causes shown in the code snippet above `handleSignUpErrors` will throw an error with the message: `"Missing error handler"`. This error is thrown to encourage you not to accidentally forget to handle a known potential sign up error.
