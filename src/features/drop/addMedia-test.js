import { describe } from 'riteway';
import { getUploadParams, mapUploadedMedia } from './addMedia.js';

describe('getUploadParams()', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getUploadParams(),
    expected: [],
  });

  assert({
    given: 'dropId with no params',
    should: 'return an empty array',
    actual: getUploadParams('test'),
    expected: [],
  });

  assert({
    given: 'dropId with bad params',
    should: 'return an empty array',
    actual: getUploadParams('test', { badMedia: 'test' }),
    expected: [],
  });

  assert({
    given: 'dropId with posterImage in params',
    should: 'return an array with the file',
    actual: getUploadParams('testDropId', {
      posterImage: 'testFile',
    }),
    expected: [{ name: 'posterImage', file: 'testFile', dropId: 'testDropId' }],
  });

  assert({
    given: 'dropId with embedImage in params',
    should: 'return an array with the file',
    actual: getUploadParams('testDropId', {
      embedImage: 'testFile',
    }),
    expected: [{ name: 'embedImage', file: 'testFile', dropId: 'testDropId' }],
  });

  assert({
    given: 'dropId with video in params',
    should: 'return an array with the file',
    actual: getUploadParams('testDropId', {
      video: 'testFile',
    }),
    expected: [{ name: 'video', file: 'testFile', dropId: 'testDropId' }],
  });

  assert({
    given: 'dropId with embedImage, posterImage, video in params',
    should: 'return array with the files',
    actual: getUploadParams('testDropId', {
      video: 'testVideoFile',
      posterImage: 'testPosterFile',
      embedImage: 'testEmbedFile',
    }),
    expected: [
      { name: 'posterImage', file: 'testPosterFile', dropId: 'testDropId' },
      { name: 'embedImage', file: 'testEmbedFile', dropId: 'testDropId' },
      { name: 'video', file: 'testVideoFile', dropId: 'testDropId' },
    ],
  });

  assert({
    given: 'dropId with embedImage, posterImage, video and badMedia in params',
    should: 'return an array with only good params',
    actual: getUploadParams('testDropId', {
      video: 'testVideoFile',
      posterImage: 'testPosterFile',
      embedImage: 'testEmbedFile',
      badMedia: 'testBadMedia',
    }),
    expected: [
      { name: 'posterImage', file: 'testPosterFile', dropId: 'testDropId' },
      { name: 'embedImage', file: 'testEmbedFile', dropId: 'testDropId' },
      { name: 'video', file: 'testVideoFile', dropId: 'testDropId' },
    ],
  });
});

describe('mapUploadedMedia()', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return empty object',
    actual: mapUploadedMedia(),
    expected: {},
  });

  assert({
    given: 'array with cloudinary responses',
    should: 'map the responses correctly',
    actual: mapUploadedMedia([
      {
        name: 'test-name',
        url: 'test-url',
        public_id: 'test-public-id',
        resource_type: 'test-resource-type',
        type: 'test-type',
      },
      {
        name: 'test-name-2',
        url: 'test-url-2',
        public_id: 'test-public-id-2',
        resource_type: 'test-resource-type-2',
        type: 'test-type-2',
      },
    ]),
    expected: {
      'test-name': {
        cloudinaryUrl: 'test-url',
        cloudinaryPublicId: 'test-public-id',
        cloudinaryResourceType: 'test-resource-type',
        cloudinaryType: 'test-type',
      },
      'test-name-2': {
        cloudinaryUrl: 'test-url-2',
        cloudinaryPublicId: 'test-public-id-2',
        cloudinaryResourceType: 'test-resource-type-2',
        cloudinaryType: 'test-type-2',
      },
    },
  });
});
