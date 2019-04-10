import React, {Component} from 'react';


class EmployeeDelete extends Component {

    constructor(props){
        super(props);
        this.state = {
            'employee': {}
        };
        const employeeID = this.props.match.params.employeeID;
        this.url = process.env.REACT_APP_BASE_API_URL + 'employee/' + employeeID +'/';

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        fetch(this.url)
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({employee: json});
            });
    }

    handleClick(event) {
        event.preventDefault();
        fetch(this.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res)
        .then(response => {
            if (response.status >= 400) {
                alert("Some error occurred. Try again later");
            } else {
                this.props.history.push("/employees")
            }
        }).catch(error => console.error('Error:', error));

    };

    render() {
        const employee = this.state.employee;
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        Delete Employee
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>Are you sure you want to delete employee <i>'{employee.first_name + employee.last_name}'</i> ?</p>
                    </div>
                </div>
                <footer className="card-footer">
                    <button onClick={this.handleClick} className={"button is-danger card-footer-item"}>Delete</button>
                </footer>
            </div>
        )
    }
}

export default EmployeeDelete;
