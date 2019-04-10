import React, {Component} from 'react';

import AddButton from '../Components/Buttons/AddButton';
import EditButton from '../Components/Buttons/EditButton';
import DeleteButton from '../Components/Buttons/DeleteButton';
import {Link} from "react-router-dom";
import Card from '../Components/Card';


class ChangeManagerButton extends Component {

    render() {
        const changeManagerUrl = this.props.changeManagerUrl;
        return <Link to={changeManagerUrl} title={"Add/Change Manager"}
                     className="change-manager button is-primary is-outlined is-small">
            <span className="icon is-small">
                <i className="fas fa-cog"></i>
            </span>
        </Link>
    }
}


class EmployeeRow extends Component {

    render() {
        const employee = this.props.employee;
        const editUrl = '/employee/update/' + employee.id;
        const deleteUrl = '/employee/delete/' + employee.id;
        const changeManagerUrl = '/change/manager/' + employee.id;
        return (
            <tr>
                <td>{employee.first_name + ' ' + employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.role}</td>
                <td>{employee.company}</td>
                <td>
                    {employee.manager}
                    <ChangeManagerButton changeManagerUrl={changeManagerUrl}/>
                </td>
                <td>{employee.address_1}</td>
                <td>{employee.address_2}</td>
                <td>{employee.zip}</td>
                <td>{employee.post_code}</td>
                <td>
                    <div className={"buttons"}>
                        <EditButton editUrl={editUrl}/>
                        <DeleteButton deleteUrl={deleteUrl}/>
                    </div>
                </td>
            </tr>
        )
    }
}

class EmployeeTable extends Component {

    render() {
        const rows = [];
        if (!this.props.loading) {
            this.props.employees.forEach((employee) => {
                rows.push(<EmployeeRow employee={employee} key={employee.id}/>)
            });
            if (rows.length === 0) {
                rows.push(
                    <tr>
                        <td colSpan={11}>
                            <div className="notification is-primary">Employees not found.</div>
                        </td>
                    </tr>
                )
            }
        }

        return (
            <div className="container-fluid table-container">
                <div className="columns">
                    <div className="column is-half">
                        <h3>Employees</h3>
                    </div>
                    <div className="column is-half">
                        <AddButton addUrl={"/employee/add"} lable={"Employee"}/>
                    </div>
                </div>
                <table className="table is-bordered is-fullwidth is-narrow table-container">
                    <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Manager</th>
                        <th>Address 1</th>
                        <th>Addres 2</th>
                        <th>Zip</th>
                        <th>Postcode</th>
                        <th><i className="fas fa-cog"></i></th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                        {rows}
                    </tbody>
                </table>

            </div>
        )
    }
}

class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true,
        }
    }

    componentDidMount() {
        const companyId = this.props.match.params.companyID;
        let url = process.env.REACT_APP_BASE_API_URL + 'employee/';
        if (companyId) {
            url += 'company/' + companyId + '/';
        }
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({'employees': json, 'loading': false});
            });
    }

    render() {
        return (
            <Card>
                <EmployeeTable employees={this.state.employees} loading={this.state.loading}/>
            </Card>
        )
    }

}

export default Employees;
