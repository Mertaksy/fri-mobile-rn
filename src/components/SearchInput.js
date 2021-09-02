import React, { useContext, useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../theme';
import * as ContentAPI from '../api/content';
import ApiErrors from '../api/errors';
import { useDebouncedEffect } from '../utils/useDebouncedEffect';
import BtText from './BtText';
import SearchSvg from '../../assets/icons/search.svg';
import { Context as AppContext } from '../context/AppContext';

const SearchInput = (props) => {
    const { navigation, inSearchPage, handleKeywords, preDefinedKeyword = '' } = props;
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const AppState = useContext(AppContext).state;
    const popularSearchTags = AppState.popularSearches.slice(0, 4);
    const [shouldShowResults, setShouldShowResults] = useState(true);
    const [overlayZIndex, setOverlayZIndex] = useState(0);
    const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState('Vejetaryen Yemekler');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setKeyword('');
        });

        const getPlaceHolderText = async () => {
            try {
                const resp = await ContentAPI.getHamburgerMenuSponsor();
                if (resp.data.success) {
                    setSearchBarPlaceHolder(resp.data.data.search_brand);
                }
            } catch (e) {}
        };

        getPlaceHolderText();

        return unsubscribe;
    }, []);

    useEffect(() => {
        setKeyword(preDefinedKeyword);
    }, [preDefinedKeyword]);

    const getSearchSuggestResult = async () => {
        try {
            if (keyword.length > 2) {
                const response = await ContentAPI.getSearchSuggestResult(keyword);
                const data = response.data;
                if (data.success) {
                    setResults(data.results);
                }
            } else {
                setResults([]);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    useDebouncedEffect(() => getSearchSuggestResult(), 500, [keyword]);

    const handleTextChange = async (text) => {
        if (text.split(' ').length < 4) {
            setKeyword(text);
        }
    };

    const goDetails = (item) => {
        if (item.data.bt_content_type === 'recipe') {
            navigation.navigate('RecipeDetailsPage', { slug: item.data.slug });
        }
    };
    const goResultsPage = () => {
        setShouldShowResults(false);
        if (keyword === '') {
            return false;
        }
        const keywords = keyword.split(' ').join('%20');
        if (inSearchPage) {
            handleKeywords(keywords);
        } else {
            navigation.navigate('SearchResultPage', { keywords });
        }
        setResults([]);
    };
    const handlePopularClick = (tag) => {
        const keywords = tag.split(' ').join(',');
        if (inSearchPage) {
            handleKeywords(keywords);
        } else {
            navigation.navigate('SearchResultPage', { keywords });
        }
        setResults([]);
        setKeyword(tag);
    };
    return (
        <>
            <View style={[styles.textInputWrapper]}>
                <TextInput
                    onFocus={() => {
                        setOverlayZIndex(997);
                        setShouldShowResults(true);
                    }}
                    value={keyword}
                    style={[styles.textInput, { borderBottomLeftRadius: results.length ? 0 : 10 }]}
                    placeholder={searchBarPlaceHolder}
                    underlineColorAndroid="transparent"
                    onChangeText={handleTextChange}
                    returnKeyType="search"
                    onSubmitEditing={goResultsPage}
                />
                <TouchableOpacity
                    onPress={goResultsPage}
                    style={[styles.searchIcon, { borderBottomRightRadius: results.length ? 0 : 10, zIndex: 999 }]}
                >
                    <SearchSvg width={15} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchWrapper}>
                {shouldShowResults ? (
                    <View style={[styles.resultsWrapper, { backgroundColor: results.length ? '#f7f6f4' : 'transparent' }]}>
                        {results.map((result, idx) => {
                            return (
                                <TouchableOpacity onPress={() => goDetails(result)} key={idx} style={styles.resultBtn}>
                                    <BtText type="searchInputLabel" style={styles.resultBtnLabel}>
                                        {result.data.title}
                                    </BtText>
                                </TouchableOpacity>
                            );
                        })}

                        {results.length > 0 && popularSearchTags.length > 0 ? (
                            <View style={styles.popularWrapper}>
                                <BtText type="gilroy13Bold" style={styles.popularLabel}>
                                    Popüler Aramalar
                                </BtText>
                                <View style={styles.popularTags}>
                                    {popularSearchTags.map((search, idx) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handlePopularClick(search.keyword)}
                                                key={idx}
                                                style={styles.popularBtn}
                                            >
                                                <BtText type="searchInputLabel" style={styles.resultBtnLabel}>
                                                    {search.keyword}
                                                </BtText>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ) : null}
                    </View>
                ) : null}
            </View>
            <TouchableOpacity
                style={[styles.overlay, { zIndex: overlayZIndex }]}
                onPress={() => {
                    setShouldShowResults(false);
                    setOverlayZIndex(0);
                }}
            ></TouchableOpacity>
        </>
    );
};

export default SearchInput;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 5000,
    },
    searchWrapper: {
        position: 'absolute',
        width: '100%',
        zIndex: 998,
    },
    textInputWrapper: {
        zIndex: 999,
        marginHorizontal: 10,
        flexDirection: 'row',
        marginVertical: 10,
    },
    searchIcon: {
        position: 'absolute',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f6f4',
        zIndex: 999,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 50,
        right: 0,
    },
    textInput: {
        color: '#052c2c',
        borderTopLeftRadius: 10,
        borderWidth: 0,
        height: 50,
        paddingVertical: 10,
        paddingLeft: 15,
        width: '80%',
        marginBottom: Theme.spacing.tiny,
        fontSize: 13,
        backgroundColor: '#f7f6f4',
        zIndex: 999,
    },
    resultsWrapper: {
        backgroundColor: '#f7f6f4',
        backgroundColor: 'orange',
        position: 'relative',
        flex: 1,
        top: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        zIndex: 999,
        marginHorizontal: 10,
    },
    resultBtn: {
        marginTop: 20,
        zIndex: 999,
    },
    resultBtnLabel: {
        color: '#052c2c',
        zIndex: 999,
    },
    popularLabel: {
        color: '#052c2c',
        marginTop: 15,
        zIndex: 999,
    },
    popularWrapper: {
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        marginTop: 20,
        zIndex: 999,
    },
    popularTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 999,
    },
    popularBtn: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#064545',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
        zIndex: 999,
    },
});
