// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { BtText, BtButton, BtLinkButton, BtInput, KvkkContent, TicariElektronikContent, UyelikSozlesmesiContent } from '../../components';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import CheckedBox from '../../../assets/icons/check_circle_green.svg';
import UncheckedBox from '../../../assets/icons/empty_circle_green.svg';
import ErrorCheckedBox from '../../../assets/icons/empty_circle_red.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
const modalBgImage = require('../../../assets/images/modal-bg.png');

const initialState = {
    gsm_number: '',
    apiErrors: {},
    editableForSocial: true,
    isKvkk: false,
    isTicari: false,
    isDirtyCheckbox: false,
    name: '',
    email: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const RegisterFormPage = ({ route, navigation }) => {
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    const [state, setState] = useReducer(reducer, initialState);
    const [showKvkkModal, setKvkkShowModal] = useState(false);
    const [showTicariModal, setTicariShowModal] = useState(false);
    const [showUyelikModal, setUyelikShowModal] = useState(false);

    // Global context state
    const AppState = useContext(AppContext).state;

    // Global context actions
    const {} = useContext(AppContext);
    const { params } = route;

    const storeUserNameToLocalStorage = async (data) => {
        try {
            await AsyncStorage.setItem('userName', JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    };

    const getUserNameFromLocalStorage = async () => {
        try {
            const userName = await AsyncStorage.getItem('userName');
            if (userName !== null) {
                return JSON.parse(userName);
            }
            return null;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let userName;
        let userEmail;
        let gsm_number;
        if (params.gsm_number) {
            gsm_number = params.gsm_number;
        } else if (params.google_data) {
            userName = params.google_data.user.name;
            userEmail = params.google_data.user.email;
        } else if (params.fb_data) {
            userName = params.fb_data.name;
            userEmail = params.fb_data.email;
        } else if (params.apple_data) {
            const idToken = params.apple_data.identityToken;
            const { familyName, givenName } = params.apple_data.fullName;
            userName = givenName + ' ' + familyName;
            const decodedUserData = jwt_decode(idToken);
            userEmail = decodedUserData.email;
        }

        const processUserData = async () => {
            let theName = '';
            if (userName && userName !== 'null null') {
                storeUserNameToLocalStorage(userName);
                theName = userName;
            } else {
                if (params.apple_data) {
                    const localName = await getUserNameFromLocalStorage();
                    theName = localName || '';
                }
            }
            setState({ ...state, name: theName, email: userEmail, editableForSocial: true, gsm_number });
        };

        processUserData();
    }, []);

    const register = async () => {
        try {
            let isTermsAccepted = true;

            setState({ ...state, apiErrors: {}, isDirtyCheckbox: true });

            if (!state.isKvkk) {
                isTermsAccepted = false;
            }
            // if (!state.isTicari) {
            //     isTermsAccepted = false;
            // }
            if (!isTermsAccepted) {
                return false;
            }

            const postData = {
                name: state.name || '',
                gsm_number: state.gsm_number.replace('+(90)', ''),
                email: state.email,
                google_token: params.google_data ? params.google_data.accessToken : '',
                facebook_token: params.fb_data ? params.fb_data.accessToken : '',
                apple_token: params.apple_data ? params.apple_data.identityToken : '',
            };
            const response = await UserAPI.register(postData);
            if (response.data && response.data.success) {
                navigation.navigate('SmsVerifyPage', {
                    gsm_number: state.gsm_number.replace('+(90)', ''),
                    isRegister: true,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ ...state, apiErrors: responseParsed.errors });
        }
    };
    const kvkkOnChange = () => {
        setState({ ...state, isKvkk: !state.isKvkk });
    };

    const ticariOnChange = () => {
        setState({ ...state, isTicari: !state.isTicari });
    };

    const closeKvkkModal = () => {
        setState({ ...state, isKvkk: true });
        setKvkkShowModal(false);
    };

    const closeTicariModal = () => {
        setState({ ...state, isTicari: true });
        setTicariShowModal(false);
    };

    const closeUyelikModal = () => {
        setUyelikShowModal(false);
    };

    const nameOnChange = (name) => {
        let apiErrors = state.apiErrors;
        apiErrors.name = '';
        setState({ ...state, name, apiErrors });
    };
    const emailOnChange = (email) => {
        let apiErrors = state.apiErrors;
        apiErrors.email = '';
        setState({ ...state, email, apiErrors });
    };

    const phoneOnChange = (gsm_number) => {
        let apiErrors = state.apiErrors;
        apiErrors.gsm_number = '';
        if (gsm_number && gsm_number.length < 5) {
            gsm_number = '+(90)' + gsm_number;
        }
        if (gsm_number.indexOf('+(90)0') > -1) {
            setState({ ...state, gsm_number: '+(90)', apiErrors });
        } else {
            setState({ ...state, gsm_number, apiErrors });
        }
    };

    const renderNameInput = () => {
        if (params.apple_data) {
            return params.name ? (
                <BtInput
                    editable={state.editableForSocial}
                    value={state.name}
                    label="Ad/Soyad"
                    onChangeText={nameOnChange}
                    error={state.apiErrors.name}
                />
            ) : null;
        } else {
            return (
                <BtInput
                    editable={state.editableForSocial}
                    value={state.name}
                    label="Ad/Soyad"
                    onChangeText={nameOnChange}
                    error={state.apiErrors.name}
                />
            );
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <KeyboardAvoidingView
                    style={styles.innerContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <BtText type="title1" style={{ marginBottom: 9 }} color="green">
                        Üye Ol
                    </BtText>
                    <BtText>Üye olmak için aşağıdaki alana bilgilerini girmen yeterli.</BtText>
                    <View style={{ marginTop: 30 }}>
                        {renderNameInput()}
                        {params.gsm_number ? null : (
                            <BtInput
                                value={state.gsm_number && state.gsm_number.length > 5 ? state.gsm_number : ''}
                                placeholder="+(90) ___ ___ __ __"
                                label="Cep Telefonu Numaran"
                                onChangeText={phoneOnChange}
                                error={state.apiErrors.gsm_number}
                                keyboardType="phone-pad"
                                maxLength={15}
                            />
                        )}

                        <BtInput
                            editable={state.editableForSocial}
                            value={state.email}
                            label="E-posta"
                            onChangeText={emailOnChange}
                            error={state.apiErrors.email}
                        />
                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Btn onPress={kvkkOnChange}>
                                {state.isKvkk === false ? (
                                    state.isDirtyCheckbox ? (
                                        <ErrorCheckedBox width={16} height={16} style={styles.icon} />
                                    ) : (
                                        <UncheckedBox width={16} height={16} style={styles.icon} />
                                    )
                                ) : (
                                    <CheckedBox width={16} height={16} style={styles.icon} />
                                )}
                            </Btn>
                            <Btn onPress={() => setKvkkShowModal(true)} style={{ flex: 1 }}>
                                <BtText type="contentTitle">
                                    <Text style={{ textDecorationLine: 'underline' }}>
                                        Kişisel verilerimin Kişisel Verilerin Korunması Hakkında Bilgilendirme{' '}
                                    </Text>
                                    metninde belirtilen kapsamda işlenmesine rıza gösteriyorum.
                                </BtText>
                            </Btn>
                        </View>
                        {!state.isKvkk && state.isDirtyCheckbox ? (
                            <BtText type="contentTitle" color="error">
                                Üye olmak için onaylamalısın.
                            </BtText>
                        ) : null}
                        <Modal animationType="fade" transparent visible={showKvkkModal}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <ScrollView style={styles.modalViewInner}>
                                        <KvkkContent></KvkkContent>
                                    </ScrollView>
                                    <BtButton style={styles.applyBtn} onPress={closeKvkkModal} label="ONAYLIYORUM" />
                                </View>
                            </View>
                        </Modal>

                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Btn onPress={ticariOnChange}>
                                {state.isTicari === false ? (
                                    <UncheckedBox width={16} height={16} style={styles.icon} />
                                ) : (
                                    <CheckedBox width={16} height={16} style={styles.icon} />
                                )}
                            </Btn>
                            <Btn onPress={() => setTicariShowModal(true)} style={{ flex: 1 }}>
                                <BtText type="contentTitle">
                                    Tarafıma pazarlama amaçlı
                                    <Text style={{ textDecorationLine: 'underline' }}> ticari elektronik ileti</Text> gönderilmesini
                                    onaylıyorum.
                                </BtText>
                            </Btn>
                        </View>
                        <Modal animationType="fade" transparent visible={showTicariModal}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <ScrollView style={styles.modalViewInner}>
                                        <TicariElektronikContent></TicariElektronikContent>
                                    </ScrollView>
                                    <BtButton style={styles.applyBtn} onPress={closeTicariModal} label="ONAYLIYORUM" />
                                </View>
                            </View>
                        </Modal>
                        <View style={{ marginTop: 20 }}>
                            <Btn onPress={() => setUyelikShowModal(true)}>
                                <BtText type="contentTitle">
                                    “Üye Ol” butonuna tıkladığınızda
                                    <Text style={{ textDecorationLine: 'underline' }}> Üyelik Sözleşmesini</Text> kabul etmiş
                                    sayılacaksınız.
                                </BtText>
                            </Btn>
                        </View>
                        <Modal animationType="fade" transparent visible={showUyelikModal}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <ScrollView style={styles.modalViewInner}>
                                        <UyelikSozlesmesiContent></UyelikSozlesmesiContent>
                                    </ScrollView>
                                    <BtButton style={styles.applyBtn} onPress={closeUyelikModal} label="ONAYLIYORUM" />
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <BtText color="error">{state.apiErrors.general}</BtText>
                    <BtButton label="ÜYE OL" variant="orange" onPress={register} />

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

export default RegisterFormPage;

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
        paddingBottom: 20,
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
    icon: {
        marginRight: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        marginHorizontal: 20,
        marginVertical: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        height: '60%',
    },
    modalViewInner: {
        padding: 0,
        // backgroundColor: '#fff',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
});
