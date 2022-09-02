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
        const {color, cardType, cardValue, faceUp, style = {}, height} = this.props;
        
        const cardStr = `${color.toJSON()} - ${cardValue.toJSON()}`;
        const cardPath = this.getCardPath(color, cardType, cardValue, faceUp);
        const backCardPath = this.getCardPath(color, cardType, cardValue, faceUp);

        const ratio = 242 / 362; // imageWidth / imageHeight
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