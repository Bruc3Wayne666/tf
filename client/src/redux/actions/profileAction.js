import {getDataAPI, patchDataAPI} from "../../api/fetchData";
import {TYPES} from "./types";
import {uploadImage} from "../../utils/profileImage";

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER'
}

export const getProfileUsers = ({users, id, auth}) => async dispatch => {
    if (users.every(user => user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`user/${id}`, auth.token)
            console.log(res)
            dispatch({type: PROFILE_TYPES.GET_USER, payload: res})
            dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        } catch (err) {
            dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
        }
    }
}

export const editProfileUser = ({userData, profileImage, auth}) => async dispatch => {
    if (!userData.fullName) return dispatch({type: TYPES.ALERT_ACTION, payload: {error: 'Add your full name'}})
    if (userData.fullName.length > 100) return dispatch({
        type: TYPES.ALERT_ACTION,
        payload: {error: 'Your full name is too long (max: 100)'}
    })
    if (userData.about.length > 400) return dispatch({
        type: TYPES.ALERT_ACTION,
        payload: {error: 'About section is too long (max: 400)'}
    })
    try {
        let media
        dispatch({type: TYPES.ALERT_ACTION, payload: {loading: true}})
        if (profileImage) media = await uploadImage([profileImage])
        const res = await patchDataAPI('user/', {
            ...userData,
            profileImage: profileImage ? media[0].url : auth.user.profileImage
        }, auth.token)
        dispatch({
            type: TYPES.AUTH_ACTION,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    profileImage: profileImage ? media[0].url : auth.user.profileImage
                }
            }
        })
        dispatch({type: TYPES.ALERT_ACTION, payload: {success: res.msg}})
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}