// import {TYPES} from "../actions/types";
//
// const initialState = false
//
// const themeReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TYPES.THEME_ACTION:
//             return action.payload
//         default:
//             return state
//     }
// }
//
// export default themeReducer

import {createSlice} from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: false,
    reducers: {
        theme(state, {payload}){
            return {payload}
        }
    }
})

export default themeSlice.reducer