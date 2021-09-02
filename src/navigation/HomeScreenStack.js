import HomePage from '../pages/home/HomePage';
import CustomHeader from './CustomHeader';
import HeaderRightMenu from './HeaderRightMenu';
import RecipesListPage from '../pages/recipes/RecipesListPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';
import TipsPage from '../pages/tips/TipsPage';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import ListDetailsPage from '../pages/lists/ListDetailsPage';
import ArticlesPage from '../pages/articles/ArticlesPage';

const HomeStack = createStackNavigator();

const HomeScreenStack = ({ navigation }) => {
    return (
        <HomeStack.Navigator initialRouteName="HomePage">
            <HomeStack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    header: () => <CustomHeader isRoot isHomeScreen navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="RecipesListPage"
                component={RecipesListPage}
                options={{
                    header: () => <CustomHeader title="Tarifler" navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="ListDetailsPage"
                component={ListDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="TipsPage"
                component={TipsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="ArticlesPage"
                component={ArticlesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
            <HomeStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation}/>,
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeScreenStack;
