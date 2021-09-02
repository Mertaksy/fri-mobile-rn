import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Image, AsyncStorage, Dimensions, PixelRatio } from 'react-native';
import { BtText, BtButton, BtLinkButton } from '../../components';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useContext, useEffect, useState } from 'react';
import { Context as AppContext } from '../../context/AppContext';

import IntroFirstImage from '../../../assets/images/intro_first.png';
import IntroSecondImage from '../../../assets/images/intro_second.png';
import IntroNextArrowSvg from '../../../assets/icons/intro_next_arrow.svg';

const slides = [
    {
        key: 'one',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: IntroFirstImage,
        backgroundColor: '#fff',
    },
    {
        key: 'two',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: IntroSecondImage,
        backgroundColor: '#fff',
    },
];

const IntroPage = ({ navigation }) => {
    const AppState = useContext(AppContext).state;
    const { setHideIntro } = useContext(AppContext);
    const [hideDots, setHideDots] = useState(false);
    useEffect(() => {
        AsyncStorage.setItem('hideIntro', 'true');
        return () => {
            setHideIntro(true);
        };
    }, []);
    const _renderItem = (props) => {
        const { item, index } = props;
        if (index === 0) {
            return (
                <ImageBackground style={styles.slideBg} resizeMode="cover" source={item.image}>
                    <View style={styles.slideInner}>
                        <View style={styles.innerContainer}>
                            <BtText type="title1" color="green" style={{ marginBottom: 15, marginTop: 30, textAlign: 'center' }}>
                                Birbirinden özel lezzetler
                            </BtText>
                            <BtText type="gilroy16M" style={{ marginBottom: 100, textAlign: 'center' }}>
                                Tamamı denenmiş binden fazla tarif ve sana özel Bizim Tarifler deneyimi için üye ol yada giriş yap.
                            </BtText>
                        </View>
                    </View>
                </ImageBackground>
            );
        }
        return (
            <ImageBackground style={styles.slideBg} resizeMode="cover" source={IntroSecondImage}>
                <View style={styles.slideInner}>
                    <View style={styles.innerContainer}>
                        <View style={styles.innerContainerTop}>
                            <BtText type="title1" color="green" style={{ marginBottom: 15, textAlign: 'center' }}>
                                Bütün tarifler anında kapına gelsin
                            </BtText>
                            <BtText type="gilroy16M" style={{ marginBottom: 15, textAlign: 'center' }}>
                                Tamamı denenmiş binden fazla tarif ve sana özel Bizim Tarifler deneyimi için üye ol yada giriş yap.
                            </BtText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <BtButton
                                btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                label="GİRİŞ YAP"
                                variant="orange"
                                onPress={() => navigation.navigate('LoginPage')}
                            />
                            <BtButton
                                btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                label="ÜYE OL"
                                onPress={() => navigation.navigate('RegisterPage')}
                            />
                        </View>
                    </View>
                    <BtLinkButton
                        type="linkButtonSmall"
                        label="Üye Olmadan Devam Et"
                        style={{ marginTop: 10 }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </ImageBackground>
        );
    };
    const _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <IntroNextArrowSvg width={50} height={50} />
            </View>
        );
    };

    const onSlideChange = (index) => {
        if (index === 1) {
            setHideDots(true);
        } else {
            setHideDots(false);
        }
    };
    return (
        <View style={styles.container}>
            {AppState.hideIntro ? (
                <ImageBackground style={styles.slideBg} resizeMode="cover" source={IntroSecondImage}>
                    <View style={styles.slideInner}>
                        <View style={styles.innerContainer}>
                            <View style={styles.innerContainerTop}>
                                <BtText type="title1" color="green" style={{ marginBottom: 15, textAlign: 'center' }}>
                                    Bütün tarifler anında kapına gelsin
                                </BtText>
                                <BtText type="gilroy16M" style={{ marginBottom: 24, textAlign: 'center' }}>
                                    Tamamı denenmiş binden fazla tarif ve sana özel Bizim Tarifler deneyimi için üye ol yada giriş yap.
                                </BtText>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <BtButton
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                    label="GİRİŞ YAP"
                                    variant="orange"
                                    onPress={() => navigation.navigate('LoginPage')}
                                />
                                <BtButton
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                    label="ÜYE OL"
                                    onPress={() => navigation.navigate('RegisterPage')}
                                />
                            </View>
                        </View>
                        <BtLinkButton
                            type="linkButtonSmall"
                            label="Üye Olmadan Devam Et"
                            style={{ marginTop: 20 }}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </ImageBackground>
            ) : (
                <AppIntroSlider
                    data={slides}
                    renderNextButton={_renderNextButton}
                    renderDoneButton={() => null}
                    renderItem={_renderItem}
                    onSlideChange={onSlideChange}
                    dotStyle={{ backgroundColor: hideDots ? 'transparent' : 'rgba(86, 105, 106, 0.5)' }}
                    activeDotStyle={{ backgroundColor: hideDots ? 'transparent' : 'rgb(115, 179, 179)' }}
                />
            )}
        </View>
    );
};

export default IntroPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    innerContainer: {
        paddingHorizontal: 20,
    },
    innerContainerTop: {},
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    buttonCircle: {
        marginRight: 20,
        marginTop: -10,
    },
    slideBg: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    slideInner: {
        height: Dimensions.get('window').height / 2 - 30,
        marginBottom: 35,
        justifyContent: 'center',
    },
});
