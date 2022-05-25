import React, {Component} from 'react';
import "./Card.css";

export class Card extends Component {
    render() {
        const {style = {}, front, back} = this.props;

        return (
            <div className="card-container">
                <div className="card-container__card">
                    <div className="front">{front}</div>
                    <div className="back">{back}</div>
                </div>
            </div>
        );
    };
};