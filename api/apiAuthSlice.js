import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.query({
            query: input => ({
                url: '/user/login',
                method: 'POST',
                body: { ...input }
            })
        }),
        getMovies: builder.query({
            query: (currPage) => `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${currPage}`
        })
    })
})

export const {
    useLazyLoginQuery,
    useGetMoviesQuery
} = authApiSlice;