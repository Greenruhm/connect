/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignUpView from './sign-up-view-component';
import { renderToReadableStream } from 'react-dom/server';

describe('Sign Up View w/ Magic Connect', async (assert) => {
  const renderSignUpView = (props) => render(<SignUpView {...props} />);
  {
    const given = 'a signed out user';
    const props = { authStatus: 'Signed Out' };
    const $ = renderSignUpView(props);
    const contains = match($.html());
    {
      const signUpTitle = 'Sign Up (connect)';
      assert({
        given,
        should: 'render "Sign Up" title',
        actual: contains(signUpTitle),
        expected: signUpTitle,
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
    const $ = renderSignUpView(props);
    assert({
      given,
      should: 'render success view component',
      actual: $('.success-view').length,
      expected: 1,
    });
  }
});
