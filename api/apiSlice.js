import {createApi} from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URI || "http://localhost:4000";
const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization","Bearer " + token);
        }
        return headers;
    }
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error){
        return result;
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({})
})