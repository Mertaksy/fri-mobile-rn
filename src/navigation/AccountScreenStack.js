import AccountIndexPage from '../pages/account/AccountIndexPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import HeaderRightMenu from './HeaderRightMenu';
import AccountSettingsPage from '../pages/account/AccountSettingsPage';
import NotificationPage from '../pages/account/NotificationPage';
import FavoriteListPage from '../pages/favorites/FavoriteListPage';
import FavoritesPage from '../pages/favorites/FavoritesPage';
import PersonalizationPreferencesPage from '../pages/account/PersonalizationPreferencesPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const AccountStack = createStackNavigator();

const AccountScreenStack = ({ navigation }) => {
    return (
        <AccountStack.Navigator initialRouteName="AccountIndexPage">
            <AccountStack.Screen
                name="AccountIndexPage"
                component={AccountIndexPage}
                options={{
                    title: '',
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Hesabım" />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
            <AccountStack.Screen
                name="AccountSettingsPage"
                component={AccountSettingsPage}
                options={{
                    title: 'Profili Düzenle', //Set Header Title
                }}
            />
            <AccountStack.Screen
                name="NotificationPage"
                component={NotificationPage}
                options={{
                    title: 'Bildirimler', //Set Header Title
                }}
            />
            <AccountStack.Screen
                name="FavoriteListPage"
                component={FavoriteListPage}
                options={{
                    title: 'Favorileri Listelerim', //Set Header Title
                }}
            />
            <AccountStack.Screen
                name="FavoritesPage"
                component={FavoritesPage}
                options={{
                    title: 'Favorilerim', //Set Header Title
                }}
            />
            <AccountStack.Screen
                name="PersonalizationPreferencesPage"
                component={PersonalizationPreferencesPage}
                options={{
                    title: 'Kişiselleştirme',
                }}
            />
        </AccountStack.Navigator>
    );
};

export default AccountScreenStack;
