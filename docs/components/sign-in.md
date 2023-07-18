[Index](./index.md)

# SignIn Component

`SignIn` is a React higher order component that manages the user sign-in process, including handling status changes, user information updates, and error handling. It's designed to be flexible and customizable, allowing you to pass in custom components.

## Props

The `SignIn` component takes the following props:

| Prop             | Type      | Default Value | Description                                                                                                                                                                         |
| ---------------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authStatus       | string    | 'Signed Out'  | The initial authentication status.                                                                                                                                                  |
| connect          | object    | N/A           | The Greenruhm Connect SDK. In order for this component to work, it is necessary that the SDK is initialized and provided.                                                           |
| ErrorComponent   | component | N/A           | A component to display in case of an error. If `ViewComponent` is passed, this component is ignored because the ViewComponent should handle this.                                   |
| FormComponent    | component | N/A           | A component that renders the sign-in form. If `ViewComponent` is passed, this component is ignored because the ViewComponent should handle this.                                    |
| LoadingComponent | component | N/A           | A component to display while the sign-in process is in progress. If `ViewComponent` is passed, this component is ignored because the ViewComponent should handle this.              |
| onSuccess        | function  | console.log() | A function that will be called upon successful sign-in. The default function logs the user data to the console. [Click here to see the documentation for this function](#onsuccess) |
| SuccessComponent | component | N/A           | A component to display when the sign-in is successful. If `ViewComponent` is passed, this component is ignored because the ViewComponent should handle this.                        |
| ViewComponent    | component | SignInView    | A component that renders the view. By default it uses a Greenruhm provided view.                                                                                                    |

### AuthStatuses

The Sign In Auth Statuses are the following:

- `SignedOut`: `'Signed Out'`
- `SigningIn`: `'Signing In'`
- `SignedIn`: `'Signed In'`

### onSuccess

The `onSuccess` signature is as follows:

```
const onSuccess = ({ authStatus, email, username }) => {};
```

Where:

- `authStatus` is `'Signed In'`
- `email` is the email the user provided
- `username` is the username the user provided

## Example Usage

Below is an example of how to use the `SignIn` component in a React application. This component is ready to work without any prop being passed down to it.

`withConnect` will initialize and provide the Greenruhm SDK to the `SignIn` component.

```jsx
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn from '@greenruhm/connect/ui/components/sign-in';

export default withConnect({ apiKey: '<your-api-key>' })(SignIn);
```

`SignIn` provides a Greenruhm view, but you are welcome to either override the component that will be rendered in each state of the application by passing them through `ErrorComponent`, `FormComponent`, `LoadingComponent`, or `SuccessComponent`, or by overriding all of them at once by passing `ViewComponent`.

The `SignIn` component also accepts the `onSuccess` function as a prop, which will be called after the sign-in process is completed.

## Custom View Components

### ViewComponent

`ViewComponent` overrides the whole implementation of the Greenruhm view. By providing this prop, the client must take care of all the interactions of the user with the application and calling the functions passed as props at the right time.

#### Props

| Prop          | Type     | Description                             |
| ------------- | -------- | --------------------------------------- |
| authStatus    | string   | The current authentication status.      |
| clearErrors   | function | Function to clear any errors.           |
| disabled      | boolean  | If `true`, the form should be disabled. |
| email         | string   | Email of the user.                      |
| errors        | array    | Array of errors, if any.                |
| handleSignIn  | function | Function to handle the sign-in action.  |
| handleSignOut | function | Function to handle the sign-out action. |
| username      | string   | Username of the user.                   |

#### Example Usage

Below is an example of how to use a custom `ViewComponent` as a prop for `SignIn` component.

```jsx
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn, { AuthStatuses } from '@greenruhm/connect/ui/components/sign-in';

const CustomView = ({
  authStatus,
  clearErrors,
  disabled,
  email,
  errors,
  handleSignIn,
  handleSignOut,
  username,
}) => {
  // Your view implementation.
  // You should use `AuthStatuses` to determine what your component should display.
};

const CustomSignIn = (props) => {
  return <SignIn ViewComponent={CustomView} {...props} />;
};

export default withConnect({ apiKey: '<your-api-key' })(CustomSignIn);
```

### FormComponent

`FormComponent` overrides the default Greenruhm provided form. By providing this prop, the client must take care of the interaction of the user with the form as well as rendering the errors (either by using the component passed as a prop - which might be the Greenruhm provided error modal or a custom component - or by implementing a way to render errors, ignoring the `ErrorComponent` prop).

#### Props

| Prop           | Type      | Description                                     |
| -------------- | --------- | ----------------------------------------------- |
| clearErrors    | function  | Function to clear any errors.                   |
| disabled       | boolean   | If `true`, the sign-in button will be disabled. |
| errors         | array     | Array of error messages, if any.                |
| ErrorComponent | component | Component to display in case of an error.       |
| handleSignIn   | function  | Function to handle the sign-in action.          |

#### Example Usage

Below is an example of how to use the `FormComponent` prop in a React application.

```jsx
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn, { AuthStatuses } from '@greenruhm/connect/ui/components/sign-in';

const CustomForm = ({
  clearErrors,
  disabled,
  ErrorComponent,
  handleSignIn,
}) => {
  // Your form implementation
  // Do not forget to implement showing errors.
};

const CustomSignIn = (props) => {
  return <SignIn FormComponent={CustomForm} {...props} />;
};

export default withConnect({ apiKey: '<your-api-key>' })(CustomSignIn);
```

### ErrorComponent

`ErrorComponent` overrides the default Greenruhm provided error component, which is a modal rendered by the provided `FormComponent`. By providing this prop, the user is responsible for displaying and clearing errors.

#### Props

Below is an example of how to use the `ErrorComponent` prop in a React application:

| Prop name    | Type     | Description                                                                                                       |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| errorMessage | string   | The message that is displayed to inform the user of the error.                                                    |
| title        | string   | A title to be displayed to the user. If the default `FormComponent` is used, this value will always be `'Error'`. |
| onClose      | function | A function that clears the errors.                                                                                |

#### Usage

```jsx
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn, { AuthStatuses } from '@greenruhm/connect/ui/components/sign-in';

const CustomError = ({ errorMessage, title, onClose }) => {
  // Your implementation
};

const CustomSignIn = (props) => {
  return <SignIn ErrorComponent={CustomError} {...props} />;
};

export default withConnect({ apiKey: '<your-api-key>' })(CustomSignIn);
```

### LoadingComponent

`LoadingComponent` overrides the default Greenruhm provided loading component. This component receives no props.

#### Example Usage

Below is an example of how to use the `LoadingComponent` prop in a React application.

```jsx
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn, { AuthStatuses } from '@greenruhm/connect/ui/components/sign-in';

const CustomLoading = () => {
  // Your implementation
};

const CustomSignIn = (props) => {
  return <SignIn LoadingComponent={CustomLoading} {...props} />;
};

export default withConnect({ apiKey: '<your-api-key>' })(CustomSignIn);
```

### SuccessComponent

`SuccessComponent` overrides the default Greenruhm provided success component. When building your application using the default Greenruhm view, it might be important to override this view to be able to add navigation to the rest of your application or to dispatch actions or HTTP calls to save the user information in your application, if you need to.

#### Props

| Name          | Type     | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| email         | string   | The email of the signed-in user.                |
| handleSignOut | function | The function to be called to sign-out the user. |
| username      | string   | The username of the signed-in user.             |

#### Example Usage

Below is an example of how to use the `SuccessComponent` prop in a React application:

```javascript
import React from 'react';
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignIn, { AuthStatuses } from '@greenruhm/connect/ui/components/sign-in';

const CustomSuccess = ({ email, handleSignOut, username }) => {
  // Your implementation
  // In here, you can handle saving the user's information
  // and navigating somewhere else in your application, for example.
};

const CustomSignIn = (props) => {
  return <SignIn SuccessComponent={CustomSuccess} {...props} />;
};

export default withConnect({ apiKey: '<your-api-key>' })(CustomSignIn);
```
