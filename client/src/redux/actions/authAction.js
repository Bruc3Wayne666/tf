import {postDataAPI} from "../../api/fetchData";

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