/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SuccessView from './success-view-component';

describe('Success view Component', async assert => {
  const renderSuccessView = props => render(<SuccessView {...props} />);

  {
    const $ = renderSuccessView();
    const contains = match($.html());
    const successTitle = 'Success';
    assert({
      given: 'success view',
      should: 'render "Success" title',
      actual: contains(successTitle),
      expected: successTitle,
    });
    assert({
      given: 'success view',
      should: 'render title divider',
      actual: $('.title-divider').length,
      expected: 1,
    });
  }
  {
    const successMessage = 'Your Greenruhm account has been created! 🎉';
    const props = { successMessage };
    const $ = renderSuccessView(props);
    const contains = match($.html());
    assert({
      given: 'success view w/ "successMessage" prop',
      should: 'render "successMessage"',
      actual: contains(successMessage),
      expected: successMessage,
    });
  }
  {
    const emailLabel = 'Email';
    const email = 'test@greenruhm.com';
    const props = { email };
    const $ = renderSuccessView(props);
    const contains = match($.html());
    assert({
      given: 'success view w/ "email" prop',
      should: 'render "Email" field',
      actual: $('.email').length,
      expected: 1,
    });
    assert({
      given: 'success view w/ "email" prop',
      should: 'render "Email" label',
      actual: contains(emailLabel),
      expected: emailLabel,
    });
    assert({
      given: 'success view w/ "email" prop',
      should: 'render "email" value',
      actual: contains(email),
      expected: email,
    });
  }
  {
    const usernameLabel = 'Username';
    const username = 'greenruhm-fan-24';
    const props = { username };
    const $ = renderSuccessView(props);
    const contains = match($.html());
    assert({
      given: 'success view w/ "username" prop',
      should: 'render "Email" field',
      actual: $('.username').length,
      expected: 1,
    });
    assert({
      given: 'success view w/ "username" prop',
      should: 'render "Username" label',
      actual: contains(usernameLabel),
      expected: usernameLabel,
    });
    assert({
      given: 'success view w/ "username" prop',
      should: 'render "username" value',
      actual: contains(username),
      expected: username,
    });
  }
  {
    const $ = renderSuccessView();
    const contains = match($.html());
    const signOutLabel = 'Sign Out';
    assert({
      given: 'success view',
      should: 'render "Sign Out" button',
      actual: $('[name="sign-out"]').length,
      expected: 1,
    });
    assert({
      given: 'success view',
      should: 'render "Sign Out" button label',
      actual: contains(signOutLabel),
      expected: signOutLabel,
    });
  }
});
