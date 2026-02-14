import { TIMEOUT_SEC } from './config.js';

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getJsonData = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error(`Recipe not found (${response.status})`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJsonData = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error(`Recipe not found (${response.status})`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
