import {BrowserRouter, Route} from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "./components/Alert/Alert";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {refreshToken} from "./redux/actions/authAction";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import PrivateRouter from "./customRouter/PrivateRouter";


function App() {
    const {authReducer: auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        // Token loading from server while page is showing
        // setInterval(() => {
        //     dispatch(refreshToken())
        // }, 3000)
        dispatch(refreshToken())
    }, [])
    return (
        <BrowserRouter>
            <Alert/>

            <div className="App">
                <div className="main">
                    {auth.token && <Header/>}
                    <Route exact path={'/'} component={auth.token ? Home : Login}/>
                    <Route exact path={'/register'} component={Register}/>
                    <PrivateRouter exact path={'/:page'} component={PageRender}/>
                    <PrivateRouter exact path={'/:page/:id'} component={PageRender}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
