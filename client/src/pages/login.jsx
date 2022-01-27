import React, {useEffect, useState} from 'react';
import classes from "../styles/Login.module.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/authAction";
import showPassword from "../assets/showPassword.svg"
import hidePassword from "../assets/hidePassword.svg"

const Login = () => {
    const {authReducer: auth} = useSelector(state => state)
    const history = useHistory()
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials
    const dispatch = useDispatch()

    const [typePassword, setTypePassword] = useState(false)

    useEffect(() => {
        if (auth.token) history.push('/')
    }, [auth.token, history])

    const handleInputChange = e => {
        const {name, value} = e.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userCredentials))
    }

    return (
        <div className={classes.authPage}>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">TalkF!eld</h3>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control shadow-none" id="email" aria-describedby="emailHelp"
                           placeholder="Enter" name={'email'} onChange={handleInputChange} value={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
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
                <button type="submit" className="btn btn-success w-100" disabled={email && password ? false : true}>Sign
                    in
                </button>

                <p className='text-center my-3'>Don't have an account? <Link style={{textDecoration: 'none'}}
                                                                             to={'/register'}>Sign Up now!</Link></p>
            </form>
        </div>
    );
};

export default Login;