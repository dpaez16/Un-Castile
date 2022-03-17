import React, {Component} from 'react';
import { CastleCardValue } from '../../Classes/CastleCard';

export class CastleCardComponent extends Component {
    static SUITS = "HDCS";
    static VALUES = "23456789TJQKA";

    getCardFileName(suit, value) {
        const suitChar = CastleCardComponent.SUITS[suit.numVal];
        const valueChar = CastleCardComponent.VALUES[value.numVal - CastleCardValue.Two.numVal];
        return `${valueChar}${suitChar}`;
    };

    getCardPath(suit, value, front) {
        if (!front) {
            return `${process.env.PUBLIC_URL}/assets/images/CastleCard/Back.svg`;
        } else {
            const cardFileName = this.getCardFileName(suit, value);
            return `${process.env.PUBLIC_URL}/assets/images/CastleCard/${cardFileName}.svg`;
        }
    }

    render() {
        const {suit, value, front, height, style = {}, className = ""} = this.props;
        style.height = height;

        const cardPath = this.getCardPath(suit, value, front);
        const cardStr = `${suit.toString()} - ${value.toString()}`;

        if (!front) {
            return (
                <img src={cardPath} className={`castle-card__back ${className}`} alt="card-back" style={style} />
            );
        } else {
            return (
                <img src={cardPath} className={`castle-card ${className}`} alt={cardStr} style={style} />
            );
        }
    };
};