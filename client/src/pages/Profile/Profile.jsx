import React from 'react';
import classes from "./Profile.module.css";
import Info from "../../components/Info/Info"
import Posts from "../../components/Posts/Posts"

const Profile = () => {
    return (
        <div className={classes.profile}>
            <h2>Profile</h2>
            <Info />
            <Posts />
        </div>
    );
};

export default Profile;