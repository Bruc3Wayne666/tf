import React from 'react';
import {useParams} from "react-router-dom";
import NotFound from "./components/NotFound";


const selectPage = pageName => {
    const component = () => require(`./pages/${pageName}/${pageName}`).default
    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound/>
    }
}


const PageRender = () => {
    let {page, id} = useParams()

    page = page[0].toUpperCase() + page.slice(1)
    let pageName = id ? `${page}/${id}` : `${page}`

    console.log(pageName)

    return selectPage(pageName)
};

export default PageRender;