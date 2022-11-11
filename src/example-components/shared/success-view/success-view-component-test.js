/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SuccessView from './success-view-component';

describe('Success view Component', async (assert) => {
  const renderSuccessView = (props) => render(<SuccessView {...props} />);

  {
    const $ = renderSuccessView();
    const contains = match($.html());
    const successTitle = 'Success';
    assert({
      given: 'no arguments',
      should: 'render the "Success" title',
      actual: contains(successTitle),
      expected: successTitle,
    });
  }
  {
    const successMessage = 'Your Greenruhm account has been created! 🎉';
    const props = { successMessage };
    const $ = renderSuccessView(props);
    const contains = match($.html());
    assert({
      given: 'a message to render',
      should: 'render the success message',
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
      given: 'an email',
      should: 'render the email label',
      actual: contains(emailLabel),
      expected: emailLabel,
    });
    assert({
      given: 'an email',
      should: 'render the email value',
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
      given: 'an username',
      should: 'render the username label',
      actual: contains(usernameLabel),
      expected: usernameLabel,
    });
    assert({
      given: 'an username',
      should: 'render the username value',
      actual: contains(username),
      expected: username,
    });
  }
  {
    const $ = renderSuccessView();
    const contains = match($.html());
    const signOutLabel = 'Sign Out';
    assert({
      given: 'no arguments',
      should: 'render "Sign Out" button',
      actual: contains(signOutLabel),
      expected: signOutLabel,
    });
  }
});
