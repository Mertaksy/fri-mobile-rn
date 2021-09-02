import React, { useReducer, useEffect, useState } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { RecipeFilter, BtButton, RecipeCard, BtText, BtLoader, ImageComponent } from '../../components';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import theme from '../../theme';

const headerBgImage = require('../../../assets/images/spices.jpg');
let _filters = {
    category: [],
    diet: 'hepsi',
    difficulty: [],
    time: [],
};
const initialState = {
    recipes: [],
    categories: [],
    difficulties: [],
    isLoading: true,
    isLoadingNext: false,
    activeSections: [],
    filters: _filters,
    keywords: '',
    page: 1,
    sort: 'recent',
    currentUrl: '',
    hasNextPage: false,
    showFilterInput: false,
    sponsorCards: [],
    currentCategory: {},
    headerImageUri: '',
    sponsorBannerUri: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const RecipesListPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    const { params = {} } = route;
    const { category = {}, searchQuery = '', recommendedContentType = '' } = params;
    let _keywords = state.keywords;
    let _filters = state.filters;
    let _sort = state.sort;

    useEffect(() => {
        _keywords = searchQuery;
        setState({ keywords: searchQuery });
        if (category.slug) {
            _filters.category = [category.slug];
            setState({ keywords: searchQuery, filters: _filters });
        }

        const getSponsorCards = async () => {
            try {
                const response = await ContentAPI.getSponsorCardsByType(category.slug);
                if (response.data.success) {
                    const sponsorCards = response.data.sponsorcards;
                    // a key needed to differentiate normal card from sponsor card
                    const modifiedSponsorCards = sponsorCards.map((cardObj) => {
                        return { isSponsorCard: true, ...cardObj };
                    });

                    setState({ ...state, sponsorCards: modifiedSponsorCards });
                }
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
        };

        getSponsorCards();

        const getRecommendedContent = async () => {
            try {
                let fn;
                if (recommendedContentType === 'getDailyRecommendation') {
                    fn = ContentAPI.getDailyRecipes;
                } else {
                    fn = ContentAPI.getPersonalizedRecipes;
                }
                const response = await fn();
                if (!response.data.success) {
                    return;
                }
                if (recommendedContentType === 'getDailyRecommendation') {
                    // todays_recipes is for unregistered user , data.recipes.data is for registered
                    const unformattedRecipeList = response.data.todays_recipes;
                    const formattedRecipeList = unformattedRecipeList.map((recipeObject) => recipeObject.recipe);
                    setState({ ...state, recipes: formattedRecipeList });
                } else {
                    setState({ ...state, recipes: response.data.recipes.data });
                }
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
        };

        const getUserDataFromServer = async () => {
            if (recommendedContentType) {
                await getRecommendedContent();
            } else if (searchQuery !== '') {
                getWithUrl([]);
            } else {
                await getAllRecipesByCategory('recent', category.slug);
            }
            await getAllCategoriesByType('tarif', 0);
            await getDifficulties();
            setState({ isLoading: false });
        };

        getUserDataFromServer();

        return () => {
            console.log('unmounted');
            setState(initialState);
        };
    }, []);

    useEffect(() => {
        if (state.categories.length) {
            getSponsorContent();
        }
    }, [state.categories]);

    const getSponsorContent = () => {
        const currentCategory = state.categories.find((categoryObj) => {
            return categoryObj.slug === category.slug;
        });
        // category object being used above doesn't have all details we need. This one has
        setState({ ...state, currentCategory });
    };

    const setSponsorContent = () => {
        if (!state.currentCategory) {
            return;
        }
        setState({
            ...state,
            headerImageUri: state.currentCategory.mobile_image_url,
            sponsorBannerUri: state.currentCategory.banner_image_url,
        });
    };

    useEffect(() => {
        setSponsorContent();
    }, [state.currentCategory]);

    const getAllRecipesByCategory = async (sortType = 'recent', categories = []) => {
        try {
            const response = await ContentAPI.getAllRecipesByCategory(sortType, categories);
            const data = response.data;
            if (data.success) {
                const hasNextPage = data.recipes.current_page < data.recipes.last_page;
                setState({ recipes: data.recipes.data, hasNextPage });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getAllCategoriesByType = async (type, hideSponsored = 0) => {
        try {
            const response = await ContentAPI.getAllCategoriesByType(type, hideSponsored);
            const data = response.data;
            if (data.success) {
                setState({ categories: data.categories });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getDifficulties = async () => {
        try {
            const response = await ContentAPI.getDifficulties();
            const data = response.data;
            if (data.success) {
                setState({ difficulties: data.difficulties });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getWithUrl = async (_recipes) => {
        let url = '';
        let queryString = setQuery(_filters);
        let isSearch = _keywords && _keywords.length > 1;
        if (isSearch) {
            queryString = `${queryString}&keywords=${_keywords.split(' ').join('%20')}`;
            url = `/search${queryString}&content_type=recipes`;
        } else {
            url = `/recipes${queryString}`;
        }

        try {
            setState({ isLoading: true, hasNextPage: false });
            const response = await ContentAPI.getWithUrl(url);
            const data = response.data;
            if (data.success) {
                let hasNextPage = false;
                if (!isSearch) {
                    hasNextPage = data.recipes.current_page < data.recipes.last_page;
                    setState({ recipes: [..._recipes, ...data.recipes.data], hasNextPage });
                } else {
                    hasNextPage = data.additional_data.to < data.additional_data.hits;
                    const recipesResult = data.results.map((result) => result.data);
                    setState({ recipes: [..._recipes, ...recipesResult], hasNextPage });
                }
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false, isLoadingNext: false });
    };

    const applyFilters = (filters) => {
        setState({ filters });
        _filters = filters;
        getWithUrl([]);
    };

    const handleSubmitSearch = () => {
        getWithUrl([]);
    };

    const handleTextChange = (keywords) => {
        setState({ keywords });
    };

    const handleSortChange = (sort) => {
        setState({ sort });
        _sort = sort;
        getWithUrl([]);
    };

    const getNextPage = () => {
        const page = state.page++;
        setState({ page, isLoadingNext: true });
        getWithUrl(state.recipes);
    };

    const setQuery = (filters) => {
        let queryString = `?sort=${_sort}&page=${state.page}`;
        if (filters.category.length) {
            queryString = `${queryString}&categories=${filters.category.join(',')}`;
        }
        if (filters.time.length) {
            queryString = `${queryString}&cooking_times=${filters.time.join(',')}`;
        }
        if (recommendedContentType === 'getPersonalizedRecipes') {
            queryString = `${queryString}&personalize=1`;
        }
        let tags = [];

        const dietFilter = filters.diet;

        if (dietFilter && dietFilter !== 'hepsi') {
            tags.push(dietFilter);
        }
        if (tags.length) {
            queryString = `${queryString}&tags=${tags.join(',')}`;
        }
        if (filters.difficulty && filters.difficulty.length) {
            queryString = `${queryString}&difficulties=${filters.difficulty.join(',')}`;
        }

        return queryString;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            <ScrollView style={{ flex: 1 }}>
                {recommendedContentType ? (
                    <View style={styles.recommendedContentTitle}>
                        <BtText style={{ lineHeight: 40 }} type="title2" color="lightBlue">
                            {recommendedContentType === 'getDailyRecommendation' ? 'Günün Tavsiyeleri' : 'Sana Özel Tarifler'}
                        </BtText>
                    </View>
                ) : (
                    <>
                        <ImageBackground
                            imageStyle={{ borderRadius: 0 }}
                            source={state.headerImageUri ? { uri: state.headerImageUri } : headerBgImage}
                            style={styles.bgHeroImage}
                            resizeMode="cover"
                        >
                            <View style={styles.heroInner}>
                                <BtText type="title2" color="white">
                                    {category.name || 'Bizim Tarifler'}
                                </BtText>
                            </View>
                        </ImageBackground>

                        <RecipeFilter
                            value={_keywords}
                            preSelectedCategory={category.slug}
                            categories={state.categories}
                            difficulties={state.difficulties}
                            applyFilters={applyFilters}
                            handleSubmitSearch={() => handleSubmitSearch()}
                            handleTextChange={handleTextChange}
                            handleSortChange={handleSortChange}
                        />
                    </>
                )}
                {state.sponsorBannerUri ? (
                    <View style={styles.sponsorBannerWrapper}>
                        <Image source={{ uri: state.sponsorBannerUri }} style={styles.sponsorBanner} resizeMode="contain" />
                    </View>
                ) : null}
                {state.isLoading && !state.isLoadingNext ? (
                    <BtLoader style={{ marginTop: 50 }} />
                ) : (
                    <>
                        {state.recipes.length ? (
                            <View style={styles.categoryWrapper}>
                                <FlatList
                                    numColumns={2}
                                    data={[...state.sponsorCards, ...state.recipes]}
                                    renderItem={({ item, index }) => {
                                        return <RecipeCard navigation={navigation} recipe={item} style={styles.card} />;
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                {state.hasNextPage && <BtButton onPress={() => getNextPage()} label="DAHA FAZLA TARİF GÖR" />}
                                {state.isLoadingNext && <BtLoader width={50} height={50} />}
                            </View>
                        ) : (
                            <View style={styles.notFoundWrapper}>
                                <BtText type="title2" color="lightBlue" style={{ textAlign: 'center', margin: 30 }}>
                                    Seçtiğin kriterlere uygun sonuç bulunamadı :(
                                </BtText>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecipesListPage;
const styles = StyleSheet.create({
    recommendedContentTitle: {
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.borderColor,
        marginHorizontal: 15,
        paddingBottom: 10,
    },
    sponsorBannerWrapper: {
        padding: 15,
    },
    sponsorBanner: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    categoryWrapper: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    card: {
        marginVertical: 10,
    },
    btnStyle: {
        width: '20%',
    },
    bgHeroImage: {
        height: 200,
    },
    heroInner: {
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
});
