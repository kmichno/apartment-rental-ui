import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";

class ApartmentAdministration extends Component {

    constructor() {
        super();
        this.state = {
            apartmentsList: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/apartments/show/all";

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

    deleteApartment(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/delete";
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleSubmit (idApartment) {
        return event => {
            event.preventDefault();
            this.deleteApartment(idApartment);
            let filteredArray = this.state.apartmentsList.filter(item => idApartment != item.idApartment)
            this.setState({apartmentsList: filteredArray});

        }
    }

    render() {
        let apartments = this.state.apartmentsList.map((apartment) => {
            return (
                <div className="apartment" key={apartment.idApartment}>
                    <div className="img">

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
                            <div className="button"><NavLink to={`/admin/apartment/edit/17`}>Edytuj dane</NavLink></div>
                            <div className="button" onClick={()=>{this.deleteApartment(apartment.idApartment)}}>Usuń apartament</div>
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
                                <div><NavLink to={`apartment/add`}>Dodaj nowy apartament</NavLink></div>
                                <h1>
                                    Edytuj apartament:
                                </h1>
                                {apartments}
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

export default ApartmentAdministration;
