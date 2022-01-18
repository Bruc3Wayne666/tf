import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Notify from "./components/Notify/Notify";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {refreshToken} from "./redux/actions/authAction";


function App() {
    const {authReducer: auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() =>{
      dispatch(refreshToken())
    }, [])
    return (
        <BrowserRouter>
            <Notify/>

            <div className="App">
                <div className="main">
                    <Routes>
                        <Route exact path={'/'} element={auth.token ? <Home/> : <Login/>}/>
                        <Route exact path={'/:page'} element={<PageRender/>}/>
                        <Route exact path={'/:page/:id'} element={<PageRender/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
