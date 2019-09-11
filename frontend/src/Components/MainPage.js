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
        var url = "http://localhost:8080/apartments/show/all/0/10";

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
            let apartments = results.result.map((apartment) => {
                 return (
                    <div className="apartment" key={apartment.idApartment}>
                        <div className="img">
                            {apartment.filePath}
                        </div>
                        <div className="description-content">
                            <h3>{apartment.nameApartment}</h3>
                            <p className="city">{apartment.city}</p>
                            <div className="description">{apartment.description}</div>
                            <div className="price">
                                <p>Cena: {apartment.priceDay} zł</p>
                            </div>
                            <div className="place-button">
                                <div className="button"><NavLink to={`apartment/details/${apartment.idApartment}`}>Zobacz szczegóły</NavLink></div>
                            </div>
                        </div>
                    </div>
                )
            });
            this.setState({bookings: apartments})
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
                            <li><NavLink to="/bookings">Moje rezerwacje</NavLink></li>
                            <li><a href="/admin/apartments"><span>Administracja</span></a></li>
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
                                {this.state.bookings}
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
