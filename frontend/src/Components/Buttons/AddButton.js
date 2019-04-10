import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AddButton extends Component {

    render() {
        const addUrl = this.props.addUrl;
        const lable = this.props.lable;
        return <Link to={addUrl} className="button is-primary is-small is-pulled-right">Add New {lable}</Link>
    }
}

export default AddButton;
