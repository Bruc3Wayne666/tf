import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import Alert from "./Alert";

const Notify = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const {notifyReducer: notify} = state
    return (
        <div>
            {notify.loading && <Loading/>}
            {notify.error && <Alert msg={{title: 'Error!', body: notify.error}} handle={() => dispatch({type: 'NOTIFY_ACTION', payload: {}})} color='bg-danger'/>}
            {notify.success && <Alert msg={{title: 'Signed in!', body: notify.success}} handle={() => dispatch({type: 'NOTIFY_ACTION', payload: {}})} color='bg-success'/>}
        </div>
    );
};

export default Notify;