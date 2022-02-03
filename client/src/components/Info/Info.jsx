import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classes from "../Info/Info.module.css";
import {getProfileUsers} from "../../redux/actions/profileAction";
import EditProfile from "../EditProfile/EditProfile";
import FollowBtn from "../FollowBtn/FollowBtn";
import {Followers, Following} from "./Follows";

const Info = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {authReducer: auth, profileReducer: profile} = useSelector(state => state)

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        if (id === auth.user._id) {
            console.log(auth.user)
            setUserData([auth.user])
        } else {
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            console.log(newData)
            setUserData(newData)
        }
        // console.log(userData)
    }, [id, auth, dispatch, profile.users])

    return (
        <div className={classes.info}>
            {userData.map(user => (
                <div className={classes.infoContainer} key={user._id}>
                    <img width={200} src={user.profileImage} alt="avatar"/>
                    <div className={classes.infoContent}>
                        <div className={classes.infoContentTitle}>
                            <h2>{user.username}</h2>
                            {
                                user._id === auth.user._id
                                    ? <button onClick={() => setOnEdit(true)}
                                              className='btn btn-outline-info'>Edit</button>
                                    : <FollowBtn user={user}/>
                            }
                        </div>
                        <div>
                            <span onClick={() => setShowFollowers(true)}>
                                {user.followers.length} followers
                            </span>
                            <span onClick={() => setShowFollowing(true)}>
                                {user.following.length} following
                            </span>
                        </div>
                        <h6>{user.fullName}</h6>
                        <p>{user.number}</p>
                        <p>{user.address}</p>
                        <p>{user.email}</p>
                        <a target={'_blank'} href={user.socialNetwork} rel={'noreferrer'}>{user.socialNetwork}</a>
                        <p>{user.about}</p>
                    </div>
                    {onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>}
                    {
                        showFollowers && <Followers
                            users={user.followers}
                            setShowFollowers={setShowFollowers}
                        />
                    }
                    {
                        showFollowing && <Following
                            users={user.following}
                            setShowFollowing={setShowFollowing}
                        />
                    }
                </div>
            ))}
        </div>
    );
};

export default Info;