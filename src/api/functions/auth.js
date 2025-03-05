import axios from 'axios';
import configured_axios from '../axiosInstance';
import {endpoints} from '../endpoints';
import {MMKV} from 'react-native-mmkv';
import {useAuthContext} from '../authContext';

const storage = new MMKV();

export const vendorRegistration = async body => {
  try {
    // console.log(body);
    const res = await configured_axios.post(endpoints.vendor.signup, body);
    storage.set('user_token', res.data.tokens.access);
    storage.set('refresh_token', res.data.tokens.refresh);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log('error is' + err);
  }
};

export const vendorLogin = async (email, password) => {
  try {
    const res = await configured_axios.post(endpoints.vendor.login, {
      email,
      password,
    });
    storage.set('user_token', res.data.access_token);
    storage.set('refresh_token', res.data.refresh_token);
    storage.set('user', JSON.stringify(res.data.vendor));
    console.log('Login successful:', res.data);
    return res.data;
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = storage.getString('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }

    const res = await configured_axios.post(endpoints.vendor.refresh, {
      refresh: refreshToken,
    });

    if (res.data && res.data.access) {
      storage.set('user_token', res.data.access); // Store new access token
      console.log('Access token refreshed:', res.data.access);
      return res.data.access;
    } else {
      throw new Error('Invalid response from token refresh API.');
    }
  } catch (error) {
    console.error(
      'Error refreshing access token:',
      error.response?.data || error.message,
    );
    return null;
  }
};
