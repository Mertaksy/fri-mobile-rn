// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { BtText, BtButton, BtLinkButton, BtInput, BtCheckButton } from '../../components';
import { useContext, useEffect, useReducer } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native-web';

const modalBgImage = require('../../../assets/images/modal-bg.png');

const initialState = {
    tariftercihleri: [],
    availableOptions: [],
    expoPushToken: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const SelectRecipesPage = ({ navigation, shouldRedirectToCart }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;
    // Global context actions
    const {} = useContext(AppContext);
    const userData = AppState.userData || {};
    useEffect(() => {
        const availableOptions = AppState.userAvailablePreferences.filter((option) => option.key === 'tariftercihleri');
        setState({ availableOptions });
        registerForPushNotificationsAsync();
    }, []);

    const savePushToken = async (token) => {
        try {
            setState({ apiErrors: {} });
            const response = await UserAPI.updateUserSettings({
                device_token: token,
                device_os: Platform.OS,
                email: userData.email,
            });
        } catch (e) {
            const responseParsed = ApiErrors(e);
        }
    };

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log({ token });
            await savePushToken(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    const onSelectOption = (value) => {
        let preferences = [];
        if (value) {
            if (state.tariftercihleri.includes(value)) {
                preferences = state.tariftercihleri.filter((option) => option !== value);
            } else {
                preferences = [...state.tariftercihleri, value];
            }
        }
        setState({ ...state, tariftercihleri: preferences });
    };

    const goPage = async () => {
        navigation.navigate('SelectSkillLevelPage', { tariftercihleri: state.tariftercihleri });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <View style={styles.innerContainer}>
                    <BtText type="title1" style={{ marginBottom: 9 }} color="green">
                        Seni Biraz Tanıyalım
                    </BtText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BtText>Özel bir diyet uyguluyor musun?</BtText>
                        <BtText>1/3</BtText>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 30 }}>
                        {state.availableOptions.map((option, key) => {
                            return (
                                <BtCheckButton
                                    icon={option.value}
                                    variant="green"
                                    key={key}
                                    label={option.title}
                                    selected={state.tariftercihleri.includes(option.value)}
                                    onPress={() => onSelectOption(option.value)}
                                />
                            );
                        })}
                        <BtCheckButton
                            variant="green"
                            label="Uygulamıyorum"
                            selected={state.tariftercihleri.length === 0}
                            onPress={() => onSelectOption(null)}
                        />
                    </View>
                    <BtButton label="DEVAM ET" variant="orange" onPress={goPage} btnStyle={{ width: '50%', alignSelf: 'center' }} />
                </View>
                <BtLinkButton
                    style={{ marginBottom: 50 }}
                    type="linkButtonSmall"
                    label="Kişiselleştirmeyi atla"
                    onPress={() => {
                        if (shouldRedirectToCart) {
                            navigation.navigate('Cart');
                        }
                        navigation.navigate('TabBarStackNavigator');
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SelectRecipesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
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
