import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
        <div id="nav-bar">
            <ul>
                <li><NavLink to="/">Główna</NavLink></li>
                <li><NavLink to="/bookings">Moje rezerwacje</NavLink></li>
                <li><NavLink to="/admin/apartments"><span>Administracja</span></NavLink></li>
                <li><a href="#"><span>Profil</span></a></li>
            </ul>
        </div>
        );
    }
}

export default Menu;