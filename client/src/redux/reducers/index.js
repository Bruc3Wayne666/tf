import {combineReducers} from "redux";
import authReducer from "./authReducer";
import notifyReducer from "./notifyReducer";
import themeReducer from "./themeReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    authReducer,
    notifyReducer,
    themeReducer,
    profileReducer
})