/* eslint-disable no-unused-vars */
import page from '../src/HOCs/page';
import SignUp from '../src/example-components/sign-up';

const SignUpPage = (props) => <SignUp {...props} />;

export default page(SignUpPage);
