import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const Posts = () => {
    const {id} = useParams()

    useEffect(() => {

    }, [id])

    return (
        <div>
            <h2>{id}</h2>
        </div>
    );
};

export default Posts;