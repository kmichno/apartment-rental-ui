import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
import ApartmentDetails from './Components/ApartmentDetails';
import Bookings from './Components/Bookings';
export default (
    <React.Fragment>​
        <Route exact path="/" component={MainPage} myname={"Main page"}/>
        <Route path="/apartment/details/:idApartment" component={ApartmentDetails} name = "Szczegoly apartamentu" />
        <Route path="/reservations" component={Bookings} name = "Moje rezerwacje" />
    </React.Fragment>
);