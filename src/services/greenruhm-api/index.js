import fetch from 'isomorphic-fetch';
const GREENRUHM_URL =
  process.env.NEXT_PUBLIC_GREENRUHM_URL || 'https://greenruhm.com';

const fetchDropsHandler = type => async id => {
  const response = await fetch(`${GREENRUHM_URL}/api/drops/${type}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
};

const fetchDrop = fetchDropsHandler('drop');
const getDrop = async id => {
  try {
    const drop = await fetchDrop(id);
    return drop;
  } catch (error) {
    return null;
  }
};

const createDrop = async dropData => {
  const response = await fetch(`${GREENRUHM_URL}/api/drops/drop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(dropData)
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
};

export const getCloudinarySignature = async ({
  name: public_id,
  dropId: folder
} = {}) => {
  const res = await fetch(`/api/upload/get-cloudinary-signature`, {
    method: 'POST',
    body: JSON.stringify({ public_id, folder })
  });
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

export const updateDropMedia = async (dropId, media) => {
  const res = await fetch(`/api/drops/drop/${dropId}/update`, {
    method: 'PATCH',
    body: JSON.stringify(media)
  });
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
export default {
  getDrop,
  createDrop,
  getCloudinarySignature,
  updateDropMedia
};
