import {useSelector} from "react-redux";
import classes from "./Info.module.css";
import UserCard from "../UserCard/UserCard";
import FollowBtn from "../FollowBtn/FollowBtn";

export const Followers = ({users, setShowFollowers}) => {
    const {authReducer: auth} = useSelector(state => state)
    return (
        <div className={classes.follow}>
            <div className={classes.followBox}>
                <h5 className='text-center'>Followers</h5>
                <hr/>
                <div className={classes.followContent}>
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
                                {auth.user._id !== user._id && <FollowBtn user={user}/>}
                            </UserCard>
                        ))
                    }
                </div>
                <div className={classes.close} onClick={() => setShowFollowers(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export const Following = ({users, setShowFollowing}) => {
    const {authReducer: auth} = useSelector(state => state)
    return (
        <div className={classes.follow}>
            <div className={classes.followBox}>
                <h5 className='text-center'>Followings</h5>
                <hr/>
                <div className={classes.followContent}>
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
                                {auth.user._id !== user._id && <FollowBtn user={user}/>}
                            </UserCard>
                        ))
                    }
                </div>
                <div className={classes.close} onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}