/* eslint-disable no-unused-vars */
import page from '../src/HOCs/page';
import SignInConnect from '../src/example-components/sign-in-connect';

const SignInConnectPage = (props) => <SignInConnect {...props} />;

export default page(SignInConnectPage);
