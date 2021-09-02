import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Image,
    Text,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import { BtLinkButton } from './index';
import * as ContentAPI from '../api/content';
import ApiErrors from '../api/errors';
import Carousel from 'react-native-snap-carousel';
import RecipeCard from './RecipeCard';

const SliderRecipes = (props) => {
    const { onPress, style, block = {}, categories, navigation } = props;
    const [recipes, setRecipes] = useState({});
    const CAROUSEL_ITEM_WIDTH = Dimensions.get('window').width / 2 - 15;

    useEffect(() => {
        getBlockDetails();
    }, []);

    const getBlockDetails = async () => {
        try {
            let response = {};
            if (categories) {
                response = await ContentAPI.getAllRecipesByCategory('recent', categories);
            } else {
                response = await ContentAPI.getAllRecipes('recent');
            }
            const data = response.data;
            if (data.success) {
                const recipes = data.recipes.data;
                const sponsorCards = await getSponsorCards();
                let allRecipes = [];
                if (categories && sponsorCards.length) {
                    allRecipes = [...sponsorCards, ...recipes];
                } else {
                    allRecipes = recipes;
                }
                setRecipes(allRecipes);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    // this will try to get sponsor cards from categories that doesn't include sponsor card too. So, there will be error spam
    const getSponsorCards = async () => {
        try {
            // categories represent slug. even if there is slug, there might not be a sponsor card related with slug
            const sponsorResponse = await ContentAPI.getSponsorCardsByType(categories);
            if (sponsorResponse.data.success) {
                const sponsorCards = sponsorResponse.data.sponsorcards;
                // a key needed to differentiate normal card from sponsor card
                const modifiedSponsorCards = sponsorCards.map((cardObj) => {
                    return { isSponsorCard: true, ...cardObj };
                });
                return [...modifiedSponsorCards];
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    return (
        <View style={styles.blockWrapper}>
            <View style={styles.blockHeader}>
                <BtText type="title3" color="green">
                    {block.title}
                </BtText>
                <BtLinkButton
                    icon="arrow-right-green"
                    iconPosition="right"
                    variant="green"
                    type="linkButtonSmall"
                    label="TÜMÜNÜ LİSTELE"
                    style={{ marginBottom: 20, opacity: 0.7 }}
                    onPress={() =>
                        navigation.navigate('RecipesListPage', { category: categories ? { name: block.title, slug: categories } : {} })
                    }
                />
            </View>
            <Carousel
                data={recipes}
                renderItem={({ item, index }) => <RecipeCard navigation={navigation} recipe={item} />}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                sliderWidth={Dimensions.get('window').width - 20}
                itemWidth={CAROUSEL_ITEM_WIDTH}
                activeSlideAlignment="start"
                loop={false}
                contentContainerCustomStyle={[
                    { overflow: 'hidden' },
                    recipes.length ? { width: CAROUSEL_ITEM_WIDTH * recipes.length } : {},
                ]}
            />
        </View>
    );
};

export default SliderRecipes;

const styles = StyleSheet.create({
    blockWrapper: {},
    blockHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnStyle: {
        borderRadius: 10,
    },
    cardMain: {
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        minHeight: 207,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        marginTop: 15,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingVertical: 10,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    cartItemImage: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardItemDescription: {
        color: '#fff',
        width: '85%',
    },
});
