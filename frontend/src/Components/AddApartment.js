import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";

class ApartmentAdministration extends Component {

    constructor() {
        super();
        this.state = {
            apartments: [],
        };
    }

    componentDidMount() {

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
                                    Dodaj apartament:
                                </h1>
                                <div>
                                    <form className="addapartment" action="/my-handling-form-page" method="post">
                                        <div>
                                            <label htmlFor="name">Nazwa apartamentu:</label>
                                            <input type="text" id="name" name="nameApartment"/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Miasto:</label>
                                            <input type="text" id="city" name="city"/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Ulica:</label>
                                            <input type="text" id="streat" name="streat"/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Kod pocztowy:</label>
                                            <input type="text" id="code" name="code"/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Cena za noc:</label>
                                            <input type="number" id="code" name="code"/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Maksymalna ilość ludzi:</label>
                                            <input type="number" id="code" name="code"/>
                                        </div>
                                        <div>
                                            <label htmlFor="msg">Opis apartamentu:</label>
                                            <textarea id="msg" name="description"></textarea>
                                        </div>
                                    </form>
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

export default ApartmentAdministration;
