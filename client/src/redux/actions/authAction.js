import {postDataAPI} from "../../api/fetchData";
import {validate} from "../../utils/validator";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'auth/login',
    async (data, {rejectWithValue}) => {
        try {
            const res = await postDataAPI('auth/login', data)
            return res
        } catch (err) {
            return rejectWithValue({error: err.response.data.msg})
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue}) => {
        try {
            if (validate(data).errLength > 0) {
                return rejectWithValue(validate(data).errMessage)
            }
            const res = await postDataAPI('auth/register', data)
            return res
        } catch (err) {
            return rejectWithValue({error: err.response.data.msg})
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await postDataAPI('auth/logout')
            window.location.href = '/'
        } catch (err) {
            return rejectWithValue({error: err.response.data.msg})
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            try {
                const res = await postDataAPI('auth/upd_token')
                return res
            } catch (err) {
                return rejectWithValue({error: err.response.data.msg})
            }
        }
    }
)


// export const login = data => async dispatch => {
//     try {
//         dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
//         const res = await postDataAPI('auth/login', data)
//         dispatch({
//             type: TYPES.AUTH_ACTION, payload: {
//                 token: res.accessToken,
//                 user: res.user
//             }
//         })
//         localStorage.setItem('firstLogin', 'true')
//         dispatch({type: TYPES.ALERT_ACTION, payload: {success: res.msg}})
//     } catch (err) {
//         dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
//     }
// }
//

// export const register = data => async dispatch => {
//     try {
//         if (validate(data).errLength > 0) {
//             return dispatch({type: TYPES.ALERT_ACTION, payload: validate(data).errMessage})
//         }
//         dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
//         const res = await postDataAPI('auth/register', data)
//         dispatch({
//             type: TYPES.AUTH_ACTION, payload: {
//                 token: res.accessToken,
//                 user: res.user
//             }
//         })
//         localStorage.setItem('firstLogin', 'true')
//         dispatch({type: TYPES.ALERT_ACTION, payload: {success: res.msg}})
//     } catch (err) {
//         dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
//     }
// }
//

// export const logout = () => async dispatch => {
//     try {
//         localStorage.removeItem('firstLogin')
//         dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
//         await postDataAPI('auth/logout')
//         window.location.href = '/'
//     } catch (err) {
//         dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
//     }
// }
//

// export const refreshToken = () => async dispatch => {
//     const firstLogin = localStorage.getItem('firstLogin')
//     if (firstLogin) {
//         dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
//         try {
//             const res = await postDataAPI('auth/upd_token')
//             dispatch({
//                 type: TYPES.AUTH_ACTION, payload: {
//                     token: res.accessToken,
//                     user: res.user
//                 }
//             })
//             dispatch({type: TYPES.ALERT_ACTION, payload: {}})
//         } catch (err) {
//             dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
//         }
//     }
// }