import {createSlice} from '@reduxjs/toolkit'
import { STATUSES } from '../../utils/constants.util'
import { getConfigs } from '../actions/config.actions'

const initialState = {
    loading : false,
    token : null,
    data :{},
    error: null,
    status : STATUSES.IDLE,
}

const authSlice = createSlice({
    name : 'config',
    reducers : {},
    initialState,
    extraReducers :(builder)=> {
        //get user
        builder.addCase(getConfigs.pending, (state , action:any)=>{
            state.loading = true
        })
        builder.addCase(getConfigs.fulfilled, (state , action:any)=>{
            state.loading = false
            state.data  = action.payload.data;
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(getConfigs.rejected, (state , action:any)=>{
            state.loading = false
            state.error = action.payload
            state.status = STATUSES.FAILED
        })
    }
})
export default authSlice.reducer
