import {TYPES} from "../actions/types";

const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.AUTH_ACTION:
            return action.payload
        default:
            return state
    }
}

export default authReducer