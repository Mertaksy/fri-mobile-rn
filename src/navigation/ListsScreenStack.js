import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import ListDetailsPage from '../pages/lists/ListDetailsPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResultPage from '../pages/common/SearchResultPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';

const ListsStack = createStackNavigator();

const ListsScreenStack = ({ navigation }) => {
    return (
        <ListsStack.Navigator
            initialRouteName="ListsPage"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff', //Set Header color,
                },
                headerTintColor: '#064545', //Set Header text color
                headerTitleStyle: {
                    fontFamily: 'recoleta-semi-bold',
                },
                headerBackTitleVisible: false,
                headerBackTitleStyle: {
                    paddingLeft: 10,
                },
                headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
            }}
        >
            <ListsStack.Screen
                name="ListsPage"
                component={ListsPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Listeler" />,
                }}
            />
            <ListsStack.Screen
                name="ListDetailsPage"
                component={ListDetailsPage}
                options={{
                    title: '', //Set Header Title
                }}
            />
            <ListsStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
            <ListsStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
        </ListsStack.Navigator>
    );
};
export default ListsScreenStack;
