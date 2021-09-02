import React, { useReducer, useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList, AsyncStorage, RefreshControl } from 'react-native';
import { Context as AppContext } from '../../context/AppContext';
import { MiniCard, BtText, BtCheckButton, PurchasedCard, BtLoader } from '../../components';

import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import api from '../../api/api';
import BagBlueSvg from '../../../assets/icons/bag_blue.svg';
import TrashSvg from '../../../assets/icons/trash.svg';
import BtButton from '../../components/BtButton';
import SliderRecipes from '../../components/SliderRecipes';
import Theme from '../../theme';

const initialState = {
    purchasedRecipes: [],
    isLoading: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const CheckoutHistoryPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    //const AuthState = useContext(AppContext).state;

    useEffect(() => {
        getPurchased();
    }, []);

    const getPurchased = async () => {
        try {
            setState({ isLoading: true });
            const response = await UserAPI.getPurchased();
            const data = response.data;
            if (data.success) {
                setState({ purchasedRecipes: data.purchased_recipes });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
                // console.log('Error Notifications', responseParsed);
            }
        }
        setState({ isLoading: false });
    };
    const onRefresh = async () => {
        await getPurchased();
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
                        {state.purchasedRecipes.length ? (
                            state.purchasedRecipes.map((option, key) => {
                                return (
                                    <PurchasedCard
                                        key={key}
                                        data={option.recipe}
                                        createdDate={option.added_to_cart_at.slice(0, 10)}
                                        onPressDelete={() => console.log('Not implemented')}
                                    />
                                );
                            })
                        ) : (
                            <View>
                                <View style={[styles.iconCart]}>
                                    <BagBlueSvg width={30} height={30} />
                                </View>
                                <BtText type="title4" color="lightBlue" style={{ textAlign: 'center', marginTop: 20 }}>
                                    Satın aldığın ürün yok :(
                                </BtText>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default CheckoutHistoryPage;

const styles = StyleSheet.create({
    headerTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    headerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Theme.palette.green,
        flex: 1,
        padding: 10,
        margin: 5,
    },
    cardItemDot: {
        backgroundColor: Theme.palette.green,
        color: '#fff',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    iconCart: {
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
