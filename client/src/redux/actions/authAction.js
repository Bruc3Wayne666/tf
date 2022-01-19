import {postDataAPI} from "../../api/fetchData";
import {validate} from "../../utils/validator";

export const TYPES = {
    AUTH_ACTION: 'AUTH_ACTION'
}

export const login = data => async dispatch => {
    try {
        dispatch({type: 'NOTIFY_ACTION', payload: {loading: true}})
        const res = await postDataAPI('auth/login', data)
        dispatch({
            type: 'AUTH_ACTION', payload: {
                token: res.accessToken,
                user: res.user
            }
        })
        localStorage.setItem('firstLogin', 'true')
        dispatch({type: 'NOTIFY_ACTION', payload: {success: res.msg}})
    } catch (err) {
        dispatch({type: 'NOTIFY_ACTION', payload: {error: err.response.data.msg}})
    }
}

export const register = data => async dispatch => {
    try {
        if (validate(data).errLength > 0) {
            return dispatch({type: 'NOTIFY_ACTION', payload: validate(data).errMessage})
        }
        dispatch({type: 'NOTIFY_ACTION', payload: {loading: true}})
        const res = await postDataAPI('auth/register', data)
        dispatch({
            type: 'AUTH_ACTION', payload: {
                token: res.accessToken,
                user: res.user
            }
        })
        localStorage.setItem('firstLogin', 'true')
        dispatch({type: 'NOTIFY_ACTION', payload: {success: res.msg}})
    } catch (err) {
        dispatch({type: 'NOTIFY_ACTION', payload: {error: err.response.data.msg}})
    }
}

export const refreshToken = () => async dispatch => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
        dispatch({type: 'NOTIFY_ACTION', payload: {loading: true}})
        try {
            const res = await postDataAPI('auth/upd_token')
            dispatch({
                type: 'AUTH_ACTION', payload: {
                    token: res.accessToken,
                    user: res.user
                }
            })
            dispatch({type: 'NOTIFY_ACTION', payload: {}})
        } catch (err) {
            dispatch({type: 'NOTIFY_ACTION', payload: {error: err.response.data.msg}})
        }
    }
}