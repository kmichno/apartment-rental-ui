import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Authentication from "./Authentication";

//  {this.state.idUser} - id current user (1,2, etc)
//  {this.state.isAdmin} - check current user is admin (0 or 1)

export default class Menu extends Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string
        })
    };

    state = {
        user: {},
        idUser: null,
        isAdmin: null,
        authenticated: false
    };

    componentDidMount() {
        console.log("did mount");
          fetch("http://localhost:8080/authorization/details", {
            mode: 'cors',
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                console.log("Auth response");
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                console.log("auth Response json");

                    this.setState({
                        authenticated: true,
                        user: responseJson.result.user,
                        idUser: responseJson.result.idUser,
                        isAdmin: responseJson.result.isAdmin,
                    });
                    console.log( "test "+JSON.stringify(responseJson.result.user));
            })
            .catch(error => {
                console.log("Auth error");
                this.setState({
                    authenticated: false,
                });
            });
    }

    render() {
        const { authenticated } = this.state;
        console.log("Render ");

        return (
        <div id="nav-bar">
            <ul>
                <li><NavLink to="/">Strona Główna</NavLink></li>
                <li><NavLink to="/bookings">Moje rezerwacje</NavLink></li>
                <li><NavLink to="/admin/dashboard"><span>Administracja</span></NavLink></li>
                <Authentication authenticated={authenticated}
                                handleNotAuthenticated={this._handleNotAuthenticated}/>
                 {!authenticated ? (
                     <li onClick={this._handleSignInClick}><NavLink to="#">Zaloguj</NavLink></li>
                    ) : (
                     <li onClick={this._handleLogoutClick}><NavLink to="#">Wyloguj ({this.state.user.name})</NavLink></li>
                    )}
            </ul>
        </div>
        );
    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
    _handleSignInClick = () => {
        window.open("http://localhost:8080/authorization/login", "_self");
    };

    _handleLogoutClick = () => {
        window.open("http://localhost:8080/authorization/logout", "_self");
        this.props.handleNotAuthenticated();
    };

}