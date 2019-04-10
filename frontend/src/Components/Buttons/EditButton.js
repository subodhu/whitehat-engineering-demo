import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditButton extends Component {

    render() {
        const editUrl = this.props.editUrl;
        return <Link to={editUrl} title={"Edit"} className="button is-primary is-outlined is-small">
            <span className="icon is-small">
                <i className="fas fa-pen"></i>
            </span>
        </Link>
    }
}

export default EditButton;
