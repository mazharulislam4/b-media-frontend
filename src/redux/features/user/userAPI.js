import apiSlice from "../api/apiSlice";


const userAPI = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUser:builder.query({
            query: (data)=> '/user'
        })
    })
})

export const {useGetUserQuery} = userAPI