import * as React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreenStack from './HomeScreenStack';
import FavoritesScreenStack from './FavoritesScreenStack';
import CategoriesScreenStack from './CategoriesScreenStack';
import CartScreenStack from './CartScreenStack';
import MenuScreenStack from './MenuScreenStack';
import AuthScreenStack from './AuthScreenStack';

import HomeSvg from '../../assets/icons/tabbar/home.svg';
import HomeFocusedSvg from '../../assets/icons/tabbar/home_focused.svg';
import HeartSvg from '../../assets/icons/tabbar/heart.svg';
import HeartFocusedSvg from '../../assets/icons/tabbar/heart_focused.svg';
import CategorySvg from '../../assets/icons/tabbar/category.svg';
import CategoryFocusedSvg from '../../assets/icons/tabbar/category_focused.svg';
import BagSvg from '../../assets/icons/tabbar/bag.svg';
import BagFocusedSvg from '../../assets/icons/tabbar/bag_focused.svg';
import MenuSvg from '../../assets/icons/tabbar/menu.svg';
import MenuFocusedSvg from '../../assets/icons/tabbar/menu_focused.svg';
import { useContext, useEffect } from 'react';
import { Context as AppContext } from '../context/AppContext';

const getIcon = (name) => {
    switch (name) {
        case 'home':
            return <HomeSvg style={styles.icon} />;
        case 'home-focused':
            return <HomeFocusedSvg style={styles.icon} />;
        case 'heart':
            return <HeartSvg style={styles.icon} />;
        case 'heart-focused':
            return <HeartFocusedSvg style={styles.icon} />;
        case 'bag':
            return <BagSvg style={styles.icon} />;
        case 'bag-focused':
            return <BagFocusedSvg style={styles.icon} />;
        case 'category':
            return <CategorySvg style={styles.icon} />;
        case 'category-focused':
            return <CategoryFocusedSvg style={styles.icon} />;
        case 'menu':
            return <MenuSvg style={styles.icon} />;
        case 'menu-focused':
            return <MenuFocusedSvg style={styles.icon} />;
        default:
            return null;
    }
};
const TabBarStack = createBottomTabNavigator();
const TabBarStackNavigator = () => {
    const AppState = useContext(AppContext).state;
    const { setHideIntro } = useContext(AppContext);
    const [lastRoute, setLastRoute] = React.useState('Home');

    const shouldTabRefresh = (curRoute) => {
        if (curRoute !== lastRoute) {
            setLastRoute(curRoute);
            return false;
        }
        return true;
    };

    return (
        <TabBarStack.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-focused' : 'home';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart-focused' : 'heart';
                    } else if (route.name === 'Categories') {
                        iconName = focused ? 'category-focused' : 'category';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'bag-focused' : 'bag';
                    } else if (route.name === 'Menu') {
                        iconName = focused ? 'menu-focused' : 'menu';
                    }

                    // You can return any component that you like here!
                    return getIcon(iconName);
                },
            })}
            tabBarOptions={{
                showLabel: true,
                activeTintColor: 'rgba(6,69,60,1)',
                inactiveTintColor: 'rgba(6,69,60,0.3)',
                labelStyle: {
                    fontFamily: 'gilroy-semi-bold',
                },
                tabStyle: { borderTopWidth: 0 },
                style: { borderTopWidth: 0 },
            }}
        >
            <TabBarStack.Screen
                name="Home"
                options={{ tabBarLabel: 'Anasayfa' }}
                component={HomeScreenStack}
                listeners={({ navigation, route }) => ({
                    focus: async () => {
                        const hideIntro = await AsyncStorage.getItem('hideIntro');
                        // if user not logged in then show auth screen
                        if (!hideIntro) {
                            navigation.navigate('AuthScreenStack');
                        } else {
                            setHideIntro(true);
                        }
                    },
                    // disabled because double tap refresh is not desired. It might be requested in future
                    // tabPress: (e) => {
                    //     if (shouldTabRefresh(route.name)) {
                    //         e.preventDefault();
                    //         navigation.push('HomePage');
                    //     }
                    // },
                })}
            />
            <TabBarStack.Screen
                name="Favorites"
                options={{ tabBarLabel: 'Favorilerim' }}
                component={FavoritesScreenStack}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        setLastRoute(route.name);
                        // if user not logged in then show auth screen
                        if (!AppState.userData) {
                            // Prevent default action
                            e.preventDefault();

                            // Do something with the `navigation` object
                            navigation.navigate('AuthScreenStack');
                        }
                    },
                })}
            />
            <TabBarStack.Screen name="Categories" options={{ tabBarLabel: 'Kategoriler' }} component={CategoriesScreenStack} />
            <TabBarStack.Screen
                name="Cart"
                options={{ tabBarLabel: 'Sepetim' }}
                component={CartScreenStack}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        setLastRoute(route.name);
                        // if user not logged in then show auth screen
                        if (!AppState.userData) {
                            // Prevent default action
                            e.preventDefault();

                            // Do something with the `navigation` object
                            navigation.navigate('AuthScreenStack');
                        }
                    },
                })}
            />
            <TabBarStack.Screen
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        setLastRoute(route.name);
                    },
                })}
                name="Menu"
                options={{ tabBarLabel: 'Menü' }}
                component={MenuScreenStack}
            />
        </TabBarStack.Navigator>
    );
};

const RootStack = createStackNavigator();
const RootStackNavigator = (props) => {
    console.log(props);
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal" initialRouteName="TabBarStackNavigator">
                <RootStack.Screen
                    name="TabBarStackNavigator"
                    component={TabBarStackNavigator}
                    options={{
                        headerShown: false, //Set Header Title
                    }}
                />
                <RootStack.Screen
                    name="AuthScreenStack"
                    component={AuthScreenStack}
                    options={{
                        headerShown: false,
                        title: 'AuthScreenStack Page', //Set Header Title
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackNavigator;

const styles = StyleSheet.create({
    icon: {},
});
