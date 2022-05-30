import React, {Component} from 'react';
import "./Card.css";

export class Card extends Component {
    render() {
        const {style = {}, front, back, cardID} = this.props;
        const divID = `card-container-${cardID}`;

        return (
            <div className="card" id={divID}>
                <div className="card-inner">
                    <div className="card-front">
                        {front}
                    </div>
                    <div className="card-back">
                        {back}
                    </div>
                </div>
            </div>
        );
    };
};