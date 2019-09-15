import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";

class Bookings extends Component {

    constructor() {
        super();
        this.state = {
            bookings: [],
            apartmentsList: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
                this.setState({apartmentsList: results.result})
        })
    }

    cancelBooking(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/delete";
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleSubmit (idBooking) {
        return event => {
            event.preventDefault();
            this.cancelBooking(idBooking);
            let filteredArray = this.state.apartmentsList.filter(item => idBooking != item.idBooking)
            this.setState({apartmentsList: filteredArray});

        }
    }

    render() {

        let bookings = this.state.apartmentsList.map((booking) => {
            console.log(booking.apartment);
            return (
                <div className="apartment" key={booking.idBooking}>
                    <div className="img">
                        {booking.apartment.Gallery != null ? booking.apartment.Gallery.fileGallery : ""}
                    </div>
                    <div className="description-content">
                        <h3>{booking.apartment.nameApartment}</h3>
                        <p className="city">{booking.apartment.city}</p>
                        <div className="price">
                            <p>Status: {booking.status === "unconfirmed" ? (

                                    <b className="bookings-unconfirmed">Niepotwierdzona</b>

                            ) : booking.status === "confirmed" ? (

                                    <b className="bookings-confirmed">Potwierdzona</b>

                            ) : booking.status === "canceled" ? (
                                    <b className="bookings-canceled">Anulowana</b>
                                )
                                : ""}</p>
                            <p>Od {booking.start} do {booking.end}</p>
                            <p>Max. ilość osób: {booking.apartment.numberPeople}</p>
                            <p>Cena: {booking.apartment.priceDay} zł (1 dzień)</p>
                        </div>
                        <div className="place-button">
                            <form onSubmit={this.handleSubmit(booking.idBooking)}>
                                <button className="button">Anuluj rezerwacje</button>
                            </form>
                        </div>
                    </div>
                </div>
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
                                <h1>
                                    Rezerwacje:
                                </h1>
                                {bookings}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

export default Bookings;
