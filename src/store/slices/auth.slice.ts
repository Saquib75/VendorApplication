import {createSlice} from '@reduxjs/toolkit'
import { deleteAccount, getUser, setLogin, setLogout, updateCheckinStatus, updateUser, updateUserLocation } from '../actions/auth.actions'
import { STATUSES } from '../../utils/constants.util'

const initialState = {
    loading : false,
    token : null,
    user :{},
    checkInStatus : {
        _id: "",
        breakObj: [],
        checkInStatus: false,
        storeId: "",
    },
    error: null,
    loggedIn : false,
    status : STATUSES.FAILED,
}

const authSlice = createSlice({
    name : 'auth',
    reducers : {},
    initialState,
    extraReducers :(builder)=> {
        //login
        builder.addCase(setLogin.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(setLogin.fulfilled, (state , action:any)=>{
            state.loading = false
            state.loggedIn = true;
            state.user  = action.payload.user;
            state.token  = action.payload.token;
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(setLogin.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
            state.loggedIn = false;
        })


        //logout
        builder.addCase(setLogout.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(setLogout.fulfilled, (state , action:any)=>{
            state.loading = false
            state.loggedIn = false;
            state.user  = {}
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(setLogout.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
        //deleteAccount
        builder.addCase(deleteAccount.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(deleteAccount.fulfilled, (state , action:any)=>{
            state.loading = false
            state.loggedIn = false;
            state.user  = {}
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(deleteAccount.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })

        //get user
        builder.addCase(getUser.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state , action:any)=>{
            state.loading = false
            state.loggedIn = true;
            state.user  = action.payload.user;
            state.checkInStatus  = action.payload.checkInStatus;
            state.token  = action.payload.token;
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(getUser.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
        //update user
        builder.addCase(updateUser.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state , action:any)=>{
            state.loading = false
            state.user  = {...state.user,...action.payload};
        })
        builder.addCase(updateUser.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
        //update user location
        builder.addCase(updateUserLocation.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(updateUserLocation.fulfilled, (state , action:any)=>{
            state.loading = false
            state.user  = {...state.user,address :action.payload};
        })
        builder.addCase(updateUserLocation.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
        //update checkin Status
        builder.addCase(updateCheckinStatus.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(updateCheckinStatus.fulfilled, (state , action:any)=>{
            state.loading = false
            state.checkInStatus  = action.payload;
        })
        builder.addCase(updateCheckinStatus.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
    }
})
export default authSlice.reducer
