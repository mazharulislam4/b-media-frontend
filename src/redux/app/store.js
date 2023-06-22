import { configureStore } from '@reduxjs/toolkit';
// import {HYDRATE} from 'next-redux-wrapper'
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import chatSlice from '../features/chat/chatSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer, 
        auth: authSlice,
        user: userSlice,
        chat: chatSlice
    },
    middleware: (getDefaultMiddleWares)=> getDefaultMiddleWares().concat(apiSlice.middleware),
})
