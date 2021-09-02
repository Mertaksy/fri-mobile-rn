import React, { useReducer, useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BtButton, BtText, BtLoader, SortButton } from '../../components';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import SearchInput from '../../components/SearchInput';
import headerBgImage from '../../../assets/images/kose-yazilari-header.jpg';
import HTML from 'react-native-render-html';
import theme from '../../theme';

const initialState = {
    sortType: 'recent',
    page: 1,
    articles: [],
    isLoading: true,
    hasNextPage: false,
    isLoadingNext: false,
    isLoadingNewFilter: false,
    isRefreshingContent: false,
    filteredArticles: [],
    newFilterCriteria: '',
    filterCriteria: 'Tümü',
    authorList: [],
};

const BTN_COLORS = ['#e5a36c', '#86c8d7', '#3ad0aa', '#8c499c', '#ff5f0e'];

const reducer = (state, newState) => ({ ...state, ...newState });

const ArticlesPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        const getData = async () => {
            await getTagDetails();
            setState({ isLoading: false });
        };
        getData();
    }, []);

    // filterCriteria parameter prevents category from changing when sorting happens
    const getTagDetails = async (sortType, page, filterCriteria) => {
        try {
            const response = await ContentAPI.getTagDetails('kose-yazisi', sortType, page);
            const data = response.data;
            if (data.success) {
                const hasNextPage = data.freetexts.current_page < data.freetexts.last_page;
                const authors = [];
                data.freetexts.data.forEach((authorObj) => {
                    const authorName = authorObj.author.name;
                    let isAuthorAlreadyAdded = false;
                    authors.forEach((author) => {
                        if (authorName === author.name) {
                            isAuthorAlreadyAdded = true;
                            return;
                        }
                    });

                    if (!isAuthorAlreadyAdded) {
                        authors.push({ name: authorName, isSelected: false });
                    }
                });
                setState({
                    ...state,
                    articles: data.freetexts.data,
                    hasNextPage,
                    authorList: setAuthorListOrder(authors),
                    isLoadingNewFilter: false,
                    isLoadingNext: false,
                    filteredArticles: filterCriteria ? filterArr(state.filterCriteria, data.freetexts.data) : data.freetexts.data,
                    filterCriteria: filterCriteria ? filterCriteria : 'Tümü',
                    isRefreshingContent: false,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false });
    };

    const filterArr = (filterCriteria, arr) => {
        if (filterCriteria === 'Tümü') {
            return arr;
        } else {
            return arr.filter((article) => article.author.name === filterCriteria);
        }
    };

    // sorting fetches new set of sorted data from server. This causes filter criterias to change place.
    // Function below creates alphabetical order for filter criterias
    const setAuthorListOrder = (authorArr) => {
        const sortedAuthors = authorArr.sort((prevAuthor, curAuthor) => {
            const lowerCasePrevAuthor = prevAuthor.name.toLowerCase();
            const lowerCaseCurAuthor = curAuthor.name.toLowerCase();
            if (lowerCasePrevAuthor < lowerCaseCurAuthor) {
                return -1;
            } else if (lowerCasePrevAuthor > lowerCaseCurAuthor) {
                return 1;
            }
            return 0;
        });

        return [{ name: 'Tümü', isSelected: true }, ...sortedAuthors];
    };

    const Slider = (props) => {
        const { style, data } = props;
        const [summary, setSummary] = useState('<p></p>');

        const onPressed = () => {
            navigation.navigate('FreeTextDetailsPage', {
                slug: data.slug,
            });
        };

        useEffect(() => {
            if (!data) {
                return;
            } else if (data.summary) {
                setSummary(`<p>${data.summary.slice(0, data.title.length > 30 ? 90 : 110)}...</p>`);
            } else {
                const sum = data.content.slice(0, data.title.length > 30 ? 90 : 110);
                setSummary(`${sum}...`);
            }
        }, [data]);

        return (
            <TouchableOpacity onPress={onPressed} style={[styles.btnStyle, { zIndex: 5 }]}>
                <View style={[styles.cardMain, style]}>
                    <View style={styles.cardHeader}>
                        <HTML
                            customWrapper={(content) => <View style={styles.cardTitleWrapper}>{content}</View>}
                            source={{ html: data.title }}
                            baseFontStyle={styles.cardTitle}
                        />
                        <HTML
                            customWrapper={(content) => <View style={styles.blogCardTextWrapper}>{content}</View>}
                            source={{ html: summary }}
                            baseFontStyle={styles.blogCardText}
                        />
                    </View>
                    <View style={styles.cardFooter}>
                        <View style={styles.avatar}>
                            <Image style={styles.avatarImage} source={{ uri: data.author.image_full }} />
                        </View>
                        <HTML source={{ html: data.author.name }} baseFontStyle={styles.authorName} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const getNextPage = async () => {
        const page = state.page++;
        setState({ page, isLoadingNext: true });
        await getTagDetails(state.sortType, page);
    };

    const handleSort = async (sortType) => {
        setState({ sortType });
        await getTagDetails(sortType, state.page, state.filterCriteria);
    };

    const filterContent = () => {
        if (!state.isLoadingNewFilter && state.newFilterCriteria === state.filterCriteria) {
            return;
        } else if (state.newFilterCriteria === 'Tümü' && state.filterCriteria !== 'Tümü') {
            setState({
                ...state,
                filteredArticles: [...state.articles],
                filterCriteria: 'Tümü',
                isLoadingNewFilter: false,
            });
        } else {
            const filteredResult = state.articles.filter((article) => article.author.name === state.newFilterCriteria);
            setState({
                ...state,
                filterCriteria: state.newFilterCriteria,
                filteredArticles: [...filteredResult],
                isLoadingNewFilter: false,
            });
        }
    };
    useEffect(() => {
        filterContent();
    }, [state.isLoadingNewFilter]);

    // criteria can be "Tumu" or any author name like "Bizim Tarifler"
    const onFilterContent = (criteria) => {
        if (state.filterCriteria === criteria) {
            return;
        }
        setState({ ...state, isLoadingNewFilter: true, newFilterCriteria: criteria });
    };

    useEffect(() => {
        if (!state.isRefreshingContent) {
            return;
        }
        getTagDetails();
    }, [state.isRefreshingContent]);

    const handleRefresh = () => {
        setState({ ...state, isRefreshingContent: true });
    };

    const listHeader = (
        <>
            <SearchInput navigation={navigation} />
            <ImageBackground source={headerBgImage} style={styles.bgHeroImage} resizeMode="cover">
                <View style={styles.insideImage}>
                    <BtText type="title2" color="white">
                        Köşe Yazıları
                    </BtText>
                </View>
            </ImageBackground>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => {
                    const author = item;
                    return author.name;
                }}
                style={styles.authorFlatList}
                data={state.authorList}
                renderItem={(item) => {
                    const author = item.item;
                    const index = item.index;
                    let authorColor;
                    // authorList includes "Tumu" as FIRST author and it should have unique backgroundcolor(black)
                    if (author.name === 'Tümü') {
                        authorColor = 'black';
                    } else {
                        // So, repetitive coloring of the buttons should start after first iteration. Thus, index should be considered as index - 1
                        const realIndex = index - 1;
                        authorColor =
                            realIndex <= BTN_COLORS.length - 1 ? BTN_COLORS[realIndex] : BTN_COLORS[realIndex % BTN_COLORS.length];
                    }
                    return (
                        <TouchableOpacity
                            key={author.name}
                            style={[
                                styles.authorNameButton,
                                { backgroundColor: author.name === state.filterCriteria ? authorColor : 'white' },
                            ]}
                            onPress={() => onFilterContent(author.name, index)}
                        >
                            <BtText
                                style={[
                                    {
                                        color: state.filterCriteria === author.name ? 'white' : authorColor,
                                    },
                                    { ...Theme.typography.searchInputLabel },
                                ]}
                            >
                                {author.name}
                            </BtText>
                        </TouchableOpacity>
                    );
                }}
            />
            <View style={styles.headerTitle}>
                <BtText type="title3" color="lightBlue" style={styles.allArticles}>
                    Tüm Köşe Yazıları
                </BtText>
                <SortButton handleSort={handleSort} color="orange" />
            </View>
        </>
    );

    const listFooter = (
        <>
            <View style={styles.showMore}>
                {state.hasNextPage && <BtButton onPress={() => getNextPage()} label="DAHA FAZLA YÜKLE" />}
                {state.isLoadingNext && <BtLoader style={{ marginTop: 80 }} />}
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <FlatList
                    refreshing={state.isRefreshingContent}
                    onRefresh={handleRefresh}
                    style={styles.parentFlatList}
                    data={state.filteredArticles}
                    numColumns={2}
                    keyExtractor={(item) => item.created_at}
                    renderItem={(articleObj) => {
                        const articleContent = articleObj.item;
                        if (!state.isRefreshingContent && !state.isLoadingNewFilter) {
                            return <Slider key={articleContent.created_at} data={articleContent} />;
                        }
                        if (articleObj.index === 0) {
                            return <BtLoader style={styles.innerBtLoader} />;
                        }
                    }}
                    ListHeaderComponent={listHeader}
                    ListFooterComponent={listFooter}
                />
            )}
        </SafeAreaView>
    );
};

