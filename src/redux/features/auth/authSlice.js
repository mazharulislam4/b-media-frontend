import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        loggedInUser: {}
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState.login,
    reducers:{
       loggedInUser: (state , action)=>{
        state.loggedInUser = action.payload;
       },
       userLoggedOut:(state )=>{
           state.loggedInUser = {};
         }
    }

}) 


export const {loggedInUser , userLoggedOut} = authSlice.actions;
export default authSlice.reducer;