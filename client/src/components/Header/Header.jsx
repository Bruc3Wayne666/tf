import React from 'react';
import {Link} from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
            <Link className="text-decoration-none logo" to={'/'}>
                <h1 className="navbar-brand p-0 m-0">TalkF!eld</h1>
            </Link>
            <Search />
            <Menu/>
        </nav>
    );
};

export default Header;