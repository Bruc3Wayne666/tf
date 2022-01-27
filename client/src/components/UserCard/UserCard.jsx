import React from 'react';
import {Link} from "react-router-dom";

const UserCard = ({user, border, handleClose}) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose()
    }

    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <Link to={`/profile/${user._id}`} onClick={handleCloseAll}>
                <img width={40} src={user.profileImage} alt="avatar"/>
                <div className="ml-1">
                    <span className='d-block'>{user.fullName}</span>
                    <small>{user.username}</small>
                </div>
            </Link>
        </div>
    );
};

export default UserCard;