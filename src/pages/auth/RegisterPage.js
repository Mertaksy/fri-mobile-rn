// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BtText, BtButton, BtLinkButton, BtInput } from '../../components';
import { useContext, useReducer } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import SocialMediaLoginSection from '../../components/SocialMediaLoginSection';

const modalBgImage = require('../../../assets/images/modal-bg.png');

const initialState = {
    gsm_number: '',
    apiErrors: {},
};

const reducer = (state, newState) => ({ ...state, ...newState });

const RegisterPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;

    // Global context actions
    const {} = useContext(AppContext);

    const goFormPage = async (isSocial) => {
        tryRegisterForPhoneValidation(isSocial);
    };
    const tryRegisterForPhoneValidation = async (isSocial) => {
        try {
            const postData = {
                gsm_number: state.gsm_number.replace('+(90)', ''),
            };
            const response = await UserAPI.register(postData);
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ apiErrors: responseParsed.errors });
            if (!responseParsed.errors.gsm_number) {
                navigation.navigate('RegisterFormPage', { gsm_number: state.gsm_number, isSocial });
            }
        }
    };
    const phoneOnChange = (gsm_number) => {
        let apiErrors = state.apiErrors;
        apiErrors.gsm_number = '';
        if (gsm_number && gsm_number.length < 5) {
            gsm_number = '+(90)' + gsm_number;
        }
        if (gsm_number.indexOf('+(90)0') > -1) {
            setState({ gsm_number: '+(90)', apiErrors });
        } else {
            setState({ gsm_number, apiErrors });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <KeyboardAvoidingView style={styles.innerContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                    <ScrollView>
                        <BtText type="title1" style={{ marginBottom: 9, color: Theme.palette.green, textAlign: 'center' }}>
                            Üye Ol
                        </BtText>
                        <BtText style={Platform.OS === 'ios' ? { marginBottom: 15 } : {}}>
                            Üye olmak için aşağıdaki yöntemleri deneyebilirsin.
                        </BtText>
                        {Platform.OS === 'android' ? <SocialMediaLoginSection setState={setState} navigation={navigation} /> : null}
                        <BtInput
                            value={state.gsm_number.length > 5 ? state.gsm_number : ''}
                            placeholder="+(90) ___ ___ __ __"
                            label="Cep Telefonu Numaran"
                            onChangeText={phoneOnChange}
                            error={state.apiErrors.gsm_number}
                            keyboardType="phone-pad"
                            maxLength={15}
                        />
                        <BtText color="error">{state.apiErrors.general}</BtText>
                        <BtButton label="DEVAM ET" variant="orange" onPress={() => goFormPage(false)} />
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 10,
                            }}
                        >
                            <BtText>Zaten üye misiniz?</BtText>
                            <BtLinkButton
                                underlined
                                variant="orange"
                                type="linkButton"
                                label="Giriş Yap"
                                onPress={() => navigation.navigate('LoginPage')}
                            />
                        </View>
                        {Platform.OS === 'ios' ? <SocialMediaLoginSection setState={setState} navigation={navigation} /> : null}
                        <BtLinkButton
                            type="linkButtonSmall"
                            label="Giriş yapmadan devam et"
                            style={{ marginBottom: 50 }}
                            onPress={() => navigation.navigate('TabBarStackNavigator')}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default RegisterPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: '5%',
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
