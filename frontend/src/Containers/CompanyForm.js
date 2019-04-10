import React, {Component} from 'react';

import TextInput from '../Components/Inputs/TextInput';
import SubmitButton from '../Components/Buttons/SubmitButton';
import Card from '../Components/Card';


class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            address_1: "",
            address_2: "",
            zip: "",
            post_code: "",
            errors: {},
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUrl() {
        let url = process.env.REACT_APP_BASE_API_URL + 'company/';
        const companyID = this.props.match.params.companyID;
        if (companyID) {
            url += companyID + '/';
        }
        return url;
    }

    getMethod() {
        return this.props.match.params.companyID ? 'PUT' : 'POST';
    }

    componentDidMount() {
        if (this.props.match.params.companyID) {
            fetch(this.getUrl())
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error(response.status)
                    }
                })
                .then(json => {
                    this.setState(json);
                }).catch(err => console.log(err));
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const url = this.getUrl();
        const data = this.state;
        delete data.errors;
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
                console.log(JSON.stringify(json));
                if (status === 400) {
                    this.setState({errors: json})
                } else if (status > 400) {
                    alert("Some error occurred. Try again later");
                } else {
                    this.props.history.push("/companies")
                }
            })
            .catch(error => console.error('Error:', error));

    }

    render() {
        const error = this.state.errors || {};
        const header = this.state.id ? 'Update' : 'Add';
        return (
            <Card>
                <div className="columns is-mobile is-centered">
                    <br/>
                    <h2>{header} Company</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <TextInput onTextChange={this.handleInputChange}
                               name="name" label="Name" value={this.state.name} error={error.name}/>
                    <TextInput onTextChange={this.handleInputChange} name="phone"
                               label="Phone" value={this.state.phone} error={error.phone}/>
                    <TextInput onTextChange={this.handleInputChange} name="address_1" label="Address 1"
                               value={this.state.address_1} error={error.address_1}/>
                    <TextInput onTextChange={this.handleInputChange} name="address_2" label="Address 2"
                               value={this.state.address_2} error={error.address_2}/>
                    <TextInput onTextChange={this.handleInputChange} name="zip" label="Zip"
                               value={this.state.zip} error={error.zip}/>
                    <TextInput onTextChange={this.handleInputChange} name="post_code" label="Post Code"
                               value={this.state.post_code} error={error.post_code}/>
                    <SubmitButton/>
                </form>
            </Card>
        );
    }
}

export default CompanyForm;
