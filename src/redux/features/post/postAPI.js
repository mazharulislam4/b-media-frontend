import apiSlice from "../api/apiSlice";

const postAPI = apiSlice.injectEndpoints({

    endpoints: (builder=>({
         getPost: builder.query({
            query:(data)=>`/post?_page=1&_limit=100&_sort=title&_order=1`
         })    
    }))

})

export const {useGetPostQuery} = postAPI

