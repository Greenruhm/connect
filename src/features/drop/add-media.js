const {
  getCloudinarySignature,
  updateDropMedia,
} = require('../../services/greenruhm-api/index.js');
const { uploadToCloudinary } = require('../../services/cloudinary-api/index.js');

const getUploadParams = (dropId, params = {}) => {
  if (!dropId) return [];
  const fileTypes = ['posterImage', 'embedImage', 'video'];
  return fileTypes
    .map((name) => {
      const file = params[name] || null;
      if (!file) return;
      return { name, file, dropId };
    })
    .filter((x) => x);
};

const mapUploadedMedia = (responses = []) =>
  responses.reduce((media, file) => {
    return {
      ...media,
      [file.name]: {
        cloudinaryUrl: file.url,
        cloudinaryPublicId: file.public_id,
        cloudinaryResourceType: file.resource_type,
        cloudinaryType: file.type,
      },
    };
  }, {});

const uploadImage = async ({ name, dropId, file }) => {
  const { apiKey, cloudName, signature, timestamp } =
    await getCloudinarySignature({ name, dropId });
  const response = await uploadToCloudinary({
    file,
    name,
    dropId,
    apiKey,
    cloudName,
    signature,
    timestamp,
  });
  return {
    ...response,
    name,
    dropId,
  };
};

const addMedia = dropId => async (params) => {
  const uploadedMedia = await Promise.all(
    getUploadParams(dropId, params).map(uploadImage)
  );
  return updateDropMedia(dropId, mapUploadedMedia(uploadedMedia));
};

module.exports.addMedia = addMedia;
module.exports.getUploadParams = getUploadParams;
module.exports.mapUploadedMedia = mapUploadedMedia;
