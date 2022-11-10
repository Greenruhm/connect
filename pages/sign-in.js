/* eslint-disable no-unused-vars */
import { Feature } from '@paralleldrive/react-feature-toggles';
import page from '../src/HOCs/page';
import SignInAuth from '../src/features/sign-in';
import SignInConnect from '../src/features/sign-in-connect';

const SignInPage = (props) => {
  const active = () => {
    return <SignInConnect {...props} />;
  };
  const inactive = () => {
    return <SignInAuth {...props} />;
  };

  return (
    <Feature
      activeComponent={active}
      inactiveComponent={inactive}
      name="magic-connect"
    />
  );
};

export default page(SignInPage);
