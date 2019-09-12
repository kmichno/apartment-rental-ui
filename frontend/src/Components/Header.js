import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Menu from "./Menu";

class Header extends Component {
    render() {
        return (
            <React.Fragment>
            <div id="logo"><h1>
                Accomodation rental
            </h1></div>
            <Menu />
            </React.Fragment>
        );
    }
}

export default Header;