export default ArticlesPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
    },
    innerBtLoader: {
        marginTop: 80,
    },
    parentFlatList: { flex: 1 },
    flatListLoader: { marginTop: 50 },
    showMore: { marginHorizontal: 20 },
    allArticles: { marginBottom: 5 },
    articleList: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    filterSection: { marginTop: 15 },
    blogCardTextWrapper: {
        marginTop: 10,
    },
    blogCardText: {
        ...theme.typography.textSummary,
        color: theme.palette.green,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: '2%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.palette.borderColor,
        paddingBottom: 10,
        marginTop: 20,
    },
    bgHeroImage: {
        flex: 1,
        height: 200,
        marginBottom: 10,
    },
    insideImage: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    btnStyle: {
        borderRadius: 10,
        flex: 0.5,
        marginVertical: 5,
    },
    cardMain: {
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.borderColor,
        padding: 20,
        paddingBottom: 10,
        height: 240,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cardHeader: {},

    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        marginTop: 15,
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: Theme.palette.borderColor,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitleWrapper: {},
    cardTitle: {
        ...theme.typography.title6,
        color: theme.palette.green,
    },
    cardItemDescription: {
        color: '#fff',
        width: '85%',
    },
    avatar: {
        marginRight: 10,
    },
    avatarImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    authorName: {
        ...theme.typography.title6,
        color: theme.palette.green,
    },
    authorNameButton: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.borderColor,
        width: 150,
        marginRight: 20,
        alignItems: 'center',
    },
    authorFlatList: {
        paddingLeft: '1%',
        marginTop: 10,
    },
});
