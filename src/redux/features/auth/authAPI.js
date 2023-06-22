import Cookies from "js-cookie";
import apiSlice from "../api/apiSlice";
import { loggedInUser, userLoggedOut } from "./authSlice";



const  authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: 'post',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
       
          if (result.data?.data?.token) {
            // cookkie set 
            Cookies.set('auth', JSON.stringify(result.data.data), { expires: 2 })
            dispatch(loggedInUser(result.data.data));
          }
        } catch (err) {
          //  console.log(err);
        }
      },
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: "/auth/logout",
        method: 'post',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (!result.data?.error) {
            // cookkie set 
            Cookies.remove('auth')
            dispatch(userLoggedOut());
          }
        } catch (err) {
          //  console.log(err);
        }
      },
    }),
  
    // endpoints end 
  }),
});


export const {useLoginMutation , useLogoutMutation} = authApi
