import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import {TYPES} from "../../redux/actions/types";

const Alert = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const {notifyReducer: notify} = state
    return (
        <div>
            {notify.loading && <Loading/>}
            {notify.error && <Toast msg={{title: 'Error!', body: notify.error}} handle={() => dispatch({type: TYPES.ALERT_ACTION, payload: {}})} color='bg-danger'/>}
            {notify.success && <Toast msg={{title: 'Signed in!', body: notify.success}} handle={() => dispatch({type: TYPES.ALERT_ACTION, payload: {}})} color='bg-success'/>}
        </div>
    );
};

export default Alert;