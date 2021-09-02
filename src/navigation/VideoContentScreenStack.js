import HeaderRightMenu from './HeaderRightMenu';
import ListsPage from '../pages/lists/ListsPage';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import VideoContentPage from '../pages/video-content/VideoContentPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResultPage from '../pages/common/SearchResultPage';
import FreeTextDetailsPage from '../pages/common/FreeTextDetailsPage';
import AuthorDetailsPage from '../pages/authors/AuthorDetailsPage';

const VideoContentStack = createStackNavigator();

const VideoContentScreenStack = ({ navigation }) => {
    return (
        <VideoContentStack.Navigator
            initialRouteName="VideoContentPage"
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
            <VideoContentStack.Screen
                name="VideoContentPage"
                component={VideoContentPage}
                options={{
                    title: '', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Video İçerikler" />,
                }}
            />
            <VideoContentStack.Screen
                name="FreeTextDetailsPage"
                component={FreeTextDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Video İçerikler" />,
                }}
            />
            <VideoContentStack.Screen
                name="AuthorDetailsPage"
                component={AuthorDetailsPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Video İçerikler" />,
                }}
            />
            <VideoContentStack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={{
                    title: '', //Set Header Title
                    // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => <HeaderRightMenu navigationProps={navigation} />,
                }}
            />

        </VideoContentStack.Navigator>
    );
};
export default VideoContentScreenStack;
