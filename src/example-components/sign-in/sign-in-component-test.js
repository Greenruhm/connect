/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignIn from './sign-in-component';

describe('Sign In Page', async (assert) => {
  const renderSignInPage = (props) => render(<SignIn {...props} />);

  {
    const given = 'a signed out user';
    const props = { authStatus: 'Signed Out' };
    const $ = renderSignInPage(props);
    const contains = match($.html());
    {
      const signInTitle = 'Sign In';
      assert({
        given,
        should: 'render "Sign In" title',
        actual: contains(signInTitle),
        expected: signInTitle,
      });
    }
    {
      const emailLabelText = 'Your Email';
      const emailInputPlaceholder = 'youremail@example.com';
      assert({
        given,
        should: 'render email input',
        actual: $('.email').length,
        expected: 1,
      });
      assert({
        given,
        should: 'render "Your email" label text',
        actual: contains(emailLabelText),
        expected: emailLabelText,
      });
      assert({
        given,
        should: 'render email input placeholder text',
        actual: contains(emailInputPlaceholder),
        expected: emailInputPlaceholder,
      });
    }
    {
      assert({
        given,
        should: 'render "Sign In" button',
        actual: $('[name="sign-in"]').length,
        expected: 1,
      });
    }
    {
      const orSignUpLinkText = 'Or Sign Up';
      assert({
        given,
        should: 'render "Or Sign Up" link',
        actual: contains(orSignUpLinkText),
        expected: orSignUpLinkText,
      });
    }
  }
  {
    const given = 'a signed in user';
    const props = { authStatus: 'Signed In' };
    const $ = renderSignInPage(props);
    assert({
      given,
      should: 'render success view component',
      actual: $('.success-view').length,
      expected: 1,
    });
  }
});
