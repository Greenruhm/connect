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
export const getDrop = async id => {
  try {
    const drop = await fetchDrop(id);
    return drop;
  } catch (error) {
    return null;
  }
};

export const createDrop = async dropData => {
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
  const res = await fetch(
    `${GREENRUHM_URL}/api/upload/get-cloudinary-signature`,
    {
      method: 'POST',
      body: JSON.stringify({ public_id, folder })
    }
  );
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

export const updateDropMedia = async (dropId, media) => {
  const res = await fetch(`${GREENRUHM_URL}/api/drops/drop/${dropId}/update`, {
    method: 'PATCH',
    body: JSON.stringify(media)
  });
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

export const getProfile = async walletAddress => {
  const res = await fetch(`${GREENRUHM_URL}/api/profile/${walletAddress}`);

  // Return an empty object if the user doesn't exist.
  if (res.status === 404) {
    return { [walletAddress]: {} };
  }

  const response = await res.json();

  // Throw if we see a different kind of error. We have no idea what went wrong in this case.
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

export const updateLastSignedIn = async id =>
  fetch(`${GREENRUHM_URL}/api/sign-in`, {
    method: 'POST',
    body: JSON.stringify({ id })
  });

export const createUser = async ({
  displayName,
  username,
  email,
  walletAddress
} = {}) => {
  const res = await fetch(`${GREENRUHM_URL}/api/create-account`, {
    method: 'POST',
    body: JSON.stringify({ displayName, username, email, walletAddress })
  });

  // Check for errors we can handle.
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  const body = await res.json();
  if (body.error) {
    throw new Error(body.error);
  }
  return body;
};

export default {
  getDrop,
  createDrop,
  getCloudinarySignature,
  updateDropMedia,
  getProfile,
  updateLastSignedIn,
  createUser
};
