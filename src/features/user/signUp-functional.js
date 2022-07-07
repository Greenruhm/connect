// Testing /pages/signIn with TestCafe
// import { describe } from 'riteway';
// import cuid from 'cuid';

// import connect from '../../index';
// const { signUp } = connect('test_success');

// describe('connect.signUp()', async (assert) => {
//   const email = `test+success_id${cuid()}@magic.link`;
//   const user = await signUp({ email });

//   assert({
//     given: 'the user does not exist',
//     should: 'resolve with the new user',
//     actual: user.email,
//     expected: email,
//   });

//   assert({
//     given: 'the user needs setup',
//     should: 'require setup',
//     actual: user.needsAccountSetup,
//     expected: true,
//   });
// });
