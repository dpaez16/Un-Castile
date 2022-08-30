import React, {Component} from 'react';
import { CastleCardValue } from '../../Classes/CastleCard';
import { Card }  from '../Card/Card';
import { getStyleDict } from '../../Utils';

export class CastleCardComponent extends Component {
    static SUITS = "HDCS";
    static VALUES = "23456789TJQKA";

    getCardFileName(suit, value) {
        const suitChar = CastleCardComponent.SUITS[suit.numVal];
        const valueChar = CastleCardComponent.VALUES[value.numVal - CastleCardValue.Two.numVal];
        return `${valueChar}${suitChar}`;
    };

    getCardPath(suit, value, flipped) {
        if (!flipped) {
            return `${process.env.PUBLIC_URL}/assets/images/CastleCard/Back.svg`;
        } else {
            const cardFileName = this.getCardFileName(suit, value);
            return `${process.env.PUBLIC_URL}/assets/images/CastleCard/${cardFileName}.svg`;
        }
    }

    render() {
        const {suit, value, height, style = {}, flipped=false} = this.props;

        const cardStr = `${suit.toString()} - ${value.toString()}`;
        const cardPath = this.getCardPath(suit, value, flipped);
        const backCardPath = this.getCardPath(suit, value, flipped);

        const ratio = 225 / 315; // imageWidth / imageHeight
        const width = Math.round(ratio * height);

        const frontElement = (<div className="svg-img" style={getStyleDict(style, height, width, cardPath)}></div>);
        const backElement = (<div className="svg-img" style={getStyleDict(style, height, width, backCardPath)}></div>);

        return (
            <Card   style={style} 
                    front={frontElement} 
                    back={backElement} 
                    cardID={cardStr}
                    height={height}
                    width={width}
            />
        );
    };
};