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

    bookingCancel(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/cancel";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleBookingCancel (idBooking) {
        console.log("Get request to cancel id "+idBooking);
        return event => {
            event.preventDefault();
            this.bookingCancel(idBooking);
            this.setState(prevState => ({
                bookingsList: prevState.bookingsList.map(
                    obj => (obj.idBooking === idBooking ? Object.assign(obj, {status: "canceled"}) : obj)
                )
            }));
        }
    }
    bookingConfirm(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/confirm";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }
    handleBookingConfirm (idBooking) {
        console.log("Get request to confirm id "+idBooking);
        return event => {
            event.preventDefault();
            this.bookingConfirm(idBooking);
            this.setState(prevState => ({
                bookingsList: prevState.bookingsList.map(
                    obj => (obj.idBooking === idBooking ? Object.assign(obj, {status: "confirmed"}) : obj)
                )
            }));
        }
    }

    render(){
        let bookings = this.state.bookingsList.map((book) => {
            return (
                <tbody>
                <tr key={book.idBooking}>
                    <td>{book.idBooking}</td>
                    <td>{book.apartment.nameApartment} ({book.apartment.city})</td>
                    <td>{book.startFormat}r - {book.endFormat}r<br /><button class="button-details"><b>{book.rentingDays} dni</b></button></td>
                    <td>{book.status === "unconfirmed" ? (
                        <p>
                            <b className="bookings-unconfirmed">Niepotwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.handleBookingCancel(book.idBooking)}>Anuluj</button>
                            <button className="button-details button-green" onClick={this.handleBookingConfirm(book.idBooking)}>Potwierdź</button>

                        </p>
                    ) : book.status === "confirmed" ? (
                        <p>
                            <b className="bookings-confirmed">Potwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.handleBookingCancel(book.idBooking)}>Anuluj</button>
                        </p>
                    ) : book.status === "canceled" ? (
                            <b className="bookings-canceled">Anulowana</b>
                    )
                    : ""}</td>
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
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {bookings}
                                </table>
                                <br />
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