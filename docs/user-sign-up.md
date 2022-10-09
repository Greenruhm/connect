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

If an account already exists for the given email, `connection.signUp()` will reject with an error: `"An account already exists for this email."`.

If the email provided to `connection.signUp()` is invalid it will reject with an error: `"Invalid Email"`. Since this error is handled by the Connect UX for you, your UX should not display the error again. Instead, handle any cleanup that is necessary to allow the user to try the sign up request again.

If the auth link expires `connection.signUp()` will reject with an error: `"Auth Link Expired"`. This error is also handled by the Connect UX so you should handle any cleanup necessary to allow the user to try the sign up request again.
