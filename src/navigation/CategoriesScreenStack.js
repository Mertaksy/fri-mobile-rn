import HeaderRightMenu from './HeaderRightMenu';
import RecipeCategoriesPage from '../pages/categories/RecipeCategoriesPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';
import RecipesListPage from '../pages/recipes/RecipesListPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './CustomHeader';
import AuthorsPage from '../pages/authors/AuthorsPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';

const RecipesStack = createStackNavigator();

const CategoriesScreenStack = ({ navigation }) => {
    return (
        <RecipesStack.Navigator initialRouteName="RecipeCategoriesPage">
            <RecipesStack.Screen
                name="RecipeCategoriesPage"
                component={RecipeCategoriesPage}
                options={{
                    header: () => <CustomHeader isRoot title="Kategoriler" navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="RecipesListPage"
                component={RecipesListPage}
                options={{
                    header: () => <CustomHeader title="Tarifler" navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="AuthorsPage"
                component={AuthorsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <RecipesStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
        </RecipesStack.Navigator>
    );
};
export default CategoriesScreenStack;
