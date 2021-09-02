import React, { useReducer, useEffect, useRef } from 'react';
import { ScrollView, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CardArticle, RecipeCard, BtText, BtButton, BtLoader } from '../../components';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';

const headerBgImage = require('../../../assets/images/dictionary_bg.png');

const initialState = {
    sortType: 'recent',
    freeTexts: [],
    recipes: [],
    pageRecipes: 1,
    pageFreeTexts: 1,
    hasNextPageFreeTexts: false,
    hasNextPageRecipes: false,
    isLoadingNext: false,
    isLoading: true,
    showRecipes: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const AuthorDetailsPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const { params } = route;
    const scrollRef = useRef();
    const author = params.author;
    useEffect(() => {
        setState({ author: params.author });
        const getDataAsync = async () => {
            await getAuthorDetails();
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        };
        getDataAsync();
    }, [author.slug]);

    const getAuthorDetails = async () => {
        setState({ hasNextPageFreeTexts: false, hasNextPageRecipes: false });
        await getAuthorFreeTexts();
        await getAuthorRecipes();
        setState({ isLoading: false, isLoadingNext: false });
    };

    const getAuthorFreeTexts = async (sortType = 'recent', page = 1) => {
        try {
            const response = await ContentAPI.getAuthorFreeTexts(author.slug, sortType, page);

            const data = response.data;
            if (data.success) {
                const hasNextPageFreeTexts = data.freetexts.current_page < data.freetexts.last_page;
                setState({ freeTexts: data.freetexts.data, hasNextPageFreeTexts });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false, isLoadingNext: false });
    };
    const getAuthorRecipes = async (sortType = 'recent', page = 1) => {
        try {
            const response = await ContentAPI.getAuthorRecipes(author.slug, sortType, page);

            const data = response.data;
            if (data.success) {
                const hasNextPageRecipes = data.recipes.current_page < data.recipes.last_page;
                setState({ recipes: data.recipes.data, hasNextPageRecipes });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false, isLoadingNext: false });
    };

    const getRecipesNextPage = async () => {
        const page = state.pageRecipes++;
        setState({ page, isLoadingNext: true });
        await getAuthorRecipes(state.sortType, page);
    };
    const getFreeTextsNextPage = async () => {
        const page = state.pageFreeTexts++;
        setState({ page, isLoadingNext: true });
        await getAuthorFreeTexts(state.sortType, page);
    };

    const Btn = TouchableOpacity;

    return (
        <ScrollView style={styles.scrollView} ref={scrollRef}>
            <View style={styles.authorWrapper}>
                <Image source={{ uri: author.image_full }} style={styles.avatar} resizeMode="contain" />
                <View style={styles.authorDetails}>
                    <BtText style={styles.authorDetailsEl} type="authorTitle" color="green">
                        {author.name}
                    </BtText>
                    <BtText style={styles.authorDetailsEl} type="inputLabel">
                        {author.occupation}
                    </BtText>
                    <BtText style={styles.authorDetailsEl} type="inputLabel" color="orange">
                        {author.email}
                    </BtText>
                </View>
            </View>
            <View style={styles.tabWrapper}>
                <Btn style={[styles.tabBtn, !state.showRecipes && styles.tabBtnSelected]} onPress={() => setState({ showRecipes: false })}>
                    <BtText type="title5" color="lightBlue">
                        Yazılar
                    </BtText>
                </Btn>
                <Btn style={[styles.tabBtn, state.showRecipes && styles.tabBtnSelected]} onPress={() => setState({ showRecipes: true })}>
                    <BtText type="title5" color="lightBlue">
                        Tarifler
                    </BtText>
                </Btn>
            </View>
            <View style={styles.authorContent}>
                {state.showRecipes ? (
                    <FlatList
                        numColumns={2}
                        data={state.recipes}
                        renderItem={({ item, index }) => <RecipeCard navigation={navigation} recipe={item} style={styles.cardRecipe} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <FlatList
                        numColumns={2}
                        data={state.freeTexts}
                        renderItem={({ item, index }) => <CardArticle navigation={navigation} data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
            {state.showRecipes ? (
                <View style={styles.showMore}>
                    {state.hasNextPageRecipes && <BtButton onPress={() => getRecipesNextPage()} label="DAHA FAZLA YÜKLE" />}
                    {state.isLoadingNext && <BtLoader width={50} height={50} />}
                </View>
            ) : (
                <View style={styles.showMore}>
                    {state.hasNextPageFreeTexts && <BtButton onPress={() => getFreeTextsNextPage()} label="DAHA FAZLA YÜKLE" />}
                    {state.isLoadingNext && <BtLoader width={50} height={50} />}
                </View>
            )}
        </ScrollView>
    );
};

export default AuthorDetailsPage;
const styles = StyleSheet.create({
    authorDetailsEl: {
        marginVertical: 2,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingVertical: 10,
    },
    showMore: {
        marginHorizontal: 20,
    },
    authorContent: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    tabWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        marginHorizontal: 20,
    },
    tabBtn: {
        borderBottomWidth: 0,
        marginBottom: -1,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    tabBtnSelected: {
        borderBottomWidth: 2,
        borderBottomColor: '#73b3b3',
    },
    cardRecipe: {
        marginVertical: 10,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(229, 229, 229,0.4)',
        paddingBottom: 10,
    },
    bgHeroImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,1)',
    },
    bgImage: {
        height: 65,
        width: 65,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    btnStyle: {
        width: '20%',
    },
    cardMain: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insideCardText: {
        marginLeft: 10,
        flex: 1,
    },
    authorWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    authorDetails: {
        padding: 10,
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
        marginRight: 5,
    },
});
