import {postDataAPI} from "../../api/fetchData";
import {validate} from "../../utils/validator";
import {TYPES} from "./types";

export const login = data => async dispatch => {
    try {
        dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
        const res = await postDataAPI('auth/login', data)
        dispatch({
            type: TYPES.AUTH_ACTION, payload: {
                token: res.accessToken,
                user: res.user
            }
        })
        // localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('firstLogin', 'true')
        dispatch({type: TYPES.ALERT_ACTION, payload: {success: res.msg}})
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}

export const register = data => async dispatch => {
    try {
        if (validate(data).errLength > 0) {
            return dispatch({type: TYPES.ALERT_ACTION, payload: validate(data).errMessage})
        }
        dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
        const res = await postDataAPI('auth/register', data)
        dispatch({
            type: TYPES.AUTH_ACTION, payload: {
                token: res.accessToken,
                user: res.user
            }
        })
        // localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('firstLogin', 'true')
        dispatch({type: TYPES.ALERT_ACTION, payload: {success: res.msg}})
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}

export const logout = () => async dispatch => {
    try {
        // localStorage.removeItem('accessToken')
        localStorage.removeItem('firstLogin')
        dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
        await postDataAPI('auth/logout')
        window.location.href = '/'
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}

export const refreshToken = () => async dispatch => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
        try {
            const res = await postDataAPI('auth/upd_token')
            dispatch({
                type: TYPES.AUTH_ACTION, payload: {
                    token: res.accessToken,
                    user: res.user
                }
            })
            // localStorage.setItem('accessToken', res.accessToken)
            dispatch({type: TYPES.ALERT_ACTION, payload: {}})
        } catch (err) {
            dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
        }
    }
}