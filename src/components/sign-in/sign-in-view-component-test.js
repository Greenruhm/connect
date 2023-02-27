/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SignInView from './sign-in-view-component';

describe('Sign In View w/ Magic Connect', async (assert) => {
  const renderSignInView = (props) => render(<SignInView {...props} />);

  {
    const given = 'a signed out user';
    const props = { authStatus: 'Signed Out' };
    const $ = renderSignInView(props);
    const contains = match($.html());
    {
      const signInTitle = 'Sign In (connect)';
      assert({
        given,
        should: 'render "Sign In" title',
        actual: contains(signInTitle),
        expected: signInTitle,
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
    const $ = renderSignInView(props);
    assert({
      given,
      should: 'render success view component',
      actual: $('.success-view').length,
      expected: 1,
    });
  }
});
