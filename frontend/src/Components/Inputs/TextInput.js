import React, {Component} from 'react';

class TextInput extends Component {

    handleInputChange = (event) => {
        this.props.onTextChange(event)
    };

    render() {
        const name = this.props.name;
        const label = this.props.label;
        const error = this.props.error;
        const value = this.props.value;
        const errorClass = error ? 'is-danger' : "";

        return (
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">{label}</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className={"input " + errorClass}
                                   placeholder={label}
                                   name={name}
                                   type="text"
                                   value={value}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <p className={"help " + errorClass}>
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextInput;
