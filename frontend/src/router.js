import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
import ApartmentDetails from './Components/ApartmentDetails';
import Bookings from './Components/Bookings';
import ApartmentAdministration from './Components/ApartmentAdministration';
import AddApartment from './Components/AddApartment';
import EditApartment from './Components/EditApartment';

export default (
    <React.Fragment>​
        <Route exact path="/" component={MainPage} myname={"Main page"}/>
        <Route path="/apartment/details/:idApartment" component={ApartmentDetails} name = "Szczegoly apartamentu" />
        <Route path="/bookings" component={Bookings} name = "Moje rezerwacje" />
        <Route path="/admin/apartments" component={ApartmentAdministration} name = "Administracja apartamentami" />
        <Route path="/admin/apartment/add" component={AddApartment} name = "Dodaj apartament" />
        <Route path="/admin/apartment/edit/:idApartment" component={EditApartment} name = "Dodaj apartament" />
    </React.Fragment>
);