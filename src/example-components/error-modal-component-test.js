/* eslint-disable no-unused-vars */
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import ErrorModal from './error-modal-component';

describe('Errors View Component', async assert => {
  const renderErrorModal = props => render(<ErrorModal {...props} />);
});
