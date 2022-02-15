const {
  getCloudinarySignature,
  updateDropMedia,
} = require('../../services/greenruhm-api');
const { uploadToCloudinary } = require('../../services/cloudinary-api');

const uploadImage = async ({ name, dropId, file }) => {
  const {
    apiKey,
    cloudName,
    signature,
    timestamp,
  } = await getCloudinarySignature({ name, dropId });
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
}

const addMedia = async (dropId, params) => {
  const keys = ['posterImage', 'embedImage', 'video'];
  const responses = await Promise.all(
    keys.map((name) => {
      const { file } = params[name] || {};
      if (!file) return;
      return uploadImage({ name, file, dropId });
    })
  );
  const media = responses.filter(x => x).reduce((media, file) => {
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
  const udpatedDrop = await updateDropMedia(dropId, media);
};

module.exports = addMedia;
