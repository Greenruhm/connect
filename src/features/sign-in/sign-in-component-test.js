/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignIn from './sign-in-component';

describe('Sign In Page', async assert => {
  const renderSignInPage = props => render(<SignIn {...props} />);

  {
    const props = { authStatus: 'Signed Out' };
    const $ = renderSignInPage(props);
    const contains = match($.html());
    {
      const signInTitle = 'Sign In';
      assert({
        given: 'sign in page',
        should: 'render "Sign In" title',
        actual: contains(signInTitle),
        expected: signInTitle,
      });
    }
    {
      const emailLabelText = 'Your Email';
      const emailInputPlaceholder = 'youremail@example.com';
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
    }
    {
      assert({
        given: 'sign in page',
        should: 'render "Sign In" button',
        actual: $('[name="sign-in"]').length,
        expected: 1,
      });
    }
    {
      const orSignUpLinkText = 'Or Sign Up';
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
    }
  }
  {
    const props = { authStatus: 'Signed In' };
    const $ = renderSignInPage(props);
    assert({
      given: 'sign up page w "authStatus = Signed Up"',
      should: 'render success view component',
      actual: $('.success-view').length,
      expected: 1,
    });
  }
});
