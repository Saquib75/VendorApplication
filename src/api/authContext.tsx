import React, {createContext, useContext, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import configured_axios from './axiosInstance';
import {refreshAccessToken} from './functions/auth';
type Vendor = {
  id: number;
  full_name: String;
  phone: String;
  email: String;
  address: String;
  city: String;
  state: String;
  country: String;
  pin: String;
  vendor: boolean;
};
type UserContextType = {
  user: Vendor | null;
  authLoading: boolean;
  get_user: () => void;
  setUser: React.Dispatch<React.SetStateAction<Vendor | null>>;
};

const Auth = createContext<UserContextType>({
  user: null,
  authLoading: true,
  get_user: () => {},
  setUser: () => {},
});

export const useAuthContext = () => useContext(Auth);

export default function AuthContext({children}: {children: React.ReactNode}) {
  const storage = new MMKV();
  const [user, setUser] = useState<Vendor | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    get_user();
    refreshAccessToken();
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 240000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const get_user = () => {
    const userData = JSON.parse(storage.getString('user') || '{}');
    setUser(userData);
    //  if (!userToken) return;
    //  configured_axios
    //    .get('/auth/user/', {headers: {Authorization: `Bearer ${userToken}`}})
    //    .then(res => {
    //      setUser(res.data);
    //    })
    //    .catch(err => {
    //      console.error(
    //        'Error fetching user:',
    //        err.response?.data || err.message,
    //      );
    //    })
    //    .finally(() => setAuthLoading(false));
  };
  console.log('userToken', storage.getString('user_token'));
  console.log('refreshToken', storage.getString('refresh_token'));
  console.log('user is ', user);

  // storage.clearAll();
  return (
    <Auth.Provider value={{user, setUser, authLoading, get_user}}>
      {children}
    </Auth.Provider>
  );
}
