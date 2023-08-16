import React from 'react';

import { describe } from 'riteway';
import render from 'riteway/render-component';
import {
  TrashIcon,
  CheckIcon,
  PosterIcon,
  EmbedIcon,
  TallVideoPosterIcon,
  WideVideoPosterIcon,
  FilePosterIcon,
} from './icons.js';

describe('Trash Icon', async (assert) => {
  const $ = render(<TrashIcon />);
  assert({
    given: 'no arguments',
    should: 'render the Trash icon',
    actual: $('.trash-icon').length,
    expected: 1,
  });
});

describe('Check Icon', async (assert) => {
  const $ = render(<CheckIcon />);

  assert({
    given: 'no arguments',
    should: 'render the Check icon',
    actual: $('svg').length,
    expected: 1,
  });
});

describe('Poster Icon', async (assert) => {
  const $ = render(<PosterIcon />);

  assert({
    given: 'no arguments',
    should: 'render the Poster icon',
    actual: $('svg').length,
    expected: 1,
  });
});

describe('Embed Icon', async (assert) => {
  const $ = render(<EmbedIcon />);

  assert({
    given: 'no arguments',
    should: 'render the Embed icon',
    actual: $('svg').length,
    expected: 1,
  });
});

describe('Tall Video Poster Icon', async (assert) => {
  const $ = render(<TallVideoPosterIcon />);

  assert({
    given: 'no arguments',
    should: 'render the Tall Video Poster icon',
    actual: $('svg').length,
    expected: 1,
  });
});

describe('Wide Video Poster Icon', async (assert) => {
  const $ = render(<WideVideoPosterIcon />);

  assert({
    given: 'no arguments',
    should: 'render the Wide Video Poster icon',
    actual: $('svg').length,
    expected: 1,
  });
});

describe('File Poster Icon', async (assert) => {
  const $ = render(<FilePosterIcon />);

  assert({
    given: 'no arguments',
    should: 'render the File Poster icon',
    actual: $('svg').length,
    expected: 1,
  });
});
