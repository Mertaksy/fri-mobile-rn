import React, { useContext, useReducer } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { BtButton, BtIconButton, TopColorLine } from '../../components';
import { Context as AppContext } from '../../context/AppContext';
import { CommonActions } from '@react-navigation/native';

const initialState = {};

const reducer = (state, newState) => ({ ...state, ...newState });

const AccountIndexPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;

    // Global context actions
    const { unsetUserToken, unsetUserData } = useContext(AppContext);

    const logout = () => {
        unsetUserToken();
        unsetUserData();
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );
    };
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <BtIconButton
                    label="Profili Düzenle"
                    icon="avatar"
                    onPress={() => {
                        navigation.navigate('AccountSettingsPage');
                    }}
                />
                <BtIconButton
                    label="Bildirimler"
                    icon="notifications"
                    onPress={() => {
                        navigation.navigate('NotificationPage');
                    }}
                />
                <BtIconButton
                    label="Favorilerim"
                    icon="heart"
                    onPress={() => {
                        navigation.navigate('FavoriteListPage');
                    }}
                />
                <BtIconButton
                    label="Satın Aldığım Tarifler"
                    icon="glove"
                    onPress={() => {
                        alert('Not implemented');
                    }}
                />
                <BtIconButton
                    label="Kişiselleştirme Tercihleri"
                    icon="divide"
                    onPress={() => {
                        navigation.navigate('PersonalizationPreferencesPage');
                    }}
                />
            </View>

            <View style={styles.buttonWrapper}>
                <BtButton label="Çıkış" onPress={logout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 30,
    },
    buttonWrapper: {
        // paddingBottom: 10,
        marginTop: 30,
    },
});

export default AccountIndexPage;
