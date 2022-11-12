/* eslint-disable no-unused-vars */
import page from '../src/HOCs/page';
import SignIn from '../src/example-components/sign-in';

const SignInPage = (props) => <SignIn {...props} />;

export default page(SignInPage);
