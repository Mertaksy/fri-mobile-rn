import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartPage from '../pages/cart/CartPage';
import CustomHeader from './CustomHeader';
import RecipesListPage from '../pages/recipes/RecipesListPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';
import ListDetailsPage from '../pages/lists/ListDetailsPage';
import TipsPage from '../pages/tips/TipsPage';
import ArticlesPage from '../pages/articles/ArticlesPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';

const CartStack = createStackNavigator();

const CartScreenStack = ({ navigation }) => {
    return (
        <CartStack.Navigator initialRouteName="CartPage">
            <CartStack.Screen
                name="CartPage"
                component={CartPage}
                options={{
                    title: '', //Set Header Title
                    header: () => <CustomHeader isRoot title="Sepet" navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="RecipesListPage"
                component={RecipesListPage}
                options={{
                    header: () => <CustomHeader title="Tarifler" navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="ListDetailsPage"
                component={ListDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="TipsPage"
                component={TipsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="ArticlesPage"
                component={ArticlesPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <CartStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    header: () => <CustomHeader navigation={navigation} />,
                }}
            />
        </CartStack.Navigator>
    );
};
export default CartScreenStack;
