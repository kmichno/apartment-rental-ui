import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Bookings extends Component {

    constructor() {
        super();
        this.state = {
            bookings: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/bookings/show/all";

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
            let bookings = results.result.map((booking) => {
                return (
                    <div className="apartment" key={booking.idBooking}>
                        <div className="img">

                        </div>
                        <div className="description-content">
                            <h3>{booking.apartment.nameApartment}</h3>
                            <p className="city">{booking.apartment.city}</p>
                            <div className="price">
                                <p>Status: {booking.status}</p>
                                <p>Od {booking.start} do {booking.end}</p>
                                <p>Max. ilość ludzi: {booking.apartment.numberPeople}</p>
                                <p>Cena: {booking.apartment.priceDay} zł</p>
                            </div>
                            <div className="place-button">
                                <div className="button"><NavLink to={`apartment/details/${booking.apartment.idApartment}`}>Anuluj rezerwacje</NavLink></div>
                            </div>
                        </div>
                    </div>
                )
            });
            this.setState({bookings: bookings})
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
                                    Rezerwacje:
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

export default Bookings;
