// import {TYPES} from "../actions/types";
//
// const initialState = {}
//
// const notifyReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TYPES.ALERT_ACTION:
//             return action.payload
//         default:
//             return state
//     }
// }
//
// export default notifyReducer

import {createSlice} from "@reduxjs/toolkit";
import {login, logout, refreshToken, register} from "../actions/authAction";
import {getProfileUsers} from "../actions/profileAction";

const notifySlice = createSlice({
    name: 'alert',
    initialState: {},
    reducers: {
        alert(state, action){
            state = action.payload
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state = {loading: true}
        },
        [login.fulfilled]: (state, action) => {
            state = {success: action.payload.msg}
        },
        [login.rejected]: (state, action) => {
            state = action.payload
        },
        [register.pending]: (state) => {
            state = {loading: true}
        },
        [register.fulfilled]: (state, action) => {
            state = {success: action.payload.msg}
        },
        [register.rejected]: (state, action) => {
            state = action.payload
        },
        [logout.pending]: (state) => {
            state = {loading: true}
        },
        [logout.rejected]: (state, action) => {
            state = action.payload
        },
        [refreshToken.pending]: (state) => {
            state = {loading: true}
        },
        [refreshToken.fulfilled]: (state) => {
            state = {}
        },
        [refreshToken.rejected]: (state, action) => {
            state = action.payload
        },
        [getProfileUsers.rejected]: (state, action) => {
            state = action.payload
        }
    }
})

export const {alert} = notifySlice.actions
export default notifySlice.reducer