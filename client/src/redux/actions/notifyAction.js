import {TYPES} from "./types";
import {deleteDataAPI, getDataAPI, postDataAPI} from "../../api/fetchData";

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const createNotify = ({msg, auth, socket}) => async dispatch => {
    try {
        const {notify} = await postDataAPI('notify', msg, auth.token)
        socket.emit('createNotify', {
            ...notify,
            user: {
                username: auth.user.username,
                profileImage: auth.user.profileImage
            }
        })
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}

export const removeNotify = ({msg, auth, socket}) => async dispatch => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
        socket.emit('removeNotify', msg)
    } catch (err) {
        dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    }
}