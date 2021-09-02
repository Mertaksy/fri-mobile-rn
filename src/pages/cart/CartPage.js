import React, { useReducer, useContext, useEffect, useRef } from 'react';
import { ScrollView, View, RefreshControl, SafeAreaView, StyleSheet, AppState } from 'react-native';
import Theme from '../../theme';

import { CartItem, BtLoader } from '../../components';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import BtText from '../../components/BtText';
import BtButton from '../../components/BtButton';
import * as WebBrowser from 'expo-web-browser';
import { Context as AppContext } from '../../context/AppContext';
import BagBlueSvg from '../../../assets/icons/bag_blue.svg';
import SliderRecipes from '../../components/SliderRecipes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headerBgImage = require('../../../assets/images/dictionary_bg.png');

const initialState = {
    isLoading: true,
    cart: [],
    refreshing: false,
    url: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const CartPage = ({ route, navigation, shouldRedirectToCart }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // AppGlobalState used for not to get error from React Native AppState
    const AppGlobalState = useContext(AppContext).state;
    const { setUserCart } = useContext(AppContext);

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const getData = async () => {
            await getCart();
            setState({ isLoading: false });
        };
        getData();
        AppState.addEventListener('change', _handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            onRefresh();
        }
        appState.current = nextAppState;
        console.log('AppState', appState.current);
    };
    const getCart = async () => {
        try {
            setState({ isLoading: true });
            const unauthCartResponse = await AsyncStorage.getItem('unauthCart');
            const unauthCart = JSON.parse(unauthCartResponse);
            if (unauthCart && unauthCart.recipe_slug) {
                const formattedIngredientList = Object.keys(unauthCart.ingredients).join(',');
                await UserAPI.addCart(unauthCart.recipe_slug, formattedIngredientList);
                AsyncStorage.setItem('unauthCart', JSON.stringify(''));
            }
            const cartResponse = await UserAPI.getCart();
            const cartData = cartResponse.data;
            if (cartData.success) {
                setUserCart([...cartData.cart]);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
            setUserCart([]);
        }
        setState({ isLoading: false });
    };

    const getJWT = async () => {
        try {
            const response = await UserAPI.getJWT();
            const data = response.data;
            const url = `https://bizimtarifler.istegelsin.com/bizim-tarifler?token=${data.jwt_token}&disableBackLink=1`;
            setState({ url });
            goIGelsin(url);
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };
    const goIGelsin = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        onRefresh();
    };
    const onRefresh = async () => {
        await getCart();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#fcfcfc' }}
                    refreshControl={<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />}
                >
                    {AppGlobalState.userCart.length > 0 ? (
                        <>
                            <View style={styles.headerTabs}>
                                <View style={styles.headerTab}>
                                    <View style={styles.cardItemDot}>
                                        <BtText type="title7" style={{ color: '#fff', lineHeight: 20 }}>
                                            1
                                        </BtText>
                                    </View>
                                    <BtText type="title10Gilroy" style={styles.cardItemDescription}>
                                        Sepetin
                                    </BtText>
                                </View>
                                <View style={[styles.headerTab, { opacity: 0.3 }]}>
                                    <View style={styles.cardItemDot}>
                                        <BtText type="title7" style={{ color: '#fff', lineHeight: 20 }}>
                                            2
                                        </BtText>
                                    </View>
                                    <BtText type="title10Gilroy" style={styles.cardItemDescription}>
                                        İstegelsin'e git
                                    </BtText>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                {AppGlobalState.userCart.map((item, key) => (
                                    <CartItem key={key} navigation={navigation} data={item} onRefresh={onRefresh} />
                                ))}
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 10 }}>
                                <BtButton
                                    onPress={() => navigation.navigate('RecipesListPage')}
                                    label="TARİF EKLE"
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                />
                                <BtButton
                                    onPress={getJWT}
                                    variant="orange"
                                    label="İSTEGELSİN'E GİT"
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                />
                            </View>
                        </>
                    ) : (
                        <View>
                            <View style={[styles.iconCart]}>
                                <BagBlueSvg width={30} height={30} />
                            </View>
                            <BtText type="title4" color="lightBlue" style={{ textAlign: 'center', marginTop: 20 }}>
                                Sepetinde hiç tarif yok :(
                            </BtText>
                            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                                <BtButton
                                    icon="back-white"
                                    iconAlign="fixed"
                                    onPress={() => navigation.navigate('RecipesListPage')}
                                    label="TARİFLERİ İNCELE"
                                    variant="orange"
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
                                <SliderRecipes navigation={navigation} block={{ title: 'İlginizi Çekebilir' }} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default CartPage;

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
