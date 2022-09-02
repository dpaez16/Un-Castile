import React, {Component} from 'react';
import { UnoCardType } from '../../Classes/UnoCard';
import { Card } from '../Card/Card';
import { getStyleDict } from '../../Utils';

export class UnoCardComponent extends Component {
    getCardPath(color, cardType, cardValue, faceUp) {
        if (!faceUp) {
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/Back.svg`;
        } else {
            const cardValueStr = cardType.numVal === UnoCardType.Number.numVal ? cardValue.numVal : cardValue.toJSON();
            return `${process.env.PUBLIC_URL}/assets/images/UnoCard/${color.toJSON()}/${cardType.toJSON()}/${cardValueStr}.svg`;
        }
    }

    render() {
        const { card, height, onClick, style={} } = this.props;
        const { color, type, value, faceUp } = card.toJSON();
        
        const cardStr = JSON.stringify(card);
        const cardPath = this.getCardPath(color, type, value, faceUp);
        const backCardPath = this.getCardPath(color, type, value, faceUp);

        const ratio = 242 / 362; // imageWidth / imageHeight
        const width = Math.round(ratio * height);

        const frontElement = (<div className="svg-img" id={cardStr} style={getStyleDict(style, height, width, cardPath)}></div>);
        const backElement = (<div className="svg-img" id={cardStr} style={getStyleDict(style, height, width, backCardPath)}></div>);

        return (
            <Card 
                style={style}
                front={frontElement}
                back={backElement}
                cardID={cardStr}
                height={height}
                width={width}
                onClick={onClick}
            />
        );
    };
};