import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import AuthorsPage from '../pages/authors/AuthorsPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResultPage from '../pages/common/SearchResultPage';
import RecipeDetailsPage from '../pages/recipes/RecipeDetailsPage';

const AuthorsStack = createStackNavigator();

const AuthorsScreenStack = ({ navigation }) => {
    return (
        <AuthorsStack.Navigator
            initialRouteName="AuthorsPage"
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
            <AuthorsStack.Screen
                name="AuthorsPage"
                component={AuthorsPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Yazarlar" />,
                }}
            />
            <AuthorsStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Mutfaktan İpuçları" />,
                }}
            />
            <AuthorsStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />

        </AuthorsStack.Navigator>
    );
};
export default AuthorsScreenStack;
