import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverPage from '../pages/discover/DiscoverPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';
import SearchResultPage from '../pages/common/SearchResultPage';

const DiscoverStack = createStackNavigator();

const DiscoverScreenStack = ({ navigation }) => {
    return (
        <DiscoverStack.Navigator
            initialRouteName="DiscoverPage"
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
            <DiscoverStack.Screen
                name="DiscoverPage"
                component={DiscoverPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Keşfet" />,
                }}
            />
            <DiscoverStack.Screen
                name="RecipeDetailsPage"
                component={RecipeDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
            <DiscoverStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
        </DiscoverStack.Navigator>
    );
};
export default DiscoverScreenStack;
