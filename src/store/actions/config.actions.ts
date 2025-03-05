// authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
// import authService from '../../services/auth.service';
import Storage from '../../utils/storage.utils';
import { Alert } from 'react-native';
import { confirmAsyncAlert } from '../../utils/functions.utils';
import authService from '../../services/auth.service';
// import configService from '../../services/config.service';

export const getConfigs = createAsyncThunk("config/get",
    async (_, { rejectWithValue }) => {
        try {

        // const configRes: any = await configService.getConfigs()
        //     return {
        //         data: configRes?.data?.data?.[0]
        //     }

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)