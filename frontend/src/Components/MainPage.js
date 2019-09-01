import React from 'react';
import {NavLink} from "react-router-dom";
export const MainPage = props => {
    return (
        <React.Fragment>
            <div id="container">
                <div id="logo"><h1>
                    Accomodation rental
                </h1></div>
                <div id="nav-bar">
                    <ul>
                        <li><NavLink to="/">Główna</NavLink></li>
                        <li><NavLink to="/podstrona">Moje rezerwacje</NavLink></li>
                        <li><a href="#"><span>Administracja</span></a></li>
                        <li><a href="#"><span>Profil</span></a></li>
                    </ul>
                </div>
                <div id="content">
                    <div id="left-side">
                        <div id="search-box"></div>
                    </div>
                    <div id="right-side">
                        <div id="right-side-inner">
                            <h1>
                                Wybierz nocleg:
                            </h1>
                            <div className="apartment">
                                <div className="img">

                                </div>
                                <div className="description-content">
                                    <h3>Super Hotel</h3>
                                    <p>
                                        Warszawa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div id="footer"></div>
            </div>
        </React.Fragment>
    );
};
MainPage.propTypes = {};