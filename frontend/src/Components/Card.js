import React, {Component} from 'react';


class Card extends Component {

    render() {
        return (
            <div className="columns">
                <div className="column is-full">
                    <div className="card">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;
