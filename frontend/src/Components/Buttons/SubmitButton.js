import React, {Component} from 'react';


class SubmitButton extends Component {

    render() {
        return (
            <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="button is-primary" type="submit" value="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitButton;
