import React, { useReducer, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList, View, RefreshControl } from 'react-native';
import { BtButton, CardSlider, RecipeCard, WriterCard, BtText, MiniCard, CardTypeRenderer, BtLoader } from '../../components';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';

const initialState = {
    favorites: [],
    apiErrors: {},
    isLoading: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const FavoritesPage = ({ route, navigation }) => {
    const { params } = route;
    const { favoriteList } = params;
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getFavorites();
        //addFavorites(state.uuid, state.type, state.slug);
    }, []);

    const getFavorites = async () => {
        try {
            setState({ isLoading: true });
            const response = await UserAPI.getFavorites(favoriteList.uuid);
            const data = response.data;
            if (data.success) {
                setState({ favorites: data.favorites });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
        setState({ isLoading: false });
    };

    const addFavorites = async (uuid, type, slug) => {
        try {
            const response = await UserAPI.addFavorites(state.uuid, state.type, state.slug);

            if (response.success) {
                setState({ favorites: response.favorites });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };

    const deleteFavorites = async (uuid, type, slug) => {
        try {
            const response = await UserAPI.removeFavorites(uuid, type, slug);
            const data = response.data;

            if (data.success) {
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };
    const onRefresh = async () => {
        await getFavorites();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: 10,
                        }}
                    >
                        <BtText type="title3" style={{ color: '#73b3b3', marginTop: 30, marginLeft: 20 }}>
                            {favoriteList.title}
                        </BtText>
                        <View style={{ marginVertical: 20 }}>
                            <FlatList
                                numColumns={2}
                                data={state.favorites}
                                renderItem={({ item, index }) => (
                                    <CardTypeRenderer item={item.favorite_data} navigation={navigation} typeField="bt_content_type" />
                                )}
                                //width={Dimensions.get('window').width / 2 - 30}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default FavoritesPage;

const styles = StyleSheet.create({});
