import React, {Component} from 'react';
import { CastleCardValue } from '../../Classes/CastleCard';

export class CastleCardComponent extends Component {
    static SUITS = "HDCS";
    static VALUES = "23456789TJQKA";

    getCard(suit, value) {
        const suitChar = CastleCardComponent.SUITS[suit.numVal];
        const valueChar = CastleCardComponent.VALUES[value.numVal - CastleCardValue.Two.numVal];
        return `${valueChar}${suitChar}`;
    };

    render() {
        const {suit, value, front, height, style = {}, className = ""} = this.props;
        const card = this.getCard(suit, value);
        style.height = height;

        let cardPath = `${process.env.PUBLIC_URL}/assets/images/CastleCard/`;

        if (!front) {
            cardPath += "Back.svg";
            return (
                <img src={cardPath} className={`castle-card__back ${className}`} alt="card-back" style={style} />
            );
        } else {
            cardPath += `${card}.svg`;
            return (
                <img src={cardPath} className={`castle-card ${className}`} alt={card} style={style} />
            );
        }
    };
};