import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classes from "../Info/Info.module.css";
import {getProfileUsers} from "../../redux/actions/profileAction";

const Info = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {authReducer: auth, profileReducer: profile} = useSelector(state => state)

    const [userData, setUserData] = useState([])

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        } else {
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])

    return (
        <div className={classes.info}>
            {userData.map(user => (
                <div className={classes.infoContainer} key={user._id}>
                    <img width={200} src={user.profileImage} alt="avatar"/>
                    <div className={classes.infoContent}>
                        <div className={classes.infoContentTitle}>
                            <h2>{user.username}</h2>
                            <button className='btn btn-outline-info'>Edit</button>
                        </div>
                        <div>
                            <span>
                                {user.followers.length} followers
                            </span>
                            <span>
                                {user.following.length} following
                            </span>
                        </div>
                        <h6>{user.fullName}</h6>
                        <p>{user.address}</p>
                        <p>{user.email}</p>
                        <a target={'_blank'} href={user.socialNetwork} rel={'noreferrer'}>{user.socialNetwork}</a>
                        <p>{user.about}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Info;