import React from "react";
import loading from "../../assets/loading.svg"
import classes from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={`position-fixed w-100 h-100 text-center ${classes.loading}`}>
            <img src={loading} alt="Loading..."/>
            <h1>Please wait</h1>
        </div>
    )
}

export default Loading