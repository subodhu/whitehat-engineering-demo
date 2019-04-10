import React, {Component} from 'react';


class Option extends Component {

    render() {
        const value = this.props.value;
        const label = this.props.label;
        return <option value={value}>{label}</option>
    }
}


class SelectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        this.props.onTextChange(event);
    };

    componentDidMount() {
        const url = this.props.url;
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.status)
                }
            })
            .then(json => {
                this.setState({'options': json});
            }).catch(err => console.log(err));

    }

    render() {
        const name = this.props.name;
        const label = this.props.label;
        const error = this.props.error;
        const value = this.props.value;
        const errorClass = error ? 'is-danger' : "";

        const options = name === 'role' ? [] :[<Option key={name} value={""} label={"--------------------"}/>];
        this.state.options.map(option => {
            return options.push(<Option key={name + option.value.toString()} value={option.value} label={option.label}/>)
        });

        return (
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">{label}</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className={"select"}>
                                <select value={value} name={name} onChange={this.handleInputChange}>
                                    {options}
                                </select>
                            </div>
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

export default SelectInput;
