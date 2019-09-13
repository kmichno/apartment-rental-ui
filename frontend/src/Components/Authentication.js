import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

export default class Authentication extends Component {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    render() {
        const { authenticated } = this.props;
        console.log("Status auth "+authenticated);
        return (

            <React.Fragment>
                {authenticated ? (
                    <li onClick={this._handleLogoutClick}><NavLink to="#">Wyloguj</NavLink></li>
                ) : (
                    <li onClick={this._handleSignInClick}><NavLink to="#">Zaloguj</NavLink></li>
                )}
            </React.Fragment>
        );
    }

    _handleSignInClick = () => {
        window.open("http://localhost:8080/authorization/login", "_self");
    };

    _handleLogoutClick = () => {
        window.open("http://localhost:8080/authorization/logout", "_self");
        this.props.handleNotAuthenticated();
    };
}