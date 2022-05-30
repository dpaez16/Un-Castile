import React, {Component} from 'react';
import { CastleCardValue } from '../../Classes/CastleCard';
import { Card }  from '../Card/Card';
import { getStyleDict } from '../../Utils';
import { motion } from 'framer-motion';

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
        const {suit, value, height, style = {}, flipped=false} = this.props;
        style.height = height;

        const cardStr = `${suit.toString()} - ${value.toString()}`;
        const cardPath = this.getCardPath(suit, value, false);
        const backCardPath = this.getCardPath(suit, value, true);

        //const frontElement = (<img src={cardPath} alt={cardStr} style={style} />);
        //const backElement = (<img src={backCardPath} alt={cardStr} style={style} />);

        //<div class="svg-img" style="background-image: url('DrawFour.svg');"></div>
        const frontElement = (<div className="svg-img" style={getStyleDict(style, cardPath)}></div>);
        const backElement = (<div className="svg-img" style={getStyleDict(style, backCardPath)}></div>);

        return (
            <Card height="200px" style={style} front={frontElement} back={backElement} cardID={cardStr}/>
        );
    };
};