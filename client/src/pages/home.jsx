import React from 'react';
import {useSelector} from "react-redux";

const Home = () => {
    const {authReducer: auth} = useSelector(state => state)

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;