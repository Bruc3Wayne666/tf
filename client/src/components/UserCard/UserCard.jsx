import React from 'react';
import {Link} from "react-router-dom";

const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {
    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }

    const showMsg = user => {
        return (
            <></>
            // <>
            //     <div>
            //         {user.text}
            //     </div>
            //     {
            //         user.media.length > 0 &&
            //         <div>
            //             {user.media.length} <i className='fas fa-image'/>
            //         </div>
            //     }
            // </>
        )
    }

    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className='d-flex align-items-center'>
                    <img width={40} src={user.profileImage} alt="avatar"/>
                    <div className="ml-1">
                        <span className='d-block'>{user.fullName}</span>
                        <small>{
                            msg ? showMsg(user) : user.username
                        }</small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    );
};

export default UserCard;