import React, { useReducer, useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, FlatList, Alert, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';
import {
    SortButton,
    ListItemCard,
    RecipeCard,
    MiniCard,
    BtText,
    CardSlider,
    CardCategory,
    BtButton,
    BtLoader,
    VideoCard,
    TopColorLine,
} from '../../components';
import Carousel from 'react-native-snap-carousel';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import HTML from 'react-native-render-html';
import SortSvg from '../../../assets/icons/sort.svg';
import SearchInput from '../../components/SearchInput';

const headerBgImage = require('../../../assets/images/dictionary_bg.png');

const initialState = {
    sortType: 'recent',
    tips: [],
    page: 1,
    hasNextPage: false,
    isLoadingNext: false,
    isLoading: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const VideoContentPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getTagDetails();
    }, []);

    const getTagDetails = async (sortType, page) => {
        try {
            setState({ isLoadingNext: true });
            const response = await ContentAPI.getTagDetails('videolu-icerik', sortType, page);

            const data = response.data;
            if (data.success) {
                const hasNextPage = data.freetexts.current_page < data.freetexts.last_page;

                setState({ tips: data.freetexts.data, hasNextPage });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoadingNext: false });
    };
    const getNextPage = async () => {
        const page = state.page++;
        setState({ page, isLoadingNext: true });
        await getTagDetails(state.sortType, page);
    };

    const handleSort = async (sortType) => {
        setState({ sortType });
        await getTagDetails(sortType, state.page);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TopColorLine />
            <View style={{ zIndex: 999, padding: 10 }}>
                <SearchInput navigation={navigation} />
            </View>
            <View style={styles.headerTitle}>
                <BtText type="title3" color="lightBlue" style={{ marginBottom: 5 }}>
                    Video İçerikler
                </BtText>
                <SortButton handleSort={handleSort} />
            </View>
            <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                <FlatList
                    //horizontal={true}
                    numColumns={2}
                    data={state.tips}
                    renderItem={({ item, index }) => <VideoCard item={item} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={{ marginHorizontal: 20 }}>
                {state.hasNextPage && <BtButton onPress={() => getNextPage()} label="DAHA FAZLA YÜKLE" />}
                {state.isLoadingNext && <BtLoader width={50} height={50} />}
            </View>
        </ScrollView>
    );
};

export default VideoContentPage;
const styles = StyleSheet.create({
    // categoryWrapper: {
    //     flex:1,
    //     flexDirection:"row",
    //     flexWrap:"wrap"
    // },
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
});
