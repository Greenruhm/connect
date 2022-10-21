/* eslint-disable no-unused-vars */
import { Feature } from '@paralleldrive/react-feature-toggles';
import page from '../src/HOCs/page';
import SignInAuth from '../src/features/sign-in';
import SignInConnect from '../src/features/sign-in-connect';

const SignInPage = () => (
  <Feature
    activeComponent={SignInConnect}
    inactiveComponent={SignInAuth}
    name="magic-connect"
  />
);

export default page(SignInPage);
