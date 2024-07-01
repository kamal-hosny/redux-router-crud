import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "auth",
    initialState: {
        id: 1,
        isLoggedin: true
    },
    reducers: {},
})

export default userSlice.reducer