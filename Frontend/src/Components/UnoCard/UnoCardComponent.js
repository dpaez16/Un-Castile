import React, {Component} from 'react';
import { UnoCardType } from '../../Classes/UnoCard';

export class UnoCardComponent extends Component {
    getCardPath(color, cardType, cardValue, front) {
        if (!front) {
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/Back.svg`;
        } else {
            const cardValueStr = cardType.numVal === UnoCardType.Number ? cardValue.numVal : cardValue.toString();
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/${color.toString()}/${cardType.toString()}/${cardValueStr}.svg`;
        }
    }

    render() {
        const {color, cardType, cardValue, front, style = {}, height} = this.props;
        style.height = height;

        const cardStr = `${color.toString()} - ${cardValue.toString()}`;
        const cardPath = this.getCardPath(color, cardType, cardValue, front);

        return (
            <img src={cardPath} className={"uno-card"} alt={cardStr} style={style} />
        );
    };
};