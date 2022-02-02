import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TYPES} from "../../redux/actions/types";
import classes from "./EditProfile.module.css";
import {checkImage} from "../../utils/profileImage";
import {editProfileUser} from "../../redux/actions/profileAction";

const EditProfile = ({user, setOnEdit}) => {
    const initialState = {
        fullName: '',
        number: '',
        location: '',
        socialNetwork: '',
        about: '',
        gender: ''
    }
    const [userData, setUserData] = useState(initialState)
    const {fullName, number, location, about, socialNetwork, gender} = userData
    const [profileImage, setProfileImage] = useState('')
    const {authReducer: auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])

    const changeProfileImage = e => {
        console.log(e.target.files[0])
        const file = e.target.files[0]
        const err = checkImage(file)
        if (err) return dispatch({type: TYPES.ALERT_ACTION, payload: {error: err}})
        setProfileImage(file)
    }

    const handleInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(editProfileUser({userData, profileImage, auth}))
        setOnEdit(false)
    }

    return (
        <div className={classes.editProfile}>
            <button  onClick={() => setOnEdit(false)} className={`btn btn-danger ${classes.btnClose}`}>
                Cancel
            </button>
            <form onSubmit={handleSubmit}>
                <div className={classes.infoAvatar}>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : auth.user.profileImage} alt="Avatar"/>
                    <span>
                        <i className='fas fa-camera'/>
                        <p>Edit</p>
                        <input type="file" name='file' id='file_up'
                        accept='image/*' onChange={changeProfileImage}/>
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullName"
                               name="fullName" value={fullName} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                               style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {fullName.length}/100
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="number">Phone Number</label>
                    <input type="text" name="number" value={number}
                           className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" value={location}
                           className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="socialNetwork">Social Network</label>
                    <input type="text" name="socialNetwork" value={socialNetwork}
                           className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea name="about" value={about} cols="30" rows="4"
                              className="form-control" onChange={handleInput} />
                    <small className="text-danger d-block text-right">
                        {about.length}/400
                    </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                            className="custom-select text-capitalize"
                            onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;