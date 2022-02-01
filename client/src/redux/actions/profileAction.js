// import {getDataAPI} from "../../api/fetchData";
// import {TYPES} from "./types";
//
// export const PROFILE_TYPES = {
//     LOADING: 'LOADING',
//     GET_USER: 'GET_USER'
// }
//
// export const getProfileUsers = ({users, id, auth}) => async dispatch => {
//     if (users.every(user => user._id !== id)){
//         try {
//             dispatch({type: PROFILE_TYPES.LOADING, payload: true})
//             const res = await getDataAPI(`user/${id}`, auth.token)
//             console.log(res)
//             dispatch({type: PROFILE_TYPES.GET_USER, payload: res})
//             dispatch({type: PROFILE_TYPES.LOADING, payload: false})
//         } catch (err) {
//             dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
//         }
//     }
// }

import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDataAPI} from "../../api/fetchData";

export const getProfileUsers = createAsyncThunk(
    'profile/getProfileUsers',
    async (data, {rejectWithValue}) => {
        const {users, id, auth} = data
        if (users.every(user => user._id !== id)) {
            try {
                const res = await getDataAPI(`user/${id}`, auth.token)
                return res
            } catch (err) {
                return rejectWithValue({error: err.response.data.msg})
            }
        }
    }
)