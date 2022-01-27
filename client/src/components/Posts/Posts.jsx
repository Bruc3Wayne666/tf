import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classes from "./Posts.module.css";

const Posts = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {authReducer: auth} = useSelector(state => state)

    const [userData, setUserData] = useState([])

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        }
    }, [id, auth.user])

    return (
        <div className={classes.info}>
            {/*{userData.map(user => (*/}
            {/*    <div className={classes.infoContainer}>*/}
            {/*        */}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
};

export default Posts;