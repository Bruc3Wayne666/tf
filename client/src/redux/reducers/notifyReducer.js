import {TYPES} from "../actions/types";

const initialState = {}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ALERT_ACTION:
            return action.payload
        default:
            return state
    }
}

export default notifyReducer