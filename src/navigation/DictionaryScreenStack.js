import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import DictionaryPage from '../pages/dictionary/DictionaryPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResultPage from '../pages/common/SearchResultPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';

const DictionaryStack = createStackNavigator();

const DictionaryScreenStack = ({ navigation }) => {
    return (
        <DictionaryStack.Navigator
            initialRouteName="DictionaryPage"
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
            <DictionaryStack.Screen
                name="DictionaryPage"
                component={DictionaryPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Sözlük" />,
                }}
            />
            <DictionaryStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
            <DictionaryStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
        </DictionaryStack.Navigator>
    );
};
export default DictionaryScreenStack;
