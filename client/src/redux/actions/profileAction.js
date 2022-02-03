import {deleteDataAPI, getDataAPI, patchDataAPI} from "../../api/fetchData";
import {DeleteData, TYPES} from "./types";
import {uploadImage} from "../../utils/profileImage";
import {createNotify, removeNotify} from "./notifyAction";

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW'
}

export const getProfileUsers = ({users, id, auth}) => async dispatch => {
    if (users.every(user => user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`user/${id}`, auth.token)
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
        const res = await patchDataAPI('user', {
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

export const follow = ({users, user, auth, socket}) => async dispatch => {
    let newUser;
    if (users.every(person => person._id !== user._id)) {
        newUser = {...user, followers: [...user.followers, auth.user]}
    } else {
        users.forEach(person => {
            if (person._id === user._id) {
                newUser = {...person, followers: [...person.followers, auth.user]}
            }
        })
    }
    dispatch({type: PROFILE_TYPES.FOLLOW, payload: newUser})
    dispatch({
        type: TYPES.AUTH_ACTION,
        payload: {
            ...auth,
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })
    try {
        const {newUser} = await patchDataAPI(`user/${user._id}/follow`, null, auth.token)
        socket.emit('follow', newUser)

        const msg = {
            id: auth.user._id,
            text: 'followed you!',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}`
        }
        dispatch(createNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}

export const unfollow = ({users, user, auth, socket}) => async dispatch => {
    let newUser;
    if (users.every(person => person._id !== user._id)) {
        newUser = {...user, followers: DeleteData(user.followers, auth.user._id)}
    } else {
        users.forEach(person => {
            if (person._id === user._id) {
                newUser = {...person, followers: DeleteData(person.followers, auth.user._id)}
            }
        })
    }
    dispatch({type: PROFILE_TYPES.UNFOLLOW, payload: newUser})
    dispatch({
        type: TYPES.AUTH_ACTION,
        payload: {
            ...auth,
            user: {...auth.user, following: DeleteData(auth.user.following, newUser._id)}
        }
    })
    try {
        const {newUser} = await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token)
        socket.emit('unfollow', newUser)

        const msg = {
            id: auth.user._id,
            text: 'followed you!',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}`
        }
        dispatch(removeNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}