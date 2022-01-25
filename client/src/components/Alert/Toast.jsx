import React from 'react';
import classes from "./Toast.module.css";

const Toast = ({msg, handle, color}) => {
    return (
        <div className={`position-fixed ${classes.alert} text-light ${color}`}>
            <div className={`${classes.alertHeader} text-light ${color}`}>
                <strong className='mr-auto'>{msg.title}</strong>
                <button onClick={handle} data-dismiss='alert' style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    // color: 'black',
                }} className='ml-2 mb-1 close text-light'>&times;</button>
            </div>
            <div className={classes.alertBody}>
                {msg.body}
            </div>
        </div>
    );
};

export default Toast;