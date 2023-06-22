import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL || 'http://localhost:5000/api/v1',
        prepareHeaders: async (headers , {getState , endpoint})=>{
        
             const token = getState()?.auth?.loggedInUser?.token;
          
             if(token){
              
                headers.set('Authorization' , `Bearer ${token}`)
             }
             return headers;
        }
    }),
    endpoints: (builder)=>({})
})

export default  apiSlice;