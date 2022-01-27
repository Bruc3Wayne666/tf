import React from 'react';
import classes from "../../styles/Profile.module.css";
import Info from "../../components/Info/Info"
import Posts from "../../components/Posts/Posts"
import {useSelector} from "react-redux";
import loadingSmall from "../../assets/loadingSmall.svg"

const Profile = () => {
    const {profileReducer: profile} = useSelector(state => state)

    return (
        <div className={classes.profile}>
            {profile.loading
                ? <img src={loadingSmall} alt="loading"/>
                : <Info/>
            }
            <Posts/>
        </div>
    );
};

export default Profile;