import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import TipsPage from '../pages/tips/TipsPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResultPage from '../pages/common/SearchResultPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';

const TipsStack = createStackNavigator();

const TipsScreenStack = ({ navigation }) => {
    return (
        <TipsStack.Navigator
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
            <TipsStack.Screen
                name="TipsPage"
                component={TipsPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Mutfaktan İpuçları" />,
                }}
            />
            <TipsStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />

        </TipsStack.Navigator>
    );
};
export default TipsScreenStack;
