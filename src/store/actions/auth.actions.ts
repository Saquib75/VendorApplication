// authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
// import authService from '../../services/auth.service';
import Storage from '../../utils/storage.utils';
import { Alert } from 'react-native';
import { confirmAsyncAlert } from '../../utils/functions.utils';
import authService from '../../services/auth.service';

export const setLogin = createAsyncThunk("auth/login",
    async (data:any, { rejectWithValue, ...rest }) => {
        try {
            //return logged in user data
            console.log("req", data);
            const verify_res:any = await authService.verify_otp(data)
            // console.log("verify_res" ,verify_res);
            await Storage.setKey("token", verify_res.data.access_token)
            await Storage.setKey("r-token", verify_res.data.refreshToken)
            console.log("ENTER 1");
            const user:any = await authService.get_user_data()
            console.log("ENTER 2");
            await Storage.setKey("user-id", user?.data?.data?._id)
            // console.log(user);
            // throw new Error("Testing")
            return {
                user: user?.data?.data,
                token: verify_res.data.access_token,
            }
        } catch (error) {
            console.log("Error =>", error);
            return rejectWithValue("some error happened");
        }
    }
)

export const setLogout = createAsyncThunk("auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const isConfirmed = await confirmAsyncAlert({
                title: "Logout",
                body: "Are you sure want to logout ?",
                yesText: "Logout",
                yesAction: async () => {
                    await Storage.removeKey('token')
                    await Storage.removeKey('r-token')
                },
                noText: "Cancel",
                noAction: () => { }
            })
            if (!isConfirmed) {
                return rejectWithValue("Cancelled")
            }
            console.log("Logged Out");
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
)
export const getUser = createAsyncThunk("auth/getuser",
    async (_, { rejectWithValue ,dispatch}) => {
        try {
            const token = await Storage.getItem('token')
            if (token) {
                const userRes:any = await authService.get_user_data();
                return {
                    user: userRes.data.data,
                    checkInStatus : userRes.data.checkInStatus,
                    token,
                }
            } else {
                return rejectWithValue("No login detected");
            }
        } catch (error) {
            return rejectWithValue("Unauthenticated");
        }
    }
)
export const updateUserLocation = createAsyncThunk("auth/update/location",
    async (address, { rejectWithValue }) => {
        try {
            return address
        } catch (error) {
            return rejectWithValue("Can't update user");
        }
    }
)
export const updateCheckinStatus = createAsyncThunk("auth/update/checkin",
    async (checkin_data, { rejectWithValue }) => {
        try {
            return checkin_data
        } catch (error) {
            return rejectWithValue("Can't update user");
        }
    }
)
export const updateUser = createAsyncThunk("auth/update",
    async (user_form_data, { rejectWithValue }) => {
        try {
            // const res = await authService.update_user(user_form_data)
            // return res.data.data
        } catch (error) {
            return rejectWithValue("Can't update user");
        }
    }
)

export const deleteAccount = createAsyncThunk("auth/deleteAccount",
    async (_, { rejectWithValue }) => {
        try {
            const isConfirmed = await confirmAsyncAlert({
                title: "Account Deletion",
                body: "Are you sure want to delete your account? This process couldn't be undone further.",
                yesText: "Delete",
                yesAction: async () => {
                    await authService.delete_account();
                    await Storage.clear()
                },
                noText: "Cancel",
                noAction: () => { }
            })
            if (!isConfirmed) {
                return rejectWithValue("Cancelled")
            }
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
)