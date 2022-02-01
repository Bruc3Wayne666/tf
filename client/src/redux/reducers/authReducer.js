// import {TYPES} from "../actions/types";
//
// const initialState = {}
//
// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TYPES.AUTH_ACTION:
//             return action.payload
//         default:
//             return state
//     }
// }
//
// export default authReducer

import {createSlice} from "@reduxjs/toolkit";
import {login, refreshToken, register} from "../actions/authAction";

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, {payload}) => {
            localStorage.setItem('firstLogin', 'true')
            return {
                ...state,
                token: payload.accessToken,
                user: payload.user
            }
        },
        [register.fulfilled]: (state, {payload}) => {
            localStorage.setItem('firstLogin', 'true')
            return {
                ...state,
                token: payload.accessToken,
                user: payload.user
            }
        },
        [refreshToken.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                token: payload.accessToken,
                user: payload.user
            }
        }
    }
})

export default authSlice.reducer