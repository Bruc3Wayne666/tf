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
// {
// [login.pending]: (state) => {
//     console.log(state)
//     return {loading: true}
// },
// [login.fulfilled]: (state, action) => {
//     console.log(state)
//     console.log(action.payload)
//     return {success: action.payload.msg}
// },
// [login.rejected]: (state, action) => {
//     console.log(action.payload)
//     return {...action.payload}
// },
// [register.pending]: (state) => {
//     return {loading: true}
// },
// [register.fulfilled]: (state, action) => {
//     return {success: action.payload.msg}
// },
// [register.rejected]: (state, action) => {
//     return {...action.payload}
// },
// [logout.pending]: (state) => {
//     return {loading: true}
// },
// [logout.rejected]: (state, action) => {
//     return {...action.payload}
// },
// [refreshToken.pending]: (state) => {
//     return {loading: true}
// },
// [refreshToken.fulfilled]: (state) => {
//     return {}
// },
// [refreshToken.rejected]: (state, action) => {
//     return {...action.payload}
// },
// [getProfileUsers.rejected]: (state, action) => {
//     return {...action.payload}
// }
// // builder => {
// //     builder.addCase(login.pending, (state, action) => {
// //         state = {loading: true}
// //     })
// // }

const notifySlice = createSlice({
    name: 'alert',
    initialState: {},
    reducers: {
        alert(state, action) {
            state = action.payload
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            console.log(state)
            state = {loading: true}
        },
        [login.fulfilled]: (state, action) => {
            console.log(state)
            console.log(action.payload)
            state = {success: action.payload.msg}
        },
        [login.rejected]: (state, action) => {
            console.log(action.payload)
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