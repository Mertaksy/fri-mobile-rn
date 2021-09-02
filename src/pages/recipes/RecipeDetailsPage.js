import React, { useReducer, useRef, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';

import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import { ImageComponent, BtText, RecipeDetailCard, CardFoodList, AuthorCard, BtFavoriteButton, BtShareButton } from '../../components';
import HTML from 'react-native-render-html';
import SearchInput from '../../components/SearchInput';
import SliderRecipes from '../../components/SliderRecipes';
import { useScrollToTop } from '@react-navigation/native';

const modalBgImage = require('../../../assets/images/modal-bg.png');
const win = Dimensions.get('window');

const initialState = {
    recipeDetails: {},
    slug: '',
    authorDetails: {},
    sponsorAuthorImageAspectRatio: 1,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const RecipeDetailsPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const scrollRef = useRef();
    const { params } = route;
    const slug = params.slug;
    useEffect(() => {
        getRecipeDetails(slug);

        return () => {
            setState(initialState);
        };
    }, [slug]);

    const getRecipeDetails = async (slug) => {
        try {
            const response = await ContentAPI.getRecipeDetails(slug);
            const data = response.data;
            if (data.success) {
                setState({ recipeDetails: data.recipe, authorDetails: data.recipe.author });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    useEffect(() => {
        if (Object.keys(state.authorDetails).length) {
            const url = state.authorDetails.image_full;
            Image.getSize(url, (width, height) => {
                setState({ ...state, sponsorAuthorImageAspectRatio: width / height });
            });
        }
    }, [state.authorDetails]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            <ScrollView style={{ flex: 1, paddingVertical: 10 }} ref={scrollRef}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        padding: 10,
                    }}
                >
                    {state.authorDetails.is_sponsor ? (
                        <View>
                            <View>
                                <Image
                                    source={{ uri: state.authorDetails.image_full }}
                                    style={{
                                        aspectRatio: state.sponsorAuthorImageAspectRatio,
                                        maxHeight: 100,
                                        maxWidth: '100%',
                                        marginBottom: 10,
                                    }}
                                />
                            </View>
                            <BtText type="bodyBold" color="green">
                                Bu tarif{' '}
                                <BtText type="bodyBold" color="orange">
                                    {state.authorDetails.name}
                                </BtText>{' '}
                                katkılarıyla hazırlanmıştır.
                            </BtText>
                        </View>
                    ) : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <BtText type="title2" style={styles.title}>
                            {state.recipeDetails.title}
                        </BtText>
                        <BtFavoriteButton slug={state.recipeDetails.slug} contentType="tarif" navigation={navigation} />
                        <BtShareButton slug={state.recipeDetails.slug} contentType="tarif" item={state.recipeDetails} />
                    </View>

                    <ImageComponent data={state.recipeDetails} keepAspectRatio />

                    <RecipeDetailCard data={state.recipeDetails} />

                    {state.authorDetails.is_sponsor || state.authorDetails.name === 'Bizim Tarifler' ? null : (
                        <AuthorCard writer={state.recipeDetails.author} navigation={navigation} />
                    )}

                    <View style={{ marginVertical: 10 }}>
                        {state.recipeDetails.ingredientslist && (
                            <CardFoodList
                                shouldShowCartButton={state.recipeDetails.is_cart_active}
                                navigation={navigation}
                                data={state.recipeDetails.ingredientslist}
                                slug={slug}
                            />
                        )}
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        {state.recipeDetails.content ? (
                            <HTML
                                source={{ html: state.recipeDetails.content || '' }}
                                baseFontStyle={{
                                    fontSize: 14,
                                    lineHeight: 22,
                                    fontFamily: 'gilroy-medium',
                                    color: '#56696a',
                                }}
                                tagsStyles={{
                                    strong: {
                                        fontSize: 14,
                                        lineHeight: 22,
                                        fontFamily: 'gilroy-bold',
                                        color: '#064545',
                                    },
                                    p: {
                                        fontSize: 14,
                                        lineHeight: 22,
                                        fontFamily: 'gilroy-semi-bold',
                                        color: '#56696a',
                                        marginBottom: 10,
                                    },
                                    h2: {
                                        fontSize: 16,
                                        lineHeight: 22,
                                        fontFamily: 'recoleta-semi-bold',
                                        color: '#ee6621',
                                        marginTop: 20,
                                        marginBottom: 10,
                                    },
                                    h1: {
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontFamily: 'recoleta-semi-bold',
                                        color: '#ee6621',
                                        marginTop: 20,
                                        marginBottom: 10,
                                    },
                                    ul: {
                                        fontSize: 14,
                                        lineHeight: 22,
                                        fontFamily: 'gilroy-medium',
                                        color: '#064545',
                                    },
                                    img: {
                                        marginHorizontal: 10,
                                    },
                                }}
                            />
                        ) : null}
                    </View>
                    <View style={{ paddingHorizontal: 0, marginTop: 40 }}>
                        <SliderRecipes navigation={navigation} block={{ title: 'En Yeni Tarifler' }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecipeDetailsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        //justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    title: {
        color: Theme.palette.green,
        marginBottom: 20,
        flex: 1,
    },
    html: {
        marginTop: 30,
        height: 500,
        width: Dimensions.get('window').width - 20,
    },
});
