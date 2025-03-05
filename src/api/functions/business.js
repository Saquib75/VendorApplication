import {MMKV} from 'react-native-mmkv';
import configured_axios from '../axiosInstance';
import {endpoints} from '../endpoints';
const storage = new MMKV();
export const getVendorBusiness = async id => {
  try {
    const res = await configured_axios.get(
      endpoints.business.getVendorBusiness + id,
    );
    console.log('hi', res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
