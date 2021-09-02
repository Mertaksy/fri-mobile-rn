import React, { useReducer, useRef, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Context as AppContext } from '../../context/AppContext';
import { CardCategory, CardSlider, SliderTips, BtLoader, CardRecommendation } from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as UserAPI from '../../api/user';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import api from '../../api/api';
import SliderRecipes from '../../components/SliderRecipes';
import SliderVideos from '../../components/SliderVideos';
import SliderArticles from '../../components/SliderArticles';
import SearchInput from '../../components/SearchInput';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useScrollToTop } from '@react-navigation/native';
import { sortCategories } from '../../utils/utils';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const initialState = {
    dailyRecipes: [],
    writers: [],
    categories: [],
    todaysRecommendation: [],
    blocks: [],
    isLoading: true,
    sliderActiveSlide: 0,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const HomePage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const notificationListener = useRef();
    const responseListener = useRef();
    // Global context state
    const AppState = useContext(AppContext).state;
    const carouselRef = useRef();
    const {
        setUserToken,
        unsetUserToken,
        setUserData,
        unsetUserData,
        setUserCart,
        setPopularSearches,
        syncFavoriteLists,
        syncDynamicTags,
        setShouldRefreshMainPage,
    } = useContext(AppContext);
    const scrollViewRef = useRef(null);
    useScrollToTop(scrollViewRef);

    useEffect(() => {
        let shouldGetData = true;
        const getDataFromServer = async () => {
            await getUser();
        };
        if (shouldGetData) {
            getDataFromServer();
            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
                console.log({ notification });
            });

            // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });
        }

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
            shouldGetData = false;
        };
    }, []);

    const onRefresh = async () => {
        setState({ isLoading: true });
        await getCart();
        await getCategoriesList();
        await getSliderList();
        await getDailyRecipes();
        getHomepageBlocks();
        getPopularSearches();
        syncFavoriteLists();
        syncDynamicTags();
        setState({ isLoading: false });
    };

    const getUser = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
                setUserToken(userToken);
                const response = await UserAPI.getUser();
                const data = response.data;
                if (data.success) {
                    setUserData(data.user);
                }
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
                unsetUserToken();
                unsetUserData();
            }
        }
    };

    useEffect(() => {
        onRefresh();
    }, [AppState.userData]);

    useEffect(() => {
        if (AppState.shouldRefreshMainPage) {
            onRefresh();
            setShouldRefreshMainPage(false);
        }
    }, [AppState.shouldRefreshMainPage]);

    const getCart = async () => {
        try {
            const response = await UserAPI.getCart();
            const data = response.data;
            if (data.success) {
                setUserCart(data.cart);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getPopularSearches = async () => {
        try {
            const response = await ContentAPI.getPopularSearches();
            const data = response.data;
            if (data.success) {
                setPopularSearches(data.popular);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getHomepageBlocks = async () => {
        try {
            const response = await ContentAPI.getHomepageBlocks();
            const data = response.data;
            if (data.success) {
                setState({ blocks: data.blocks });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getCategoriesList = async () => {
        try {
            const allCategories = 1;
            const response = await ContentAPI.getAllCategoriesByType('tarif');
            const data = response.data;
            if (data.success) {
                setState({ categories: data.categories });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getSliderList = async () => {
        try {
            const response = await ContentAPI.getSliderList();
            const data = response.data;
            if (data.success) {
                setState({ sliders: data.sliders });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getDailyRecipes = async () => {
        try {
            if (AppState.userData) {
                const response = await ContentAPI.getPersonalizedRecipes();
                const data = response.data;
                if (data.success) {
                    const todayRecipes = data.recipes.data.slice(0, 4).map((o) => ({ title: '', date: '', recipe: o }));
                    setState({ dailyRecipes: todayRecipes });
                }
            } else {
                const response = await ContentAPI.getDailyRecipes();
                const data = response.data;
                if (data.success) {
                    setState({ dailyRecipes: data.todays_recipes.slice(0, 4) });
                }
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getBlockComponent = (block) => {
        switch (block.block_type) {
            case 'mutfaktan-ipuclari':
                return <SliderTips navigation={navigation} block={block} />;
            case 'video-icerik':
                return <SliderVideos navigation={navigation} block={block} />;
            case 'kose-yazilari':
                return <SliderArticles navigation={navigation} block={block} />;
            case 'bir-cirpida':
                return <SliderRecipes navigation={navigation} block={block} categories={'bi-cirpida'} />;
            case 'en-yeni-tarifler':
                return <SliderRecipes navigation={navigation} block={block} />;
            case 'category':
                return <SliderRecipes navigation={navigation} block={block} categories={block.category_data.slug} />;
            case 'banner':
                break;
            default:
                break;
        }
    };

    const selectCategory = (category) => {
        navigation.navigate('RecipesListPage', { category: category });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <>
                    <ScrollView
                        style={{ flex: 1 }}
                        refreshControl={<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />}
                        ref={scrollViewRef}
                    >
                        <SearchInput navigation={navigation} />
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingHorizontal: 10,
                            }}
                        >
                            <View style={{ marginBottom: 10 }}>
                                <Carousel
                                    data={state.categories}
                                    renderItem={({ item, index }) => <CardCategory onPress={() => selectCategory(item)} data={item} />}
                                    inactiveSlideOpacity={1}
                                    inactiveSlideScale={1}
                                    sliderWidth={Dimensions.get('window').width - 20}
                                    itemWidth={Dimensions.get('window').width / 2 - 30}
                                    activeSlideAlignment="start"
                                    loop={false}
                                />
                            </View>
                            <View style={{ marginVertical: 10, alignItems: 'center' }}>
                                <Carousel
                                    ref={carouselRef}
                                    data={state.sliders}
                                    renderItem={({ item, index }) => <CardSlider navigation={navigation} data={item} />}
                                    inactiveSlideOpacity={1}
                                    inactiveSlideScale={1}
                                    sliderWidth={Dimensions.get('window').width - 20}
                                    itemWidth={Dimensions.get('window').width - 20}
                                    activeSlideAlignment="start"
                                    loop={false}
                                    onSnapToItem={(index) => setState({ sliderActiveSlide: index })}
                                />
                                <Pagination
                                    dotsLength={state.sliders.length}
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
                            <View style={{ marginVertical: 10 }}>
                                <CardRecommendation
                                    data={state.dailyRecipes || []}
                                    isAuthenticated={AppState.userData}
                                    navigation={navigation}
                                />
                            </View>

                            {state.blocks.map((block) => {
                                return (
                                    <View key={block.title} style={{ marginVertical: 20, marginHorizontal: 5 }}>
                                        {getBlockComponent(block)}
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
};

export default HomePage;

const styles = StyleSheet.create({
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
