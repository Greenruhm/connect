# Index

Greenruhm provides these components as a way to simplify the integration with it. These components can be used with close to none modifications.

## Configuration

To use Greenruhm components, the components should be provided with the Greenruhm SDK as a prop. The easiest way to do it is by using our provided HOC:

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

const pageHOC = (Component) =>
  compose(withRedux, withConnect({ apiKey: '<your-api-key>' }))(Component);

export default pageHOC;
```

And `pageHOC` can be used like this:

```jsx
import pageHOC from 'page-hoc';
import SignUp from '@greenruhm/connect/ui/components/sign-up';

export default pageHOC(SignUp);
```

It is important to note that, if you want to manually configure the Greenruhm Connect SDK, you can. In order to use the Greenruhm provided components, you need to import the Greenruhm Connect SDK from `@greenruhm/connect/ui` instead of `@greenruhm/connect`.

```jsx
import connect from '@greenruhm/connect/ui';

// Initialize connect to be used in your application
connect({ apiKey: '<your-api-key>' });

// Your application code
```

And to use it in your components and pass it down to Greenruhm provided components:

```jsx
import useConnect from '@greenruhm/connect/ui';
import SignUp from '@greenruhm/connect/ui/components/sign-up';

const CustomSignUp = (props) => {
  const connectSDK = useConnect();

  return <SignUp connect={connectSDK} {...props} />;
};

export default CustomSignUp;
```

And, finally, you might want to create your own components and deal with calling the Greenruhm Connect SDK methods yourself. In that case, just configure the SDK as showed above and use `useConnect`.

## Components

[Sign Up](./sign-up.md)
[Sign In](./sign-in.md)
