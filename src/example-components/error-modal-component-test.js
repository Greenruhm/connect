/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import ErrorModal from './error-modal-component';

describe('Errors View Component', async assert => {
  const renderErrorModal = props => render(<ErrorModal {...props} />);

  {
    const $ = renderErrorModal();
    assert({
      given: 'no arguments',
      should: 'render "X" close icon',
      actual: $('.x-close-wrapper').length,
      expected: 1,
    });
  }
  {
    const title = 'Error!';
    const props = { title };
    const $ = renderErrorModal(props);
    const contains = match($.html());
    assert({
      given: 'no arguments',
      should: 'render error modal title',
      actual: contains(title),
      expected: title,
    });
  }
  {
    const errorMessage = 'An account already exists for this email.';
    const props = { errorMessage };
    const $ = renderErrorModal(props);
    const contains = match($.html());
    assert({
      given: 'error message',
      should: 'render the error message',
      actual: contains(errorMessage),
      expected: errorMessage,
    });
  }
  {
    const $ = renderErrorModal();
    const contains = match($.html());
    const tryAgainLabel = 'Try Again';
    assert({
      given: 'no arguments',
      should: 'render "Try Again" button',
      actual: contains(tryAgainLabel),
      expected: tryAgainLabel,
    });
  }
});
