import HeaderRightMenu from './HeaderRightMenu';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './CustomHeader';

import MenuPage from '../pages/menu/MenuPage';
import ListsPage from '../pages/lists/ListsPage';
import ListDetailsPage from '../pages/lists/ListDetailsPage';
import DiscoverPage from '../pages/discover/DiscoverPage';
import TipsPage from '../pages/tips/TipsPage';
import ArticlesPage from '../pages/articles/ArticlesPage';
import DictionaryPage from '../pages/dictionary/DictionaryPage';
import AuthorsPage from '../pages/authors/AuthorsPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';
import AccountSettingsPage from '../pages/account/AccountSettingsPage';
import NotificationPage from '../pages/account/NotificationPage';
import PersonalizationPreferencesPage from '../pages/account/PersonalizationPreferencesPage';
import CheckoutHistoryPage from '../pages/account/CheckoutHistoryPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';
import RecipesListPage from '../pages/recipes/RecipesListPage';

const MenuStack = createStackNavigator();

const MenuScreenStack = ({ navigation }) => {
    return (
        <MenuStack.Navigator initialRouteName="MenuPage">
            <MenuStack.Screen
                name="MenuPage"
                component={MenuPage}
                options={{
                    header: () => <CustomHeader isRoot title="Menü" navigation={navigation} />,
                }}
            />
            <MenuStack.Screen
                name="ListsPage"
                component={ListsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}  title="Listeler"/>,
                }}
            />
            <MenuStack.Screen
                name="ListDetailsPage"
                component={ListDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <MenuStack.Screen
                name="DiscoverPage"
                component={DiscoverPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Keşfet"/>,
                }}
            />
            <MenuStack.Screen
                name="TipsPage"
                component={TipsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Mutfaktan İpuçları"/>,
                }}
            />
            <MenuStack.Screen
                name="ArticlesPage"
                component={ArticlesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}  title="Köşe Yazıları"/>,
                }}
            />
            <MenuStack.Screen
                name="DictionaryPage"
                component={DictionaryPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}  title="Sözlük"/>,
                }}
            />
            <MenuStack.Screen
                name="AuthorsPage"
                component={AuthorsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <MenuStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <MenuStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <MenuStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <MenuStack.Screen
                name="AccountSettingsPage"
                component={AccountSettingsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Profilimi Düzenle" />,
                }}
            />
            <MenuStack.Screen
                name="NotificationPage"
                component={NotificationPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Bildirimler" />,
                }}
            />
            <MenuStack.Screen
                name="PersonalizationPreferencesPage"
                component={PersonalizationPreferencesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Kişiseleştirme Tercihleri" />,
                }}
            />
            <MenuStack.Screen
                name="CheckoutHistoryPage"
                component={CheckoutHistoryPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Satın Aldığım Tarifler" />,
                }}
            />
            <MenuStack.Screen
                name="RecipesListPage"
                component={RecipesListPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <MenuStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
        </MenuStack.Navigator>
    );
};
export default MenuScreenStack;
