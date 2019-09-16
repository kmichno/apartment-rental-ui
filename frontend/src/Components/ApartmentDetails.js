import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import ModalImage from "react-modal-image";

class ApartmentDetails extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(this.props.match.params.idApartment);
        console.log("fsfsf");
        this.state = {
            apartment: 0,
            idApartment: this.props.match.params.idApartment,
            dateFrom: this.props.match.params.dateFrom,
            dateTo: this.props.match.params.dateTo,
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
            this.setState({apartment: results.result})
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
        console.log(this.state.apartment.idApartment);
        this.bookApartment(this.state.apartment.idApartment, 1, this.state.dateFrom, this.state.dateTo)
    }



    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Wybrany apartament:
                                </h1>
                                <div className="apartment" key={this.state.apartment.idApartment}>
                                    <div className="img">
                                        <ModalImage
                                            className="picture-apartment"
                                            small={"http://localhost:8080/uploads/"+this.state.apartment.filePath}
                                            large={"http://localhost:8080/uploads/"+this.state.apartment.filePath}
                                            hideDownload="true"
                                            alt={this.state.apartment.nameApartment+" ("+this.state.apartment.city+")"}
                                        />
                                    </div>
                                    <div className="description-content">
                                        <h3>{this.state.apartment.nameApartment}</h3>
                                        <p className="city">{this.state.apartment.city}</p>
                                        <div className="description">{this.state.apartment.description}</div>
                                        <p className="additional-info">Dodatkowe informacje</p>
                                        <div className="additional-description">{this.state.apartment.additionalDescription}</div>
                                        <div className="price">
                                            <p>Czas rezerwacji: {this.state.dateFrom}-{this.state.dateTo}</p>
                                            <p>Max. ilość osób: {this.state.apartment.numberPeople}</p>
                                            <p>Cena: {this.state.apartment.priceDay} zł (1 dzień)</p>
                                        </div>
                                        <div className="place-button">
                                            <form onSubmit={this.postData}>
                                                <button className="button">Rezerwuje</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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

export default ApartmentDetails;
