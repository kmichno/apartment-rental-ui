import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class ApartmentDetails extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(this.props.match.params.idApartment);
        console.log("fsfsf");
        this.state = {
            apartment: 0,
            idApartment: this.props.match.params.idApartment,
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/apartments/show/"+this.state.idApartment;

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
            this.setState({apartment: results})
        })
    }

    bookApartment(idApartment, idUser, start, end) {
        const url = `http://localhost:8080/bookings/add`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idApartment: idApartment,
                idUser: idUser,
                start: start,
                end: end
            })
        });
    }


    postData = (event) => {
        event.preventDefault();
        console.log("zrobione");
        this.bookApartment(this.state.apartment.idApartment, 1, 1, 1)
        // this.setState({product_added: false});
        // addProduct(this.state.product_name, this.state.product_description, this.state.product_category, this.state.product_price);
        // this.setState({product_added: true});
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
                                    Wybrany apartament:
                                </h1>
                                <div className="apartment" key={this.state.apartment.idApartment}>
                                    <div className="img">

                                    </div>
                                    <div className="description-content">
                                        <h3>{this.state.apartment.nameApartment}</h3>
                                        <p className="city">{this.state.apartment.city}</p>
                                        <div className="description">{this.state.apartment.description}</div>
                                        <p className="additional-info">Dodatkowe informacje</p>
                                        <div className="additional-description">{this.state.apartment.additionalDescription}</div>
                                        <div className="price">
                                            <p>Max. ilość ludzi: {this.state.apartment.numberPeople}</p>
                                            <p>Cena: {this.state.apartment.priceDay} zł</p>
                                        </div>
                                        <div className="place-button">
                                            < form onSubmit={this.postData}>
                                                <button className="button">Rezerwuje</button>
                                            </form>
                                        </div>
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
    }
}

export default ApartmentDetails;
