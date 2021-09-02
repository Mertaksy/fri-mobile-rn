import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import BtText from './BtText';
import LevelSvg from '../../assets/icons/level.svg';
import TimeSvg from '../../assets/icons/time.svg';
import * as ContentApi from '../api/content';

const RecipeCard = (props) => {
    const { onPress, style, recipe, isRight, hasVideo, navigation } = props;

    const [isSponsoredRecipe, setIsSponsoredRecipe] = useState(false);
    const [isSponsorCard, setIsSponsorCard] = useState(false);

    useEffect(() => {
        if (recipe.isSponsorCard) {
            setIsSponsorCard(recipe.isSponsorCard);
        }
        if (recipe.author) {
            setIsSponsoredRecipe(recipe.author.is_sponsor);
        }
    }, [recipe]);

    const Btn = TouchableOpacity;

    let marginStyle = { marginTop: 0 };

    const onPressed = () => {
        navigation.navigate('RecipeDetailsPage', {
            slug: recipe.slug,
        });
    };

    const handleSponsorButton = async (url) => {
        const urlParts = url.split('/');
        const lastPart = urlParts[urlParts.length - 1];

        if (url.includes('blog')) {
            navigation.navigate('FreeTextDetailsPage', { slug: lastPart });
        } else if (url.includes('kategoriler')) {
            try {
                const response = await ContentApi.getWithUrl(`/categories/${lastPart}`);
                if (response.data.success) {
                    navigation.push('RecipesListPage', { category: response.data.category });
                }
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
        } else if (url.includes('listeler')) {
            navigation.navigate('ListDetailsPage', { slug: lastPart });
        } else if (url.includes('tarifler')) {
            navigation.navigate('RecipeDetailsPage', { slug: lastPart });
        }
    };

    const sponsorButton = recipe.title ? (
        <Btn style={styles.sponsorButton} onPress={() => handleSponsorButton(recipe.url)}>
            <BtText type="gilroy14SemiBold" color="orange">
                {recipe.title}
            </BtText>
        </Btn>
    ) : null;

    return (
        <Btn onPress={() => (isSponsorCard ? handleSponsorButton(recipe.url) : onPressed())} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style, marginStyle]}>
                <Image
                    source={{ uri: recipe.mobile_image_url }}
                    resizeMode="cover"
                    style={isSponsorCard ? styles.sponsorImage : styles.bgImage}
                />
                {isSponsorCard ? (
                    sponsorButton
                ) : (
                    <View style={styles.cardMainText}>
                        <View style={[styles.cardTextWrapper, { width: isSponsoredRecipe ? '70%' : '100%' }]}>
                            <View style={styles.cardTopSideWrapper}>
                                {isSponsoredRecipe ? (
                                    <View style={styles.authorImageWrapper}>
                                        <Image source={{ uri: recipe.author.image_full }} style={styles.authorImage} resizeMode="cover" />
                                    </View>
                                ) : null}
                                <BtText
                                    type="title6"
                                    color="green"
                                    style={[styles.cardTopText, isSponsoredRecipe ? { marginLeft: 10 } : {}]}
                                >
                                    {recipe.title}
                                </BtText>
                            </View>
                        </View>
                        <View style={styles.cardBottomMainText}>
                            <View style={styles.insideCardText}>
                                <TimeSvg width={15} height={15} style={styles.timeIcon} />
                                <BtText type="gilroy10M">{recipe.cooking_time + ' dk.'}</BtText>
                            </View>
                            <View style={styles.insideCardText}>
                                <LevelSvg width={15} height={15} style={styles.levelIcon} />
                                <BtText type="gilroy10M">{recipe.difficulty && (recipe.difficulty.title || recipe.difficulty.name)}</BtText>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Btn>
    );
};

export default RecipeCard;
const styles = StyleSheet.create({
    cardTopSideWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    authorImage: {
        width: 35,
        height: 35,
    },
    authorImageWrapper: {
        width: '20%',
        marginRight: '10%',
    },
    timeIcon: { marginRight: 5 },
    levelIcon: { marginRight: 5 },
    sponsorImage: { height: 240, borderRadius: 8 },
    sponsorButton: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 10,
        left: 10,
        borderRadius: 8,
        padding: 10,
        borderStyle: 'solid',
        borderColor: Theme.palette.borderColor,
        borderWidth: 1,
    },
    btnStyle: {
        borderRadius: 8,
        flex: 0.5,
        marginBottom: 10,
    },
    bgImage: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 170,
        flex: 1,
        borderRadius: 8,
    },
    cardMain: {
        marginHorizontal: 5,
        borderWidth: 1,
        // adding border radius to single corner brakes image
        borderRadius: 8,
        borderColor: Theme.palette.borderColor,
        minHeight: 240,
    },
    cardMainText: {
        // minus position covers rounded corners of image above it
        top: -6,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 70,
    },
    insideImage: {
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'flex-end',
    },
    cardBottomMainText: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    insideCardText: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    cardTopText: {
        marginBottom: 20,
        alignContent: 'center',
    },
    insideCardBottomButtonText: {
        fontSize: 10,
        lineHeight: 14,
    },
    cardTextWrapper: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardTopText: {
        marginBottom: 20,
        alignContent: 'center',
    },
});
