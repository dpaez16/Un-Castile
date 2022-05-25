import React, {Component} from 'react';
import { UnoCardType } from '../../Classes/UnoCard';
import { Card } from '../Card/Card';

export class UnoCardComponent extends Component {
    getCardPath(color, cardType, cardValue, front) {
        if (!front) {
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/Back.svg`;
        } else {
            const cardValueStr = cardType.numVal === UnoCardType.Number.numVal ? cardValue.numVal : cardValue.toString();
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/${color.toString()}/${cardType.toString()}/${cardValueStr}.svg`;
        }
    }

    render() {
        const {color, cardType, cardValue, front, style = {}, height} = this.props;
        style.height = height;

        const cardStr = `${color.toString()} - ${cardValue.toString()}`;
        const cardPath = this.getCardPath(color, cardType, cardValue, front);
        const backCardPath = this.getCardPath(color, cardType, cardValue, true);

        const frontElement = (<img src={cardPath} alt={cardStr} style={style} />);
        const backElement = (<img src={backCardPath} alt={cardStr} style={style} />);

        return (
            <Card height="200px" style={style} front={frontElement} back={backElement} />
        );
    };
};