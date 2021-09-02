import HeaderRightMenu from './HeaderRightMenu';
import ArticlesPage from '../pages/articles/ArticlesPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const ArticlesStack = createStackNavigator();

const ArticlesScreenStack = ({ navigation }) => {
    return (
        <ArticlesStack.Navigator
            initialRouteName="ArticlesPage"
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
            <ArticlesStack.Screen
                name="ArticlesPage"
                component={ArticlesPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Köşe Yazıları" />,
                }}
            />
            <ArticlesStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
            <ArticlesStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />
        </ArticlesStack.Navigator>
    );
};

export default ArticlesScreenStack;