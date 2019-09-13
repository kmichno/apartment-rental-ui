import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import * as moment from 'moment';
import ReactDOM from 'react-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('pl');
momentLocalizer();

ReactDOM.render(<DateTimePicker />, document.getElementById('root'));

class LeftSide extends Component {

    constructor() {
        super();
        this.state = {
            dateFrom: "",
            dateTo: "",
            city: "",
            numberPeople: "",
        };
    }

    checkInvalidDates(date) {

        // return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply(event, picker) {
        // const startAt = picker.startDate.format('Y/MM/DD');
        // const endAt = picker.endDate.format('Y/MM/DD');
        // this.dateRef.current.value = startAt + ' to ' + endAt;

        // this.setState({
        //     proposedBooking: {
        //         ...this.state.proposedBooking,
        //         startAt,
        //         endAt
        //     }
        //
        // });

    }

    onChange() {
        console.log(this.state.dateFrom)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit =
        event => {
            event.preventDefault();
            // this.togglePopup();
            // this.addApartment();

        }

    render() {
        console.log(this.state.dateFrom)
        return (
            <div id="left-side">
                <div id="search-box">
                    <div id="search-box-inner">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row-search">
                                <label htmlFor="name">Miasto:</label>
                                <input className="input-search" type="text" required id="name" name="city" value={this.state.city} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Od:</label>
                                <DateTimePicker format={"dddd DD.MM.YYYY"}
                                                onChange={value => this.setState({ dateFrom: moment(value).format('YYYY-MM-DD') })}
                                                time={false}
                                                defaultValue={new Date()}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Do:</label>
                                <DateTimePicker format={"dddd DD.MM.YYYY"}
                                                onChange={value => this.setState({ dateTo: moment(value).format('YYYY-MM-DD') })}
                                                time={false}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Maksymalna ilość osób:</label>
                                <input className="input-search" type="number" required id="name" name="numberPeople" value={this.state.numberPeople} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="row-search">
                                <input className="button" type="button" value="Wyszukaj"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftSide;