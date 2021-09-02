import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import ArrowSvg from '../../assets/icons/arrow-right.svg';

const CardRecommendation = (props) => {
    const { onPress, style, data = [], isAuthenticated, navigation } = props;

    const Btn = TouchableOpacity;

    const goDetails = (slug) => {
        navigation.navigate('RecipeDetailsPage', {
            slug,
        });
    };
    return (
        <View style={styles.cardMain}>
            <View style={styles.cardHeader}>
                <DotsSvg width={24} height={24} style={styles.cardHeaderIcon} />
                <BtText type="title5Gilroy" color="yellow" style={styles.cardTitle}>
                    {isAuthenticated ? 'SANA ÖZEL TARİFLER' : 'GÜNÜN TAVSİYELERİ'}
                </BtText>
            </View>
            <View style={styles.cardBody}>
                {data.map((item, idx) => {
                    const authorName = item.recipe.author.name;
                    const recipeName = item.recipe.title;
                    const recipeImageUri = item.recipe.mobile_image_url;
                    const isSponsored = item.recipe.author.is_sponsor;
                    const sponsorBannerUri = item.recipe.sponsorship_banner_1;
                    const alternativeSponsorBannerUri = item.recipe.sponsorship_banner_2;
                    const slug = item.recipe.slug;

                    return (
                        <Btn key={idx} onPress={() => goDetails(slug)}>
                            <View style={styles.cardItem}>
                                <View>
                                    <Image style={styles.cartItemImage} source={{ uri: recipeImageUri }}></Image>
                                    {isSponsored ? (
                                        <View style={styles.sponsorImageWrapper}>
                                            <Image
                                                source={{ uri: sponsorBannerUri ? sponsorBannerUri : alternativeSponsorBannerUri }}
                                                style={styles.sponsorImage}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    ) : null}
                                </View>
                                <View style={styles.authorWrapper}>
                                    <BtText style={styles.authorName}>{isSponsored ? `${authorName} katkılarıyla` : null}</BtText>
                                    <BtText type="title5" style={styles.cardItemDescription}>
                                        {recipeName}
                                    </BtText>
                                </View>
                            </View>
                        </Btn>
                    );
                })}

                {data.length ? (
                    <Btn
                        onPress={() =>
                            navigation.navigate('RecipesListPage', {
                                recommendedContentType: isAuthenticated ? 'getPersonalizedRecipes' : 'getDailyRecommendation',
                            })
                        }
                    >
                        <View style={styles.cardItem}>
                            <BtText type="showAllText" color="green" style={styles.showAll}>
                                TÜMÜNÜ GÖSTER <ArrowSvg width={8} height={8} style={styles.arrowRightIcon} />
                            </BtText>
                        </View>
                    </Btn>
                ) : null}
            </View>
        </View>
    );
};

export default CardRecommendation;

const styles = StyleSheet.create({
    sponsorImageWrapper: {
        position: 'absolute',
        zIndex: 999,
        right: -12,
        bottom: -8,
        backgroundColor: Theme.palette.green,
        borderRadius: 50,
        padding: 3,
    },
    authorName: {
        color: Theme.palette.orange,
        ...Theme.typography.label12SB,
    },
    authorWrapper: { marginLeft: 25 },
    sponsorImage: { width: 30, height: 30, borderRadius: 50 },
    cardMain: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Theme.palette.green,
        minHeight: 400,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        padding: 5,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingVertical: 12,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    cartItemImage: {
        borderRadius: 8,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardItemDescription: {
        color: '#fff',
        ...Theme.typography.title5,
    },
    showAll: {
        ...Theme.typography.showAllText,
        color: 'white',
    },
});
