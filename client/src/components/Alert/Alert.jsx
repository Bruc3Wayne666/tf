import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import {alert} from "../../redux/reducers/notifyReducer";

const Alert = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const {notifyReducer: notify} = state
    return (
        <div>
            {notify.loading && <Loading/>}
            {notify.error && <Toast msg={{title: 'Error!', body: notify.error}} handle={() => dispatch(alert())} color='bg-danger'/>}
            {notify.success && <Toast msg={{title: 'Signed in!', body: notify.success}} handle={() => dispatch(alert())} color='bg-success'/>}
        </div>
    );
};

export default Alert;