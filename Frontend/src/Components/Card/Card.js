import React, {Component} from 'react';
import "./Card.css";

export class Card extends Component {
    render() {
        const {style = {}, front, back, cardID, height, width} = this.props;
        const divID = `card-container-${cardID}`;
        style.height = `${height}px`;
        style.width = `${width}px`;

        return (
            <div className="card" key={divID} style={style}>
                <div className="card-inner" style={style}>
                    <div className="card-front" style={style}>
                        {front}
                    </div>
                    <div className="card-back" style={style}>
                        {back}
                    </div>
                </div>
            </div>
        );
    };
};