import React, {Component} from 'react';

import TextInput from '../Components/Inputs/TextInput';
import SelectInput from '../Components/Inputs/SelectInput';
import SubmitButton from '../Components/Buttons/SubmitButton';
import Card from '../Components/Card';

const baseUrl = process.env.REACT_APP_BASE_API_URL;


class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.employee = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            role: 2,
            company: "",
            manager: "",
            address_1: "",
            address_2: "",
            zip: "",
            post_code: "",
        };
        this.state = {
            employee: this.employee,
            errors: {},
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUrl() {
        const employeeID = this.props.match.params.employeeID;
        let url = baseUrl + 'employee/';
        if (employeeID) {
            url += employeeID + '/';
        }
        return url;
    }

    getMethod() {
        return this.props.match.params.employeeID ? 'PUT' : 'POST';
    }

    componentDidMount() {
        if (this.props.match.params.employeeID) {
            fetch(this.getUrl())
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error(response.status)
                    }
                })
                .then(json => {
                    this.setState({'employee': json});
                }).catch(err => console.log(err));
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let employee = {...this.state.employee};
        employee[name] = value;
        this.setState({
            employee: employee
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const url = this.getUrl();
        const data = this.state.employee;
        fetch(url, {
            method: this.getMethod(),
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json().then(json => ({
                status: res.status,
                json
            })
        ))
        .then(({status, json}) => {
            if (status === 400) {
                this.setState({errors: json})
            } else if (status > 400) {
                alert("Some error occurred. Try again later");
            } else {
                this.props.history.push("/employees")
            }
        })
        .catch(error => console.error('Error:', error));

    }

    render() {
        const error = this.state.errors;
        const employee = this.state.employee;
        const employeeID = this.props.match.params.employeeID;
        const header = employeeID ? 'Update' : 'Add';
        const roleUrl = baseUrl + 'role-choices/';
        const companyUrl = baseUrl + 'company-choices/';
        let managerUrl = baseUrl +'manager-choices/';
        if (employeeID) {
            managerUrl += employeeID.toString() + '/';
        }

        return (
            <Card>
                <div className="columns is-mobile is-centered">
                    <br/>
                    <h5>{header} Employee</h5>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <TextInput onTextChange={this.handleInputChange}
                               name="first_name" label="First Name" value={employee.first_name}
                               error={error.first_name}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="last_name" label="Last Name" value={employee.last_name} error={error.last_name}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="email" label="Email" value={employee.email} error={error.email}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="phone" label="Phone" value={employee.phone} error={error.phone}/>
                    <SelectInput onTextChange={this.handleInputChange} url={roleUrl}
                                 name="role" label="Role" value={employee.role} error={error.role}/>
                    <SelectInput onTextChange={this.handleInputChange} url={companyUrl}
                                 name="company" label="Company" value={employee.company} error={error.company}/>
                    <SelectInput onTextChange={this.handleInputChange} url={managerUrl}
                                 name="manager" label="Manager" value={employee.manager} error={error.manager}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="address_1" label="Address 1" value={employee.address_1} error={error.address_1}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="address_2" label="Address 2" value={employee.address_2} error={error.address_2}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="zip" label="Zip" value={employee.zip} error={error.zip}/>
                    <TextInput onTextChange={this.handleInputChange}
                               name="post_code" label="Postcode" value={employee.post_code} error={error.post_code}/>

                    <SubmitButton/>
                </form>
            </Card>
        );
    }
}

export default EmployeeForm;
