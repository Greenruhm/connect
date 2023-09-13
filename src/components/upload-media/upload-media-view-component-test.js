import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import UploadMedia, {
  ButtonAndDescription,
  MediaPreview,
  defaultInputs,
} from './upload-media-view-component';

describe('Upload Media Component', async (assert) => {
  const $ = render(<UploadMedia />);
  assert({
    given: 'upload media component',
    should: 'render the upload media wrapper',
    actual: $('#upload-media-wrapper').length,
    expected: 1,
  });

  assert({
    given: 'upload media component',
    should: 'render the button "Save And Continue"',
    actual: $('#save').length,
    expected: 1,
  });

  Object.keys(defaultInputs).forEach((key) => {
    if (key == 'customFiles') {
      Object.keys(defaultInputs[key]).forEach((customFileKey) => {
        const { name } = defaultInputs[key][customFileKey];
        assert({
          given: `initial render and input name ${name}`,
          should: `render the UploadInput for ${name}`,
          actual: $(`#upload-input-wrapper:contains(Upload ${name})`).length,
          expected: 1,
        });
      });
    } else {
      const { name } = defaultInputs[key];
      assert({
        given: `initial render and input name ${name}`,
        should: `render the UploadInput for ${name}`,
        actual: $(`#upload-input-wrapper:contains(Upload ${name})`).length,
        expected: 1,
      });
    }
  });
});

describe('MediaPreview Component', async (assert) => {
  const mockProps = {
    name: 'Poster Image',
    files: {
      posterImage: {
        file: 'mockFileUrl',
        name: 'mockFileName',
        thumbnail: '/mockFileUrl',
      },
    },
    id: 'posterImage',
    handleDelete: () => {},
    handleFileChange: () => {},
    description: 'Some mock description',
  };
  const $ = render(<MediaPreview {...mockProps} />);

  assert({
    given: 'props',
    should: 'render the correct name',
    actual: $('#name:contains(Poster Image)').length,
    expected: 1,
  });

  assert({
    given: 'props',
    should: 'render the image with the correct source',
    actual: $('#thumbnail[src*="mockFileUrl"]').length,
    expected: 1,
  });
});

describe('ButtonAndDescription Component', async (assert) => {
  const mockPropsWithImage = {
    files: {
      posterImage: {
        file: 'mockFileUrl',
        name: 'mockFileName',
        thumbnail: 'mockFileUrl',
      },
    },
    id: 'posterImage',
    name: 'Poster Image',
    description: 'Some mock description with image',
    handleFileChange: () => {},
  };
  const mockPropsWithoutImage = {
    files: {},
    name: 'Poster Image',
    description: 'Some mock description without image',
    handleFileChange: () => {},
  };

  // With Image
  {
    const $ = render(<ButtonAndDescription {...mockPropsWithImage} />);

    assert({
      given: 'an image',
      should: 'render the description',
      actual: $(`#description:contains(${mockPropsWithImage.description})`)
        .length,
      expected: 1,
    });

    assert({
      given: 'an image',
      should: 'display "Replace" on the button',
      actual: $(`#input-label:contains(Replace ${mockPropsWithImage.name})`)
        .length,
      expected: 1,
    });
  }

  // Without Image
  {
    const $ = render(<ButtonAndDescription {...mockPropsWithoutImage} />);

    assert({
      given: 'no image',
      should: 'render the description',
      actual: $(`#description:contains(${mockPropsWithoutImage.description})`)
        .length,
      expected: 1,
    });

    assert({
      given: 'no image',
      should: 'display "Upload" on the button',
      actual: $(`#input-label:contains(Upload ${mockPropsWithoutImage.name})`)
        .length,
      expected: 1,
    });
  }
});
