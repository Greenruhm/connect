/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignUp from './sign-up-component';

describe('Sign Up Page', async (assert) => {
  const renderSignUpPage = (props) => render(<SignUp {...props} />);
  {
    const given = 'a signed out user';
    const props = { authStatus: 'Signed Out' };
    const $ = renderSignUpPage(props);
    const contains = match($.html());
    {
      const signUpTitle = 'Sign Up';
      assert({
        given,
        should: 'render "Sign Up" title',
        actual: contains(signUpTitle),
        expected: signUpTitle,
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
      const userNameLabelText = 'Username';
      const userNamePlaceholder = 'kendrick-lamar-fan-2001';
      assert({
        given,
        should: 'render username input',
        actual: $('.username').length,
        expected: 1,
      });
      assert({
        given,
        should: 'render "Username" label text',
        actual: contains(userNameLabelText),
        expected: userNameLabelText,
      });
      assert({
        given,
        should: 'render username input placeholder text',
        actual: contains(userNamePlaceholder),
        expected: userNamePlaceholder,
      });
    }
    {
      assert({
        given,
        should: 'render "Sign Up" button',
        actual: $('[name="sign-up"]').length,
        expected: 1,
      });
    }
    {
      const orSignInLinkText = 'Or Sign In';
      assert({
        given,
        should: 'render "Or Sign In" link',
        actual: contains(orSignInLinkText),
        expected: orSignInLinkText,
      });
    }
  }
  {
    const given = 'a signed up user';
    const props = { authStatus: 'Signed Up' };
    const $ = renderSignUpPage(props);
    assert({
      given,
      should: 'render success view component',
      actual: $('.success-view').length,
      expected: 1,
    });
  }
});
