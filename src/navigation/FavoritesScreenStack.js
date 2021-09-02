import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteListPage from '../pages/favorites/FavoriteListPage';
import FavoritesPage from '../pages/favorites/FavoritesPage';
import CustomHeader from './CustomHeader';
import ArticlesPage from '../pages/articles/ArticlesPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';

const FavoritesStack = createStackNavigator();

const FavoritesScreenStack = ({ navigation }) => {
    return (
        <FavoritesStack.Navigator initialRouteName="FavoriteListPage">
            <FavoritesStack.Screen
                name="FavoriteListPage"
                component={FavoriteListPage}
                options={{
                    header: () => <CustomHeader isRoot title="Favoriler" navigation={navigation} />,
                }}
            />
            <FavoritesStack.Screen
                name="FavoritesPage"
                component={FavoritesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <FavoritesStack.Screen
                name="ArticlesPage"
                component={ArticlesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <FavoritesStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <FavoritesStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <FavoritesStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <FavoritesStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
        </FavoritesStack.Navigator>
    );
};
export default FavoritesScreenStack;
