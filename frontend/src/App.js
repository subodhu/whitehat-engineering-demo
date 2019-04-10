import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import NavBar from './Components/NavBar';
import Companies from './Containers/Companies';
import Employees from './Containers/Employees';
import CompanyForm from './Containers/CompanyForm';
import CompanyDelete from './Containers/CompanyDelete';
import  EmployeeForm from './Containers/EmployeeForm';
import EmployeeDelete from './Containers/EmployeeDelete';
import ChangeManagerForm from './Containers/ChangeManagerForm';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar/>
                    <Route path="/" exact component={Companies}/>
                    <div id="main-body">
                        <Route path="/companies" exact component={Companies}/>
                        <Route path="/employees" exact component={Employees}/>
                        <Route path="/company/employees/:companyID" exact component={Employees}/>
                        <Route path="/company/add" exact component={CompanyForm}/>
                        <Route path="/company/update/:companyID" exact component={CompanyForm}/>
                        <Route path="/company/delete/:companyID" exact component={CompanyDelete}/>
                        <Route path="/employee/add" exact component={EmployeeForm}/>
                        <Route path="/employee/update/:employeeID" exact component={EmployeeForm}/>
                        <Route path="/employee/delete/:employeeID" exact component={EmployeeDelete}/>
                        <Route path="/change/manager/:employeeID" exact component={ChangeManagerForm}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
