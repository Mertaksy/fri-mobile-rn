import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView, ImageBackground, Platform } from 'react-native';
import { BtText, BtButton, BtLinkButton, BtInput, CountDownTimer } from '../../components';
import { useContext, useReducer } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import api from '../../api/api';
import { StackActions } from '@react-navigation/native';

const modalBgImage = require('../../../assets/images/modal-bg.png');

const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0;

const initialState = {
    sms_code: '',
    apiErrors: {},
    isRetryEnabled: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const SmsVerifyPage = ({ route, navigation, shouldRedirectToCart }) => {
    const [state, setState] = useReducer(reducer, initialState);

    const { params } = route;
    // Global context state
    const AppState = useContext(AppContext).state;

    // Global context actions
    const { setUserData, setUserToken, setUserPreferences, setUserAvailablePreferences } = useContext(AppContext);

    const login = async () => {
        try {
            setState({ apiErrors: {} });
            const response = await UserAPI.login(params.gsm_number.replace('+(90)', ''));
            console.log(response.data);
            if (response.data && response.data.success) {
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ apiErrors: responseParsed.errors });
        }
        setState({ isRetryEnabled: false });
    };

    const authenticateSms = async () => {
        try {
            setState({ apiErrors: {} });
            const response = await UserAPI.authenticateSms(params.gsm_number.replace('+(90)', ''), state.sms_code);
            const data = response.data;
            console.log(response.data);
            if (data.success) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.api_token;
                setUserToken(data.api_token);
                await getUser();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ apiErrors: responseParsed.errors });
        }
    };

    const getUser = async () => {
        try {
            const response = await UserAPI.getUser();
            const data = response.data;
            if (data.success) {
                setUserData(data.user);
                if (params.isRegister) {
                    const preferencesResponse = await UserAPI.getUserPreferences();
                    if (preferencesResponse.data && preferencesResponse.data.success) {
                        setUserPreferences(preferencesResponse.data.preferences);
                        setUserAvailablePreferences(preferencesResponse.data.available_values);
                        navigation.dispatch(StackActions.popToTop());
                        navigation.dispatch(StackActions.replace('SelectRecipesPage'));
                    } else {
                        if (shouldRedirectToCart) {
                            navigation.navigate('Cart', { shouldRedirectToCart });
                        }
                        navigation.navigate('TabBarStackNavigator');
                    }
                } else {
                    if (shouldRedirectToCart) {
                        navigation.navigate('Cart', { shouldRedirectToCart });
                    }
                    navigation.navigate('TabBarStackNavigator');
                }
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ apiErrors: responseParsed.errors });
        }
    };

    const inputOnChange = (sms_code) => {
        setState({ sms_code, verifyError: '' });
    };

    const timerFinishHandle = () => {
        setState({ isRetryEnabled: true });
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <KeyboardAvoidingView
                    style={styles.innerContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <BtText type="title1" color="green" style={{ marginBottom: 9 }}>
                        {params.isRegister ? 'Üye Ol' : 'Giriş Yap'}
                    </BtText>

                    <BtText type="helpText">
                        Lütfen <BtText color="green">{params.gsm_number}</BtText> numaralı telefonunuza gönderilen SMS kodunu giriniz.
                    </BtText>
                    <View style={{ marginVertical: 30 }}>
                        <BtInput
                            value={state.sms_code}
                            label="SMS Kodu"
                            placeholder="- - - -"
                            maxLength={4}
                            onChangeText={inputOnChange}
                            error={state.apiErrors.general || state.apiErrors.sms_code}
                        />
                    </View>
                    {!state.isRetryEnabled && <CountDownTimer timerFinishHandle={timerFinishHandle} />}
                    <BtLinkButton
                        style={{ marginVertical: 10 }}
                        underlined
                        variant="lightGreen"
                        type="linkButton"
                        label="Tekrar SMS Gönder"
                        onPress={login}
                        disabled={!state.isRetryEnabled}
                    />
                    <BtButton label="DEVAM ET" variant="orange" onPress={authenticateSms} />
                    <View
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                        }}
                    >
                        <BtLinkButton
                            underlined
                            variant="lightGreen"
                            type="linkButton"
                            label="GERİ DÖN"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <BtLinkButton
                        type="linkButtonSmall"
                        label="Giriş yapmadan devam et"
                        style={{ marginBottom: 50 }}
                        onPress={() => navigation.navigate('TabBarStackNavigator')}
                    />
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SmsVerifyPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    text: {
        color: 'grey',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
