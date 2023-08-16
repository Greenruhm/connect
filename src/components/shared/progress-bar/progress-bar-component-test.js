import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import ProgressBar from './progress-bar-component';

describe('Progress Bar Component', async (assert) => {
  const $ = render(<ProgressBar className="progress-bar" />);

  assert({
    given: 'progress bar component',
    should: 'render progress bar',
    actual: $('.progress-bar').length,
    expected: 1,
  });
});
