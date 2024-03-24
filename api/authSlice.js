import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        removeCredentials: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const {setCredentials, removeCredentials} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
