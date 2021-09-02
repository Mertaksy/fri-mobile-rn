import React from 'react';
import RecipeCard from './RecipeCard';
import VideoCard from './VideoCard';
import CardArticle from './CardArticle';
import ListCard from './ListCard';

const CardTypeRenderer = (props) => {
    const { item, navigation, cardStyle, typeField } = props;
    if (!typeField) {
        console.warn('CardTypeRenderer: typeField required!');
        return null;
    }
    if (item[typeField] === 'recipe') {
        return <RecipeCard navigation={navigation} recipe={item} style={cardStyle} />;
    }
    if (item[typeField] === 'freetext') {
        const frontendCardType = item['frontendCardType'];
        if (frontendCardType === 'videolu-icerik') {
            return <VideoCard navigation={navigation} item={item} />;
        }

        if (frontendCardType === 'kose-yazisi') {
            return <CardArticle navigation={navigation} data={item} />;
        }

        return <ListCard navigation={navigation} item={item} />;
    }
    return null;
};

export default CardTypeRenderer;
