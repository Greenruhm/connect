/* eslint-disable no-unused-vars */
import page from '../src/HOCs/page';
import SignUpConnect from '../src/example-components/sign-up-connect';

const SignUpConnectPage = (props) => <SignUpConnect {...props} />;

export default page(SignUpConnectPage);
