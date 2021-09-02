// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import React, { useReducer, useState, useContext, useEffect, useRef } from 'react';
import { ScrollView, View, Text, SafeAreaView, FlatList, Alert, StyleSheet, Dimensions } from 'react-native';
import {
    ListSlider,
    ListItemCard,
    RecipeCard,
    MiniCard,
    BtText,
    CardSlider,
    CardCategory,
    BtLoader,
    BtButton,
    TopColorLine,
} from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import SearchInput from '../../components/SearchInput';

const initialState = {
    sliderLists: [],
    lists: [],
    isLoading: true,
    sortType: 'recent',
    page: 1,
    hasNextPage: false,
    isLoadingNext: false,
    sliderActiveSlide: 0,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const ListsPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const carouselRef = useRef();

    useEffect(() => {
        getAllLists();
        setState({ isLoading: false });
    }, []);

    const getAllLists = async (sortType, page) => {
        try {
            setState({ isLoadingNext: true });
            const response = await ContentAPI.getAllLists(sortType, page);
            const data = response.data;
            if (data.success) {
                const hasNextPage = data.contentlists.current_page < data.contentlists.last_page;
                const _list = [...state.lists, ...data.contentlists.data];

                setState({
                    sliderLists: data.contentlists.data.slice(0, 3),
                    lists: _list,
                    hasNextPage,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoadingNext: false });
    };
    const getNextPage = () => {
        const page = state.page++;
        getAllLists(state.sortType, state.page++);
        setState({ page });
    };

    const selectCategory = (slug) => {
        navigation.navigate('ListDetailsPage', { slug });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                    <SearchInput navigation={navigation} />
                    <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(229, 229, 229,0.4)' }}>
                        <Carousel
                            ref={carouselRef}
                            data={state.sliderLists}
                            renderItem={({ item, index }) => <ListSlider navigation={navigation} data={item} />}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            sliderWidth={Dimensions.get('window').width - 40}
                            itemWidth={Dimensions.get('window').width - 40}
                            activeSlideAlignment="start"
                            loop={false}
                            onSnapToItem={(index) => setState({ sliderActiveSlide: index })}
                        />
                        <Pagination
                            dotsLength={state.sliderLists.length}
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
                        <FlatList
                            //horizontal={true}
                            numColumns={1}
                            data={state.lists}
                            renderItem={({ item, index }) => <ListItemCard onPress={() => selectCategory(item.slug)} data={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ marginHorizontal: 0 }}>
                        {state.hasNextPage && <BtButton onPress={() => getNextPage()} label="DAHA FAZLA TARİF GÖR" />}
                        {state.isLoadingNext && <BtLoader width={50} height={50} />}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ListsPage;
const styles = StyleSheet.create({
    // categoryWrapper: {
    //     flex:1,
    //     flexDirection:"row",
    //     flexWrap:"wrap"
    // },
    card: {
        marginVertical: 10,
    },
    btnStyle: {
        width: '20%',
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
