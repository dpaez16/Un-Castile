import React, {Component} from 'react';
import { UnoCardType } from '../../Classes/UnoCard';
import { Card } from '../Card/Card';
import { getStyleDict } from '../../Utils';

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
        
        const cardStr = `${color.toString()} - ${cardValue.toString()}`;
        const cardPath = this.getCardPath(color, cardType, cardValue, front);
        const backCardPath = this.getCardPath(color, cardType, cardValue, true);

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