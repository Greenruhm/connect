import fetch from 'isomorphic-fetch';

export const uploadToCloudinary = async ({
  file,
  name,
  dropId,
  signature,
  timestamp,
  apiKey,
  cloudName
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('public_id', name);
  formData.append('folder', dropId);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

export default {
  uploadToCloudinary
};
