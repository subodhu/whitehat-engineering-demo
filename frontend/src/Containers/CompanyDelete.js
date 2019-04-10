import React, {Component} from 'react';

const baseUrl = process.env.REACT_APP_BASE_API_URL;


class CompanyDelete extends Component {

    constructor(props){
        super(props);
        this.state = {
            'company': {}
        };
        const companyID = this.props.match.params.companyID;
        this.url = baseUrl + 'company/' + companyID + '/';

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(this.url)
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                this.setState({company: myJson});
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
                this.props.history.push("/companies")
            }
        }).catch(error => console.error('Error:', error));

    };

    render() {
        const company = this.state.company;
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        Delete Company
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>Are you sure you want to delete company <i>'{company.name}'</i> ?</p>
                    </div>
                </div>
                <footer className="card-footer">
                    <button onClick={this.handleClick} className={"button is-danger card-footer-item"}>Delete</button>
                </footer>
            </div>
        )
    }
}

export default CompanyDelete;
