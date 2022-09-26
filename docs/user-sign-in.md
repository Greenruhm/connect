# User Sign In

```js
connection.signIn(email: String) => Promise(User)
```

To sign in a user, you must first initialize the Greenruhm connect API:

```js
import { connect } from '@greenruhm/connect';

const connection = connect({ apiKey: '<your API key here>' });

const getSignedInUser = async email => {
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

If the user does not exist, the connection.signIn() promise will reject with an `"Account not found"` error.

If there is an error with the auth service then `connection.signIn()` will reject with an error: `"Internal Error"`. Since this error is handled by the Connect UX for you, your UX should not display the error again. Instead, handle any cleanup that is necessary to get back into a state to make the sign in request again.

If the auth link expires `connection.signIn()` will reject with an error: `"Auth Link Expired"`. This error is also handled by the Connect UX so you should ensure that any cleanup necessary to retry the request again is completed.
