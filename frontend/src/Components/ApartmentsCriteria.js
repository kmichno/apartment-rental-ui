import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import LeftSide from './LeftSide';


class ApartmentsCriteria extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            apartments: [],
            dateFrom: this.props.match.params.dateFrom,
            dateTo: this.props.match.params.dateTo,
            numberPeople: this.props.match.params.numberPeople,
            city: this.props.match.params.city,
        };

    }

    componentDidMount() {
        if(this.state.dateFrom != null) {
            this.getApartmentsByCriteria();
        } else {
            this.getAllApartments();
        }
    }

    getApartmentsByCriteria() {
        var url = "http://localhost:8080/apartments/show/"+this.state.dateFrom+"/"+this.state.dateTo+"/"+this.state.numberPeople+"/"+this.state.city;

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({apartments: results.result})
        })
    }

    getAllApartments() {
        var url = "http://localhost:8080/apartments/show/all/0/10";

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({apartments: results.result})
        })
    }

    render() {
        console.log(this.state.apartments);
        let apartments = "";
        if(this.state.apartments.length === 0) {
            apartments = this.state.apartments.map((apartment) => {
                return (
                    <div>Brak apartamentów</div>
                )
            });

        } else
            {
                apartments = this.state.apartments.map((apartment) => {
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
                                    <div className="button"><NavLink to={`apartment/details/${apartment.idApartment}`}>Zobacz
                                        szczegóły</NavLink></div>
                                </div>
                            </div>
                        </div>
                    )
                });
            }
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide city={this.state.city} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} numberPeople={this.state.numberPeople}/>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Wybierz apartament:
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

export default ApartmentsCriteria;
