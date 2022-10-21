/* eslint-disable no-unused-vars */
import { Feature } from '@paralleldrive/react-feature-toggles';
import page from '../src/HOCs/page';
import SignUpAuth from '../src/features/sign-up';
import SignUpConnect from '../src/features/sign-up-connect';

const SignUpPage = () => (
  <Feature
    activeComponent={SignUpConnect}
    inactiveComponent={SignUpAuth}
    name="magic-connect"
  />
);

export default page(SignUpPage);
