import React from 'react';

const UserCard = ({user, border}) => {
    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <img width={40} src={user.profileImage} alt="avatar"/>
            <div className="ml-1">
                <span className='d-block'>{user.fullName}</span>
                <small>{user.username}</small>
            </div>
        </div>
    );
};

export default UserCard;