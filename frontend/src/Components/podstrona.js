import React from 'react';
import {NavLink, Link} from "react-router-dom";
export const Podstrona = props => {
    return (
        <React.Fragment>
            <div>Podstrona</div>
            <div>
                    <li><Link to="/">Wroc do glownej</Link></li>
            </div>
        </React.Fragment>
    );
};
Podstrona.propTypes = {};