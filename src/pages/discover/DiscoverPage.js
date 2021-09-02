// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import React, { useReducer, useState, useContext, useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    Text,
    SafeAreaView,
    FlatList,
    Alert,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TextInput,
    RefreshControl,
} from 'react-native';
import {
    DiscoverCarouselCard,
    PopularList,
    SliderDiscoverTips,
    PopularWeekList,
    OthersCard,
    SliderTips,
    CardCategory,
    CardRecommendation,
    RecipeCard,
    BtLinkButton,
    BtLoader,
    TopColorLine,
} from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import HTML from 'react-native-render-html';
import SortSvg from '../../../assets/icons/sort.svg';
import SliderVideos from '../../components/SliderVideos';
import SliderArticles from '../../components/SliderArticles';
import BtText from '../../components/BtText';
import SearchInput from '../../components/SearchInput';

const headerBgImage = require('../../../assets/images/dictionary_bg.png');

const initialState = {
    isLoading: true,
    category: 'saglikli-ve-dengeli',
    categoryWeek: 'vegan-vejetaryen',
    categoryOthers: 'cocuklar-icin',
    sortType: 'recent',
    sliderPosts: [],
    popularPosts: [],
    popularWeekPosts: [],
    othersPosts: [],
    tipsBlock: {
        title: 'Mutfaktan İpuçları',
    },
    videosBlock: {
        title: 'Video İçerikler',
    },
    articlesBlock: {
        title: 'Köşe Yazıları',
    },
    sliderActiveSlide: 0,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const DiscoverPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const carouselRef = useRef();
    useEffect(() => {
        const getData = async () => {
            await onRefresh();
            setState({ isLoading: false });
        };
        getData();
    }, []);

    const onRefresh = async () => {
        setState({ isLoading: true });
        await getAllRecipesByCategory();
        await getAllRecipesByCategoryWeekly();
        getAllRecipesByCategoryOthers();
        setState({ isLoading: false });
    };

    const getAllRecipesByCategory = async () => {
        try {
            const response = await ContentAPI.getAllRecipesByCategory(state.sortType, state.category);

            const data = response.data;
            if (data.success) {
                setState({
                    sliderPosts: data.recipes.data.slice(0, 5),
                    popularPosts: data.recipes.data.slice(5, 10),
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getAllRecipesByCategoryWeekly = async () => {
        try {
            const response = await ContentAPI.getAllRecipesByCategory(state.sortType, state.categoryWeek);

            const data = response.data;
            if (data.success) {
                setState({
                    popularWeekPosts: data.recipes.data.slice(0, 4),
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };
    const getAllRecipesByCategoryOthers = async () => {
        try {
            const response = await ContentAPI.getAllRecipesByCategory(state.sortType, state.categoryOthers);

            const data = response.data;
            if (data.success) {
                setState({
                    othersPosts: data.recipes.data,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView
                    style={{ flex: 1, paddingHorizontal: 10 }}
                    refreshControl={<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />}
                >
                    <SearchInput navigation={navigation} />

                    <View style={{ marginVertical: 10 }}>
                        <Carousel
                            ref={carouselRef}
                            data={state.sliderPosts}
                            renderItem={({ item, index }) => <DiscoverCarouselCard navigation={navigation} data={item} />}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            sliderWidth={Dimensions.get('window').width - 40}
                            itemWidth={Dimensions.get('window').width - 40}
                            activeSlideAlignment="start"
                            loop={false}
                            onSnapToItem={(index) => setState({ sliderActiveSlide: index })}
                        />
                        <Pagination
                            dotsLength={state.sliderPosts.length}
                            activeDotIndex={state.sliderActiveSlide}
                            containerStyle={styles.paginationContainer}
                            dotContainerStyle={styles.dotContainerStyle}
                            dotColor={'#064545'}
                            dotStyle={styles.paginationDot}
                            inactiveDotStyle={styles.paginationDotInactive}
                            inactiveDotColor="#FFF"
                            inactiveDotOpacity={1}
                            inactiveDotScale={1}
                            carouselRef={carouselRef}
                            tappableDots={!!carouselRef}
                        />
                    </View>
                    <View style={{ marginVertical: 20, marginTop: 0 }}>
                        <PopularList data={state.popularPosts} navigation={navigation} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <SliderTips navigation={navigation} block={state.tipsBlock} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <SliderVideos block={state.videosBlock} />
                    </View>
                    <View style={{ marginVertical: 0 }}>
                        <PopularWeekList data={state.popularWeekPosts} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <SliderArticles block={state.articlesBlock} navigation={navigation} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.blockHeader}>
                            <BtText type="title3" color="green">
                                Diğer İçerikler
                            </BtText>
                            <BtLinkButton
                                icon="arrow-right-green"
                                iconPosition="right"
                                variant="green"
                                type="linkButtonSmall"
                                label="TÜMÜNÜ LİSTELE"
                                style={{ marginBottom: 20, opacity: 0.7 }}
                                onPress={() => navigation.navigate('RecipesListPage')}
                            />
                        </View>
                        <FlatList
                            //horizontal={true}
                            numColumns={2}
                            data={state.othersPosts}
                            renderItem={({ item, index }) => <OthersCard navigation={navigation} recipe={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default DiscoverPage;

const styles = StyleSheet.create({
    // categoryWrapper: {
    //     flex:1,
    //     flexDirection:"row",
    //     flexWrap:"wrap"
    // },
    blockHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paginationContainer: {
        backgroundColor: 'transparent',
        marginTop: -20,
    },
    dotContainerStyle: {},
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    paginationDotInactive: {
        width: 7,
        height: 7,
        borderWidth: 1,
        borderColor: '#064545',
        borderRadius: 4,
    },
});
