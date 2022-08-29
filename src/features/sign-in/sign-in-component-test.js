/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignIn from './sign-in-component';

describe('Sign In Page', async assert => {
  const signInTitle = 'Sign In';
  const emailLabelText = 'Your Email';
  const emailInputPlaceholder = 'youremail@example.com';
  const orSignUpLinkText = 'Or Sign Up';

  const $ = render(<SignIn />);
  const contains = match($.html());

  assert({
    given: 'sign in page',
    should: 'render "Sign In" title',
    actual: contains(signInTitle),
    expected: signInTitle,
  });
  assert({
    given: 'sign in page',
    should: 'render email input',
    actual: $('.email').length,
    expected: 1,
  });
  assert({
    given: 'sign in page',
    should: 'render "Your email" label text',
    actual: contains(emailLabelText),
    expected: emailLabelText,
  });
  assert({
    given: 'sign in page',
    should: 'render email input placeholder text',
    actual: contains(emailInputPlaceholder),
    expected: emailInputPlaceholder,
  });
  assert({
    given: 'sign in page',
    should: 'render "Sign In" button',
    actual: $('[name="sign-in"]').length,
    expected: 1,
  });
  assert({
    given: 'sign in page',
    should: 'render "Or Sign Up" page link',
    actual: $('.sign-up').length,
    expected: 1,
  });
  assert({
    given: 'sign in page',
    should: 'render "Or Sign Up" link label',
    actual: contains(orSignUpLinkText),
    expected: orSignUpLinkText,
  });
});
