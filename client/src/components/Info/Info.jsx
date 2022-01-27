import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const Info = () => {
    const {id} = useParams()

    useEffect(() => {

    }, [id])

    return (
        <div>
           <h2>{id}</h2>
        </div>
    );
};

export default Info;