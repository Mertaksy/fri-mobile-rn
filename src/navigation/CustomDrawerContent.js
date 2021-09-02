import React, { useReducer, useState, useContext, useLayoutEffect } from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Constants,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

const modalBgImage = require('../../assets/images/modal-bg.png');
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BtText, BtLinkButton } from '../components';
import { WebView } from 'react-native-webview';

const CustomDrawerContent = (props) => {
    const options = {
        activeBackgroundColor: '#ccdede',
    };
    return (
        <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
            <DrawerContentScrollView {...props} style={styles.container}>
                <View style={styles.innerContainer}>
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Anasayfa
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 0}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Tarifler
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 1}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('RecipesScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Listeler
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 2}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('ListsScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Keşfet
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 3}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('DiscoverScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Mutfaktan İpuçları
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 4}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('TipsScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Video İçerikler
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 5}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('VideoContentScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Köşe Yazıları
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 6}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('ArticlesScreenStack')}
                    />
                    <DrawerItem
                        label={() => (
                            <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                                Sözlük
                            </BtText>
                        )}
                        {...options}
                        focused={props.state.index === 7}
                        style={styles.mainTitle}
                        onPress={() => props.navigation.navigate('DictionaryScreenStack')}
                    />
                </View>
                <WebView
                    style={styles.videoContainer}
                    javaScriptEnabled={true}
                    source={{
                        uri: 'https://www.youtube.com/embed/ntDuQMAjy48?rel=0&autoplay=0&showinfo=0&controls=0',
                    }}
                />
            </DrawerContentScrollView>
        </ImageBackground>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    videoContainer: {
        marginTop: 30,
        marginBottom: 30,
        height: 130,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    innerContainer: {
        paddingTop: 50,

    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    mainTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccdede',
    },
    mainTitleLabel: {
        paddingVertical: 2,
    },
    subTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccdede',
    },
    subTitleLabel: {
        paddingLeft: 30,
        paddingVertical: 2,
    },
});
