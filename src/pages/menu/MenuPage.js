import React, { useContext, useReducer, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { BtIconButton, BtText } from '../../components';
import { Context as AppContext } from '../../context/AppContext';
import { CommonActions } from '@react-navigation/native';
import NonAuthSvg from '../../../assets/icons/non_auth_avatar.svg';
import OrangeFlowerSvg from '../../../assets/icons/orange_flower.svg';
import GreenYellowFlowerSvg from '../../../assets/icons/green_yellow_flower.svg';
import DoubleLineSvg from '../../../assets/icons/double_line.svg';
import Theme from '../../theme';
import * as WebBrowser from 'expo-web-browser';
import * as API from '../../api/content';

const initialState = {
    videoUri: '',
    menuSponsors: [],
};

const reducer = (state, newState) => ({ ...state, ...newState });

const MenuPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;

    // Global context actions
    const { unsetUserToken, unsetUserData } = useContext(AppContext);

    const logout = () => {
        unsetUserToken();
        unsetUserData();
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'Home' }],
            }),
        );
    };

    useEffect(() => {
        const getMenuSponsors = async () => {
            try {
                const response = await API.getHamburgerMenuSponsor();
                if (response.data.success) {
                    const videoUrl = response.data.data.hamburger_menu_video;
                    const menuSponsors = response.data.data.menuItems;
                    const videoId = videoUrl.split('=')[1];
                    // using ordinary youtube link doesn't work properly
                    const videoUri = `https://www.youtube.com/embed/${videoId}?modestbranding=1&playsinline=1&showinfo=0&rel=0`;
                    setState({
                        videoUri,
                        menuSponsors,
                    });
                }
                return;
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
        };
        getMenuSponsors();
    }, []);

    const goBTWebsite = async (url) => {
        await WebBrowser.openBrowserAsync(`https://bizimtarifler.com/${url}`, {
            controlsColor: Theme.palette.green,
            toolbarColor: Theme.palette.yellow,
        });
    };

    const goToLink = async (link) => {
        await WebBrowser.openBrowserAsync(link);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.authContainer}>
                    {AppState.userData ? (
                        <View style={styles.authWrapper}>
                            <DoubleLineSvg width={64} height={33} style={styles.doubleLineSvg} />
                            <OrangeFlowerSvg width={37} height={31} style={styles.orangeFlowerSvg} />
                            <View style={styles.authWrapperTop}>
                                <NonAuthSvg width={63} height={63} />
                                <TouchableOpacity style={styles.nonAuthBtn} onPress={() => navigation.navigate('AuthScreenStack')}>
                                    <View>
                                        <BtText type="titleMenu" color="green">
                                            {AppState.userData.name}
                                        </BtText>
                                        <BtText type="inputLabel">{AppState.userData.email}</BtText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <BtIconButton
                                    label="Profilimi Düzenle"
                                    icon="avatar"
                                    onPress={() => {
                                        navigation.navigate('AccountSettingsPage');
                                    }}
                                />
                                <BtIconButton
                                    label="Bildirimler"
                                    icon="notifications"
                                    onPress={() => {
                                        navigation.navigate('NotificationPage');
                                    }}
                                />
                                <BtIconButton
                                    label="Satın Aldığım Tarifler"
                                    icon="glove"
                                    onPress={() => {
                                        navigation.navigate('CheckoutHistoryPage');
                                    }}
                                />
                                <BtIconButton
                                    label="Kişiselleştirme Tercihleri"
                                    icon="divide"
                                    onPress={() => {
                                        navigation.navigate('PersonalizationPreferencesPage');
                                    }}
                                />
                                <BtIconButton label="Çıkış Yap" icon="out" onPress={logout} />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.nonAuthWrapper}>
                            <NonAuthSvg width={63} height={63} />
                            <TouchableOpacity style={styles.nonAuthBtn} onPress={() => navigation.navigate('AuthScreenStack')}>
                                <BtText type="titleMenu" color="green">
                                    Giriş Yap / Üye Ol
                                </BtText>
                            </TouchableOpacity>
                            <DoubleLineSvg width={64} height={33} style={styles.doubleLineSvg} />
                            <OrangeFlowerSvg width={37} height={31} style={styles.orangeFlowerSvg} />
                        </View>
                    )}
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListsPage')}>
                        <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                            Listeler
                        </BtText>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('DiscoverPage')}>
                        <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                            Keşfet
                        </BtText>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('TipsPage')}>
                        <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                            Mutfaktan İpuçları
                        </BtText>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ArticlesPage')}>
                        <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                            Köşe Yazıları
                        </BtText>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('DictionaryPage')}>
                        <BtText style={styles.mainTitleLabel} type="titleMenu" color="green">
                            Sözlük
                        </BtText>
                    </TouchableOpacity>
                </View>
                {state.menuSponsors
                    ? state.menuSponsors.map((sponsorObj) => {
                          return (
                              <View style={styles.menuContainer}>
                                  <TouchableOpacity onPress={() => goToLink(sponsorObj.target)}>
                                      <BtText style={styles.mainTitleLabel} type="titleMenu" color="pink">
                                          {sponsorObj.title}
                                      </BtText>
                                  </TouchableOpacity>
                              </View>
                          );
                      })
                    : null}
            </View>
            <View style={styles.menuFooterWrapper}>
                <TouchableOpacity onPress={() => goBTWebsite('hakkimizda')} style={styles.footerLink}>
                    <BtText type="gilroy14SemiBold" color="lightBlue">
                        Hakkımızda
                    </BtText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goBTWebsite('yasal-metinler')} style={styles.footerLink}>
                    <BtText type="gilroy14SemiBold" color="lightBlue">
                        Yasal Metinler
                    </BtText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goBTWebsite('iletisim')} style={styles.footerLink}>
                    <BtText type="gilroy14SemiBold" color="lightBlue">
                        İletişim
                    </BtText>
                </TouchableOpacity>
                {state.videoUri ? (
                    <View style={styles.youtubeContainer}>
                        <View style={styles.videoWrapper}>
                            <WebView
                                style={styles.video}
                                javaScriptEnabled={true}
                                source={{
                                    uri: state.videoUri,
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => goToLink('https://www.youtube.com/channel/UCYI2hNQlo9kd5yKm0kIPLPg')}>
                            <BtText type="title4" style={styles.youtubeLink}>
                                Bizim Tarifler Youtube
                            </BtText>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
            <GreenYellowFlowerSvg width={400} height={500} style={styles.greenYellowFlowerSvg} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: { flex: 1, backgroundColor: '#fbfbfb' },
    video: {
        alignSelf: 'center',
        width: '100%',
        aspectRatio: 1.6,
        borderRadius: 8,
        flex: 1,
    },
    videoWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        flex: 1,
    },
    youtubeLink: {
        marginTop: 20,
        paddingLeft: 0,
        color: Theme.palette.pink,
    },
    youtubeContainer: {
        borderTopWidth: 1,
        paddingTop: 30,
        marginTop: 10,
        borderTopColor: Theme.palette.borderColor,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    authContainer: {
        backgroundColor: Theme.palette.lightestBlue,
        borderRadius: 8,
    },
    authWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    authWrapperTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nonAuthWrapper: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
    },
    doubleLineSvg: {
        position: 'absolute',
        top: 0,
        right: '30%',
    },
    nonAuthBtn: {
        marginLeft: 15,
    },
    orangeFlowerSvg: {
        position: 'absolute',
        right: '15%',
        bottom: -17,
    },
    menuContainer: {
        marginTop: 30,
    },
    buttonWrapper: {
        marginTop: 30,
    },
    menuFooterWrapper: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Theme.palette.borderColor,
        margin: 20,
        paddingVertical: 30,
        minHeight: 226,
        zIndex: 999,
    },
    greenYellowFlowerSvg: {
        position: 'absolute',
        top: '80%',
        left: '40%',
        zIndex: 1,
    },
    footerLink: {
        marginBottom: 20,
    },
});

export default MenuPage;
