// // React Native Navigation Drawer – Example using Latest Navigation Version //
// // https://aboutreact.com/react-native-navigation-drawer //
// import 'react-native-gesture-handler';
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import AuthScreenStack from './AuthScreenStack';
// import HomeScreenStack from './HomeScreenStack';
// import CategoriesScreenStack from './CategoriesScreenStack';
// import ArticlesScreenStack from './ArticlesScreenStack';
// import AccountScreenStack from './AccountScreenStack';
// import CartScreenStack from './CartScreenStack';
// import ListsScreenStack from './ListsScreenStack';
// import CustomDrawerContent from './CustomDrawerContent';
// import DictionaryScreenStack from './DictionaryScreenStack';
// import DiscoverScreenStack from './DiscoverScreenStack';
// import TipsScreenStack from './TipsScreenStack';
// import VideoContentScreenStack from './VideoContentScreenStack';
// import AuthorsScreenStack from './AuthorsScreenStack';
//
// // Application navigations
// const RootStack = createStackNavigator();
// const Drawer = createDrawerNavigator();
//
// const DrawerNavigationStack = ({ navigation }) => {
//     return (
//         <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//             <Drawer.Screen name="HomeScreenStack" options={{ drawerLabel: 'Anasayfa' }} component={HomeScreenStack} />
//             <Drawer.Screen name="RecipesScreenStack" options={{ drawerLabel: 'Tarifler' }} component={CategoriesScreenStack} />
//             <Drawer.Screen name="ListsScreenStack" options={{ drawerLabel: 'Listeler' }} component={ListsScreenStack} />
//             <Drawer.Screen name="DiscoverScreenStack" options={{ drawerLabel: 'Keşfet' }} component={DiscoverScreenStack} />
//             <Drawer.Screen name="TipsScreenStack" options={{ drawerLabel: 'Mutfaktan İpuçları' }} component={TipsScreenStack} />
//             <Drawer.Screen name="VideoContentScreenStack" options={{ drawerLabel: 'Video İçerikler' }} component={VideoContentScreenStack} />
//             <Drawer.Screen name="ArticlesScreenStack" options={{ drawerLabel: 'Köşe Yazıları' }} component={ArticlesScreenStack} />
//             <Drawer.Screen name="DictionaryScreenStack" options={{ drawerLabel: 'Sözük' }} component={DictionaryScreenStack} />
//             <Drawer.Screen name="AccountScreenStack" options={{ drawerLabel: 'Hesabım' }} component={AccountScreenStack} />
//             <Drawer.Screen name="CartScreenStack" options={{ drawerLabel: 'Sepet' }} component={CartScreenStack} />
//             <Drawer.Screen name="AuthorsScreenStack" options={{ drawerLabel: 'Yazarlar' }} component={AuthorsScreenStack} />
//         </Drawer.Navigator>
//     );
// };
//
// const RootScreenStack = () => {
//     return (
//         <NavigationContainer>
//             <RootStack.Navigator mode="modal">
//                 <RootStack.Screen
//                     name="DrawerNavigationStack"
//                     component={DrawerNavigationStack}
//                     options={{
//                         headerShown: false, //Set Header Title
//                     }}
//                 />
//                 <RootStack.Screen
//                     name="AuthScreenStack"
//                     component={AuthScreenStack}
//                     options={{
//                         headerShown: false,
//                         title: 'AuthScreenStack Page', //Set Header Title
//                     }}
//                 />
//             </RootStack.Navigator>
//         </NavigationContainer>
//     );
// };
//
// export default RootScreenStack;
