import React, {Component} from 'react';

import SelectInput from '../Components/Inputs/SelectInput';
import SubmitButton from '../Components/Buttons/SubmitButton';
import Card from '../Components/Card';

const baseUrl = process.env.REACT_APP_BASE_API_URL;


class ChangeManagerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manager: "",
            errors: {},
            employee: {},
        };

        this.employeeID = this.props.match.params.employeeID;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = baseUrl + 'employee/' + this.employeeID + '/';
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.status)
                }
            })
            .then(json => {
                this.setState({'employee': json, 'manager': json.manager});
            }).catch(err => console.log(err));

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const url = baseUrl + 'change-manager/' + this.employeeID + '/';
        const data = {'manager': this.state.manager};
        fetch(url, {
            method: 'PUT',
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
        const manager = this.state.manager || "";
        const employeeID = this.props.match.params.employeeID;
        let managerUrl = baseUrl + 'manager-choices/' + employeeID.toString() + '/';

        return (
            <Card>
                <div className="columns is-mobile is-centered">
                    <h5>Change manager of employee {employee.first_name + ' ' + employee.last_name}</h5><br/>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <SelectInput onTextChange={this.handleInputChange} url={managerUrl}
                                 name="manager" label="Manager" value={manager} error={error.manager}/>
                    <SubmitButton/>
                </form>
            </Card>
        );
    }
}

export default ChangeManagerForm;
