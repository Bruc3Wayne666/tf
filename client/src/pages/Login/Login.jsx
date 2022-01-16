import React, {useState} from 'react';
import classes from "./Login.module.css"
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions/authAction";

const Login = () => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials
    const dispatch = useDispatch()

    const [typePassword, setTypePassword] = useState(false)


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
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter" name={'email'} onChange={handleInputChange} value={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <div className={classes.password}>
                        <input type={typePassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Password"
                               name={'password'}
                               onChange={handleInputChange} value={password}/>
                        <small onClick={() => setTypePassword(!typePassword)}>{typePassword ? 'Hide' : 'Show'}</small>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={email && password ? false : true}>Sign
                    in
                </button>

                <p className='text-center my-3'>Don't have an account? <Link style={{textDecoration: 'none'}} to={'/register'}>Sign Up now!</Link></p>
            </form>
        </div>
    );
};

export default Login;