import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AddButton from '../Components/Buttons/AddButton';
import EditButton from '../Components/Buttons/EditButton';
import DeleteButton from '../Components/Buttons/DeleteButton';
import Card from '../Components/Card';

const baseUrl = process.env.REACT_APP_BASE_API_URL;


class EmployeeListButton extends Component {
    render() {
        const employeesUrl = this.props.employeesUrl;
        return <Link to={employeesUrl} className="button is-primary is-outlined is-small">Employees</Link>
    }
}

class CompanyRow extends Component {

    render() {
        const company = this.props.company;
        const editUrl = 'company/update/' + company.id;
        const deleteUrl = 'company/delete/' + company.id;
        const employeesUrl = '/company/employees/' + company.id;
        return (
            <tr>
                <td>{company.name}</td>
                <td>{company.phone}</td>
                <td>{company.address_1}</td>
                <td>{company.address_2}</td>
                <td>{company.zip}</td>
                <td>{company.post_code}</td>
                <td>
                    <div className="buttons">
                        <EditButton editUrl={editUrl}/>
                        <DeleteButton deleteUrl={deleteUrl}/>
                        <EmployeeListButton employeesUrl={employeesUrl}/>
                    </div>
                </td>
            </tr>
        )
    }
}

class CompanyTable extends Component {

    render() {
        const companyAddUrl = 'company/add';
        const rows = [];
        if (!this.props.loading) {
            this.props.companies.forEach((company) => {
                rows.push(<CompanyRow company={company} key={company.id}/>)
            });
            if (rows.length === 0) {
                rows.push(
                    <tr>
                        <td colSpan={7}>
                            <div className="notification is-primary">Companies not found.</div>
                        </td>
                    </tr>
                )
            }
        }

        return (
            <Card>
                <div className="columns table-container">
                    <div className="column is-half">
                        <h3>Companies</h3>
                    </div>
                    <div className="column is-half">
                        <AddButton addUrl={companyAddUrl} lable={"Company"}/>
                    </div>
                </div>

                <table className="table is-bordered is-fullwidth table-container">
                    <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Zip</th>
                        <th>Post Code</th>
                        <th className="has-text-centered"><i className="fas fa-cog"></i></th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                        {rows}
                    </tbody>
                </table>
            </Card>
        )
    }
}

class Companies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            loading: true,
        }
    }

    componentDidMount() {
        const url = baseUrl + 'company/';
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({'companies': json, 'loading': false});
            });
    }

    render() {
        return <CompanyTable companies={this.state.companies} loading={this.state.loading}/>
    }

}

export default Companies;
