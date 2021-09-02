// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import React, { useReducer, useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, FlatList, Alert, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';
import {
    DictionarySort,
    ListItemCard,
    RecipeCard,
    MiniCard,
    BtText,
    CardSlider,
    CardCategory,
    TopColorLine,
    BtButton,
    BtLoader,
} from '../../components';
import Carousel from 'react-native-snap-carousel';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import HTML from 'react-native-render-html';
import SortSvg from '../../../assets/icons/sort.svg';
import SearchInput from '../../components/SearchInput';

const headerBgImage = require('../../../assets/images/dictionary_bg.png');

const initialState = {
    letter: 'A',
    sortType: 'ascending',
    terms: [],
};

const reducer = (state, newState) => ({ ...state, ...newState });

const DictionaryPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getDictionaryByLetter();
    }, [state.letter]);

    const getDictionaryByLetter = async () => {
        try {
            const response = await ContentAPI.getDictionaryByLetter(state.letter, state.sortType);

            const data = response.data;
            if (data.success) {
                setState({
                    terms: data.terms,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            // console.log(responseParsed);
        }
    };
    const DictionaryCard = (props) => {
        const { item } = props;
        return (
            <View style={styles.cardMain}>
                <View style={styles.topSection}>
                    {item.image_full && (
                        <ImageBackground
                            imageStyle={{
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                            }}
                            source={{ uri: item.image_full }}
                            style={styles.bgImage}
                            resizeMode="cover"
                        ></ImageBackground>
                    )}
                    <BtText type="title4" color="green" style={styles.insideCardText}>
                        {item.title}
                    </BtText>
                </View>

                {item.content && (
                    <View style={{ marginVertical: 20 }}>
                        <HTML
                            source={{ html: item.content }}
                            tagsStyles={{
                                p: {
                                    fontSize: 12,
                                    lineHeight: 20,
                                    fontFamily: 'gilroy-medium',
                                    color: '#56696a',
                                },
                            }}
                        />
                    </View>
                )}
            </View>
        );
    };

    const onOrderChangeText = (letter) => {
        setState({ letter: letter || 'A' });
    };
    // const getNextPage = async () => {
    //     const page = state.page++;
    //     setState({ page, isLoadingNext: true });
    //     await getDictionaryByLetter(state.sortType, page);
    // };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            <SearchInput navigation={navigation} />

            <ImageBackground imageStyle={{ borderRadius: 0 }} source={headerBgImage} style={styles.bgHeroImage} resizeMode="cover">
                <BtText type="title2" color="white">
                    Sözlük
                </BtText>
            </ImageBackground>
            <DictionarySort onChangeText={onOrderChangeText} />
            <View
                style={{
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(229, 229, 229,0.4)',
                }}
            >
                <BtText type="title3" color="lightBlue">
                    Ne Nedir?
                </BtText>
            </View>
            <View style={{ marginVertical: 10 }}>
                <FlatList
                    //horizontal={true}
                    numColumns={1}
                    data={state.terms}
                    renderItem={({ item, index }) => <DictionaryCard item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            {/*<View style={{ marginHorizontal: 20 }}>*/}
            {/*    {state.hasNextPage && <BtButton onPress={() => getNextPage()} label="DAHA FAZLA YÜKLE" />}*/}
            {/*    {state.isLoadingNext && <BtLoader width={50} height={50} />}*/}
            {/*</View>*/}
        </ScrollView>
    );
};

export default DictionaryPage;
const styles = StyleSheet.create({
    // categoryWrapper: {
    //     flex:1,
    //     flexDirection:"row",
    //     flexWrap:"wrap"
    // },
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
    },
});
