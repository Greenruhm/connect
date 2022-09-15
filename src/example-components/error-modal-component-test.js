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
      given: 'error modal component',
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
      given: 'error modal component',
      should: 'render "Error!" title',
      actual: contains(title),
      expected: title,
    });
    assert({
      given: 'error modal component',
      should: 'render title divider',
      actual: $('.title-divider').length,
      expected: 1,
    });
  }
  {
    const errorMessage = 'An account already exists for this email.';
    const props = { errorMessage };
    const $ = renderErrorModal(props);
    const contains = match($.html());
    assert({
      given: 'error modal component w/ "errorMessage" prop',
      should: 'render "errorMessage"',
      actual: contains(errorMessage),
      expected: errorMessage,
    });
    assert({
      given: 'error modal component w/ "errorMessage" prop',
      should: 'render error message',
      actual: $('.error-message').length,
      expected: 1,
    });
  }
  {
    const $ = renderErrorModal();
    const contains = match($.html());
    const tryAgainLabel = 'Try Again';
    assert({
      given: 'error modal component',
      should: 'render "Try Again" button',
      actual: $('[name="try-again"]').length,
      expected: 1,
    });
    assert({
      given: 'error modal component',
      should: 'render "Try Again" button label',
      actual: contains(tryAgainLabel),
      expected: tryAgainLabel,
    });
  }
});
