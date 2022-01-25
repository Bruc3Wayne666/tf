import React from 'react';
import {useSelector} from "react-redux";

const Home = () => {
    const {authReducer: auth} = useSelector(state => state)

    return (
        <div>
        </div>
    );
};

export default Home;