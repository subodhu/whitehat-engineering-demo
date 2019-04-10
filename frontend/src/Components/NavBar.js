import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom'


class NavBar extends Component {

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">DEMO APP</Link>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink className="navbar-item" to="/companies">Companies</NavLink>
                        <NavLink className="navbar-item" to="/employees">Employees</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;
