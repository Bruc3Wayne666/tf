import rootReducer from "./reducers/index"
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import notifyReducer from "./reducers/notifyReducer";
import themeReducer from "./reducers/themeReducer";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({
    reducer: {
        authReducer,
        profileReducer,
        notifyReducer,
        themeReducer
    }
})

const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider