import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import classes from "../Login/Login.module.css";
import hidePassword from "../../assets/hidePassword.svg";
import showPassword from "../../assets/showPassword.svg";
import male from "../../assets/male.svg";
import female from "../../assets/female.svg";
import {register} from "../../redux/actions/authAction";


const Register = () => {
    const {authReducer: auth, notifyReducer: notify} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userCredentials, setUserCredentials] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'male'
    })
    const {fullName, username, email, password, confirmPassword, gender} = userCredentials
    const [typePassword, setTypePassword] = useState(false)
    const [typeConfirmPassword, setTypeConfirmPassword] = useState(false)

    const handleInputChange = e => {
        const {name, value} = e.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userCredentials))
        // if (validate({...userCredentials})) dispatch(register(userCredentials))
    }

    useEffect(() => {
        if (auth.token) navigate('/')
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
                    <small>{notify.email ? notify.email : ''}</small>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="fullName">Your name</label>
                    <input type="text" className="form-control shadow-none" id="fullName"
                           placeholder="Enter" name={'fullName'} onChange={handleInputChange} value={fullName}/>
                    <small>{notify.fullName ? notify.fullName : ''}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username">Nickname</label>
                    <input type="text" className="form-control shadow-none" id="username"
                           placeholder="Enter" name={'username'} onChange={handleInputChange} value={username.toLowerCase().replace(/ /g, '_')}/>
                    <small>{notify.username ? notify.username : ''}</small>
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
                    <small>{notify.password ? notify.password : ''}</small>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className={classes.password}>
                        <input type={typeConfirmPassword ? 'text' : 'password'}
                               className={`form-control shadow-none`}
                               id="confirmPassword" placeholder="Password"
                               name={'confirmPassword'}
                               onChange={handleInputChange} value={confirmPassword}/>
                        <span onClick={() => setTypeConfirmPassword(!typeConfirmPassword)}>{typeConfirmPassword
                            ? <img className={classes.passwordOptions} src={hidePassword} alt="Hide"/>
                            : <img className={classes.passwordOptions} src={showPassword} alt="show"/>}
                        </span>
                    </div>
                    <small>{notify.confirmPassword ? notify.confirmPassword : ''}</small>
                </div>
                <div className={'d-flex flex-row justify-content-around mx-0 mb-3'}>
                    <h4>You are:</h4>
                    <label htmlFor="male" className={'d-flex align-items-center'}>
                        <img width={50} src={male} alt="Male"/> <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleInputChange}/>
                        <span>&nbsp;Male</span>
                    </label>
                    <label htmlFor="female" className={'d-flex align-items-center'}>
                        <img width={50} src={female} alt="Female"/> <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange}/>
                        <span>&nbsp;Female</span>
                    </label>
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={email && password ? false : true}>
                    Sign up
                </button>

                <p className='text-center my-3'>Already have an account? <Link style={{textDecoration: 'none'}}
                                                                               to={'/'}>Sign in!</Link></p>
            </form>
        </div>
    );
};

export default Register;