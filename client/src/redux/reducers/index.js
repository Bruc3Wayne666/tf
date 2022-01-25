import {combineReducers} from "redux";
import authReducer from "./authReducer";
import notifyReducer from "./notifyReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
    authReducer,
    notifyReducer,
    themeReducer
})