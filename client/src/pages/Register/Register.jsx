import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import classes from "../Login/Login.module.css";
import hidePassword from "../../assets/hidePassword.svg";
import showPassword from "../../assets/showPassword.svg";
import {login} from "../../redux/actions/authAction";

const Register = () => {
    const {authReducer: auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userCredentials, setUserCredentials] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        gender: 'male'
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(true)
    const [touchedConfirm, setTouched] = useState(false)
    const {fullName, username, email, password, gender} = userCredentials
    const [typePassword, setTypePassword] = useState(false)

    const handleInputChange = e => {
        const {name, value} = e.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleConfirmChange = e => {
        const {value} = e.target
        setConfirmPassword(value)
        if (touchedConfirm && value === password) setWrongPassword(false)
        else setWrongPassword(true)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!wrongPassword) dispatch(login(userCredentials))
    }

    useEffect(() => {
        if (auth.token) {
            navigate('/')
        }
    }, [auth.token, navigate])

    return (
        <div className={classes.authPage}>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3 className="text-center">Welcome to TalkF!eld</h3>
                    <img width={76} src={require("../../assets/welcome.gif")} alt=""/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control shadow-none" id="email" aria-describedby="emailHelp"
                           placeholder="Enter" name={'email'} onChange={handleInputChange} value={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="fullName">Your name</label>
                    <input type="text" className="form-control shadow-none" id="fullName"
                           placeholder="Enter" name={'fullName'} onChange={handleInputChange} value={fullName}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username">Nickname</label>
                    <input type="text" className="form-control shadow-none" id="username"
                           placeholder="Enter" name={'username'} onChange={handleInputChange} value={username}/>
                    <small id="emailHelp" className="form-text text-muted">It automatically will begin with '@'.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <div className={classes.password}>
                        <input type={typePassword ? 'text' : 'password'} className="form-control shadow-none"
                               id="password" placeholder="Password"
                               name={'password'}
                               onChange={handleInputChange} value={password}/>
                        <span onClick={() => setTypePassword(!typePassword)}>{typePassword
                            ? <img className={classes.passwordOptions} src={hidePassword} alt="Hide"/>
                            : <img className={classes.passwordOptions} src={showPassword} alt="show"/>}</span>
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className={classes.password}>
                        <input type={typePassword ? 'text' : 'password'}
                               className={`form-control shadow-none ${touchedConfirm && wrongPassword ? 'border-3 border-danger' : 'border-3 border-success'}`}
                               id="confirmPassword" placeholder="Password"
                               name={'confirmPassword'}
                               onFocus={() => setTouched(true)}
                               onChange={handleConfirmChange} value={confirmPassword}/>
                        <span onClick={() => setTypePassword(!typePassword)}>{typePassword
                            ? <img className={classes.passwordOptions} src={hidePassword} alt="Hide"/>
                            : <img className={classes.passwordOptions} src={showPassword} alt="show"/>}
                        </span>
                    </div>
                    {touchedConfirm && wrongPassword && <small id="confirmPassword" className="form-text text-muted">Please type correct password</small>}
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={email && password ? false : true}>
                    Sign up
                </button>

                <p className='text-center my-3'>Already have an account? <Link style={{textDecoration: 'none'}}
                                                                               to={'/login'}>Sign in!</Link></p>
            </form>
        </div>
    );
};

export default Register;