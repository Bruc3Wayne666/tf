import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {follow, unfollow} from "../../redux/actions/profileAction";

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)
    const {authReducer: auth, profileReducer: profile, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (auth.user.following.find(person => person._id === user._id)) {
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow = async () => {
        console.log('f')
        if (load) return;
        setFollowed(true)
        setLoad(true)
        await dispatch(follow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    const handleUnfollow = async () => {
        console.log('u')
        if (load) return;
        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    return (
        <>
            {
                followed
                    ? <button onClick={handleUnfollow} className='btn btn-outline-danger'>Unfollow</button>
                    : <button onClick={handleFollow} className='btn btn-outline-info'>Follow</button>
            }
        </>
    );
};

export default FollowBtn;