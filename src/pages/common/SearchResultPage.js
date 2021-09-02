import React, { useReducer, useContext, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { ListCard, BtButton, RecipeCard, BtTagButton, BtText, BtLoader, CardTypeRenderer, VideoCard, CardArticle } from '../../components';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import SliderRecipes from '../../components/SliderRecipes';
import SearchInput from '../../components/SearchInput';
import SearchSvg from '../../../assets/icons/search_light_blue.svg';
import { Context as AppContext } from '../../context/AppContext';

const initialState = {
    isLoading: true,
    results: [],
    additionalData: {},
    otherResults: [],
    selectedTag: '',
    searchQuery: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const SearchResultPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const AppState = useContext(AppContext).state;

    const { params = {} } = route;
    const { keywords = '' } = params;

    useEffect(() => {
        getRecipesSearchResults(keywords, 'recent', 4);
        getOtherSearchResults(keywords, 'ascending', 8);
        setState({ searchQuery: keywords });
    }, [keywords]);

    const getRecipesSearchResults = async (keywords, sortType, recordsPerPage = 4) => {
        try {
            const response = await ContentAPI.getSearchResults(keywords, sortType, recordsPerPage, 'recipes');
            const data = response.data;
            if (data.success) {
                setState({ results: data.results, additionalData: data.additional_data });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false });
    };

    const getOtherSearchResults = async (keywords, sortType, recordsPerPage = 8) => {
        try {
            const response = await ContentAPI.getSearchResults(keywords, sortType, recordsPerPage, 'contentlists,freetexts');
            const data = response.data;
            console.log({ data });
            if (data.success) {
                setState({ otherResults: data.results });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false });
    };

    const handleKeywords = (keywords) => {
        setState({ searchQuery: keywords });
        getRecipesSearchResults(keywords, 'ascending', 4, 'recipes');
        getOtherSearchResults(keywords, 'ascending', 8);
    };
    const handleTagPress = (selectedTag) => {
        setState({ selectedTag });
        getRecipesSearchResults(selectedTag, 'ascending', 4, 'recipes');
        getOtherSearchResults(selectedTag, 'ascending', 8);
    };

    const keywordDisplay = () => {
        return state.additionalData.query_keywords.replace(/ AND/g, '');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView>
                    <SearchInput
                        navigation={navigation}
                        inSearchPage
                        handleKeywords={handleKeywords}
                        preDefinedKeyword={state.selectedTag}
                    />

                    {state.results.length > 0 ? (
                        <View style={{ flex: 1 }}>
                            {state.additionalData.hits > 0 ? (
                                <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                    <BtText type="bodyBold" color="green">
                                        {keywordDisplay()}
                                    </BtText>
                                    <BtText color="green"> ile ilgili </BtText>
                                    <BtText type="bodyBold" color="green">
                                        {state.additionalData.hits}
                                    </BtText>
                                    <BtText color="green"> sonuç bulduk.</BtText>
                                </View>
                            ) : null}
                            <View style={styles.titleWrapper}>
                                <BtText type="title3" color="green" style={styles.categoryTitle}>
                                    Tarifler
                                </BtText>
                            </View>
                            <View style={styles.categoryWrapper}>
                                {/*{state.categories.map((category, key) => {*/}
                                {/*    return <CardCategory key={key} data={category} style={styles.card} btnStyle={styles.btnStyle}/>;*/}
                                {/*})}*/}
                                <FlatList
                                    //horizontal={true}
                                    key={'__'}
                                    keyExtractor={(item, index) => '__' + index.toString()}
                                    numColumns={2}
                                    data={state.results}
                                    renderItem={({ item, index }) => (
                                        <CardTypeRenderer item={item.data} navigation={navigation} typeField="bt_content_type" />
                                    )}
                                />
                                <BtButton
                                    onPress={() => {
                                        navigation.navigate('RecipesListPage', { searchQuery: state.searchQuery });
                                    }}
                                    label="TÜM TARİF SONUÇLARI"
                                    variant="orange"
                                />
                            </View>
                            {state.otherResults.length > 0 && (
                                <>
                                    <View style={styles.titleWrapper}>
                                        <BtText type="title3" color="green" style={styles.categoryTitle}>
                                            Diğer Sonuçlar
                                        </BtText>
                                    </View>
                                    <View style={styles.categoryWrapper}>
                                        {/*{state.categories.map((category, key) => {*/}
                                        {/*    return <CardCategory key={key} data={category} style={styles.card} btnStyle={styles.btnStyle}/>;*/}
                                        {/*})}*/}
                                        <FlatList
                                            //horizontal={true}
                                            key={'#'}
                                            keyExtractor={(item, index) => '#' + index.toString()}
                                            numColumns={2}
                                            data={state.otherResults}
                                            renderItem={({ item, index }) => (
                                                <CardTypeRenderer item={item.data} navigation={navigation} typeField="bt_content_type" />
                                            )}
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                    ) : (
                        <ScrollView>
                            <View style={styles.emptyWrapper}>
                                <View style={[styles.iconEmpty]}>
                                    <SearchSvg width={30} height={30} />
                                </View>
                                <View style={{ flexDirection: 'row', paddingVertical: 30, justifyContent: 'center' }}>
                                    <BtText type="title4" color="lightBlue">
                                        "{keywordDisplay()}"
                                    </BtText>
                                    <BtText type="title4" color="lightBlue">
                                        {' '}
                                        ile ilgili sonuç bulunamadı :(
                                    </BtText>
                                </View>
                                <BtButton
                                    icon="back-white"
                                    iconAlign="fixed"
                                    style={{ paddingHorizontal: 20 }}
                                    onPress={() => navigation.navigate('RecipesScreenStack')}
                                    label="TARİFLERİ İNCELE"
                                    variant="orange"
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
                                <BtText type="title3" color="green" style={styles.categoryTitle}>
                                    Popüler Aramalar
                                </BtText>
                            </View>
                            <View style={{ paddingLeft: 20 }}>
                                <FlatList
                                    key={'_'}
                                    keyExtractor={(item, index) => '_' + index.toString()}
                                    data={AppState.popularSearches}
                                    horizontal
                                    renderItem={({ item, index }) => (
                                        <BtTagButton index={index} label={item.keyword} onPress={() => handleTagPress(item.keyword)} />
                                    )}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
                                <SliderRecipes navigation={navigation} block={{ title: 'İlginizi Çekebilir' }} />
                            </View>
                        </ScrollView>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default SearchResultPage;
const styles = StyleSheet.create({
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
    titleWrapper: {
        marginHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    categoryTitle: {
        paddingBottom: 10,
    },
    emptyWrapper: {
        justifyContent: 'center',
        marginTop: 0,
        paddingHorizontal: 20,
    },
    iconEmpty: {
        backgroundColor: 'rgba(115, 179, 179,0.15)',
        borderRadius: 45,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
});
