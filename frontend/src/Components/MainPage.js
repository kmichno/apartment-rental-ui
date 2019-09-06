import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            apartments: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/hotel/show/all/0/2";

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            console.log(results.result);
            let apartments = results.result.map((apartment) => {
                return (
                    <div className="apartment" key={apartment.id}>
                        <div className="img">

                        </div>
                        <div className="description-content">
                            <h3>{apartment.nameHotel}</h3>
                            <p>{apartment.description}</p>
                        </div>
                    </div>
            )
            });
            this.setState({apartments: apartments})
        })
    }

    render() {
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
                                    Wybierz apartament:
                                </h1>
                                {this.state.apartments}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div id="footer"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default MainPage;
