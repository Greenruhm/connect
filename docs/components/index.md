# Index

Greenruhm provides these components as a way to simplify the integration with the project. These components can be used with close to no modifications.

## App Configuration

If you want to use the Greenruhm React components, you need to import the Greenruhm Connect SDK from `@greenruhm/connect/ui` instead of `@greenruhm/connect.`

```jsx
import connect from '@greenruhm/connect/ui';

// Initialize connect to be used in your application
connect({ apiKey: '<your-api-key>' });

// Your application code
```

## Components configuration

To use Greenruhm components, the components should be provided with the Greenruhm SDK as a prop. Below we list different methods you can use.

### withConnect HOC

The easiest way to do it is by using our provided HOC:

```jsx
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import SignUp from '@greenruhm/connect/ui/components/sign-up';

export default withConnect({ apiKey: '<your-api-key>' })(SignUp);
```

As an HOC, it can be composed with many HOCs to be provided to your application:

```jsx
import withConnect from '@greenruhm/connect/ui/components/with-connect';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';

const withRedux = (Component) => (props) => {
  return (
    <ReduxProvider store={store}>
      <Component {...props} />
    </ReduxProvider>
  );
};

const withProviders = compose(
  withRedux,
  withConnect({ apiKey: '<your-api-key>' })
);

export default withProviders;
```

And `withProviders` can be used like this:

```jsx
import withProviders from 'with-providers';
import SignUp from '@greenruhm/connect/ui/components/sign-up';

export default withProviders(SignUp);
```

## useConnect hook

You can also use our provided hook to get the Greenruhm Connect SDK and pass it down:

```jsx
import useConnect from '@greenruhm/connect/ui';
import SignUp from '@greenruhm/connect/ui/components/sign-up';

const CustomSignUp = (props) => {
  const connectSDK = useConnect();

  return <SignUp connect={connectSDK} {...props} />;
};

export default CustomSignUp;
```

## Components

[Sign Up](./sign-up.md)
[Sign In](./sign-in.md)
