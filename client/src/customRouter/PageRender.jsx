import React from 'react';
import {useParams} from "react-router-dom";
import NotFound from "../components/NotFound";
import {useSelector} from "react-redux";


const selectPage = pageName => {
    const component = () => require(`../pages/${pageName}`).default
    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound/>
    }
}


const PageRender = () => {
    let {page, id} = useParams()
    const {authReducer: auth} = useSelector(state => state)

    let pageName = ''

    if (auth.token){
        pageName = id ? `${page}/[id]` : `${page}`
    }

    // console.log(pageName)

    return selectPage(pageName)
};

export default PageRender;