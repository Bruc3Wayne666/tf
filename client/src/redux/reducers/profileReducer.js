// import {TYPES} from "../actions/types";
// import {PROFILE_TYPES} from "../actions/profileAction";
//
// const initialState = {
//     loading: false,
//     users: [],
//     posts: []
// }
//
// const profileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case PROFILE_TYPES.LOADING:
//             return {...state, loading: action.payload}
//         case PROFILE_TYPES.GET_USER:
//             return {...state, users: [...state.users, action.payload.user]}
//         default:
//             return state
//     }
// }
//
// export default profileReducer

import {createSlice} from "@reduxjs/toolkit";
import {getProfileUsers} from "../actions/profileAction";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        users: [],
        posts: []
    },
    reducers: {},
    extraReducers: {
        [getProfileUsers.pending]: (state) => {
            console.log('start')
            return {...state, loading: true}
        },
        [getProfileUsers.fulfilled]: (state, {payload}) => {
            console.log('end')
            return {
                ...state,
                users: [...state.users, payload.user],
                loading: false
            }
            // state.users.push(action.payload.user)
            // state.loading = false
        }
    }
})

export default profileSlice.reducer