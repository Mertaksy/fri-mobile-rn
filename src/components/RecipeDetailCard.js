import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import BtText from './BtText';
import LevelSvg from '../../assets/icons/difficulty.svg';
import TimeSvg from '../../assets/icons/time3.svg';
import ClockSvg from '../../assets/icons/portion.svg';
import GloveSvg from '../../assets/icons/calories.svg';
import lightBlueRecipeOrnament from '../../assets/icons/lightBlueRecipeCardOrnament.png';
import lightGreenRecipeCardOrnament from '../../assets/icons/lightGreenRecipeCardOrnament.png';
import lightRedRecipeOrnament from '../../assets/icons/lightRedRecipeCardOrnament.png';
import lightYellowRecipeOrnament from '../../assets/icons/lightYellowRecipeCardOrnament.png';

const RecipeDetailCard = (props) => {
    const { style, data = [] } = props;
    const colNumDivider = data.kcal ? 2 : 3;

    const cardWidth = { width: Dimensions.get('window').width / colNumDivider - 15 };

    const ornamentStyle = colNumDivider === 2 ? styles.recipeOrnament : styles.recipeOrnamentAlternative;

    return (
        <View style={[styles.cardMain, style]}>
            <View style={styles.topCardWithImage}>
                <View style={[styles.tripleCard, cardWidth]}>
                    <View style={styles.iconContainer}>
                        <TimeSvg width={14} height={14} style={styles.icon} />
                        <Image source={lightBlueRecipeOrnament} style={ornamentStyle} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <BtText type="contentTitle" style={styles.cardTitle}>
                            Süresi
                        </BtText>
                        <BtText type="linkButtonSmall" style={styles.cardContent}>
                            {data.cooking_time} dakika
                        </BtText>
                    </View>
                </View>
                <View style={[styles.tripleCard, cardWidth]}>
                    <View style={styles.iconContainer}>
                        <Image source={lightYellowRecipeOrnament} style={ornamentStyle} />
                        <LevelSvg width={14} height={14} style={styles.icon} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <BtText type="contentTitle" style={styles.cardTitle}>
                            Zorluk
                        </BtText>
                        {data.difficulty && data.difficulty.title && (
                            <BtText type="linkButtonSmall" style={styles.cardContent}>
                                {data.difficulty.title}
                            </BtText>
                        )}
                    </View>
                </View>
                <View style={[styles.tripleCard, cardWidth]}>
                    <View style={styles.iconContainer}>
                        <Image source={lightRedRecipeOrnament} style={ornamentStyle} />
                        <ClockSvg width={14} height={14} style={styles.icon} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <BtText type="contentTitle" style={styles.cardTitle}>
                            Porsiyon
                        </BtText>
                        <BtText type="linkButtonSmall" style={styles.cardContent}>
                            {data.portion} Kişilik
                        </BtText>
                    </View>
                </View>
                {data.kcal ? (
                    <View style={[styles.tripleCard, cardWidth]}>
                        <View style={styles.iconContainer}>
                            <Image source={lightGreenRecipeCardOrnament} style={ornamentStyle} />
                            <GloveSvg width={14} height={14} style={styles.icon} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <BtText type="contentTitle" style={styles.cardTitle}>
                                Besi Değeri
                            </BtText>
                            <BtText type="linkButtonSmall" style={styles.cardContent}>
                                {data.kcal} kcal
                            </BtText>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardTextContainer: {
        marginLeft: '5%',
    },
    icon: {
        alignSelf: 'center',
        zIndex: 1,
        transform: [{ scale: 1.6 }],
    },
    recipeOrnament: {
        position: 'absolute',
        zIndex: 0,
    },
    recipeOrnamentAlternative: {
        position: 'absolute',
        zIndex: 0,
        left: '-20%',
    },
    cardMain: {
        width: '100%',
    },
    iconContainer: {
        width: '30%',
        marginLeft: '5%',
    },
    topCardWithImage: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    tripleCard: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e6e2d7',
        height: 50,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width / 3 - 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        marginBottom: 3,
        color: Theme.palette.lightGreen,
    },
    cardContent: {
        color: Theme.palette.orangeDark,
        fontFamily: 'gilroy-semi-bold',
    },
});

export default RecipeDetailCard;
