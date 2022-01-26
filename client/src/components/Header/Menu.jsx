import React from 'react';
import {Link, useParams} from "react-router-dom";
import {TYPES} from "../../redux/actions/types";
import classes from "./Header.module.css";
import {logout} from "../../redux/actions/authAction";
import {useDispatch, useSelector} from "react-redux";


const Menu = () => {
    const {authReducer: auth, themeReducer: theme} = useSelector(state => state)
    const dispatch = useDispatch()
    const {pathname} = useParams()

    const navLinks = [
        {label: 'Home', icon: 'home', path: '/'},
        {label: 'Message', icon: 'chat', path: '/message'},
        {label: 'Discover', icon: 'explore', path: '/discover'},
        {label: 'Notify', icon: 'favorite', path: '/notify'}
    ]

    const handleLogOut = () => {
        dispatch(logout())
    }

    const isActive = path => {
        if (path === pathname) return 'active'
    }

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                {navLinks.map((link, index) => (
                    <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                        <Link className="nav-link" aria-current="page" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}

                <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={auth.user.profileImage} alt="avatar" className={classes.avatar}/>
                        </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>

                        <label htmlFor="theme" onClick={() => dispatch({
                            type: TYPES.THEME_ACTION,
                            payload: !theme
                        })}>{theme ? 'Light mode' : 'Dark mode'}</label>

                        <hr className="dropdown-divider"/>

                        <Link onClick={handleLogOut} className="dropdown-item" to={'/'}>Logout</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Menu;