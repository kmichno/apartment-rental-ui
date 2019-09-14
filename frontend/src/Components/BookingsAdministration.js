import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import AdministrationPanel from "./AdministrationPanel";

class BookingsAdministration extends Component{
    constructor() {
        super();
        this.state = {
            bookingsList: [],
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
            this.setState({bookingsList: results.result})
        })
    }

    render(){
        let bookings = this.state.bookingsList.map((book) => {
            return (
                <tbody>
                <tr key={book.idBooking}>
                    <td>{book.idBooking}</td>
                    <td>{book.apartment.nameApartment} ({book.apartment.city})</td>
                    <td>{book.startFormat}r - {book.endFormat}r</td>
                </tr>
                </tbody>

            )
        });

        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <AdministrationPanel />
                                <h1>
                                    Zarządzaj rezerwacjami:
                                </h1>
                                <table id='details'>
                                    <thead>
                                    <tr>
                                        <th>Rezerwacja</th>
                                        <th>Apartament</th>
                                        <th>Termin</th>
                                    </tr>
                                    </thead>
                                    {bookings}
                                </table>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        )
    }

}
export default BookingsAdministration;