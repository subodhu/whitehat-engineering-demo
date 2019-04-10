import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class DeleteButton extends Component {


    render() {
        const deleteUrl = this.props.deleteUrl;
        const extraClass = this.props.extraClass;
        return <Link to={deleteUrl} title={"Delete"} className={"button is-danger is-outlined is-small " + extraClass}>
            <span className="icon is-small">
                <i className="fas fa-trash"></i>
            </span>
        </Link>
    }
}

export default DeleteButton;
