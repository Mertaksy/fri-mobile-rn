import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import VideoSvg from '../../assets/icons/video.svg';

const VideoCard = (props) => {
    const { style, item, navigation, hasVideo } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    let marginStyle = { marginTop: 0 };
    const onPressed = () => {
        // const jumpToAction = DrawerActions.jumpTo('RecipesScreenStack',{
        //     slug: recipe.slug,
        // });
        // navigation.dispatch(jumpToAction);
        navigation.navigate('FreeTextDetailsPage', {
            slug: item.slug,
        });
    };
    return (
        <Btn onPress={onPressed} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style, marginStyle]}>
                <ImageBackground
                    imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    source={{ uri: item.mobile_image_url }}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <View style={styles.insideImage}>{<VideoSvg width={35} height={35} style={{ margin: 0 }} />}</View>
                </ImageBackground>
                <View style={styles.cardMainText}>
                    <BtText type="title6" color="green" style={styles.cardTopText}>
                        {item.title}
                    </BtText>
                </View>
            </View>
        </Btn>
    );
};

export default VideoCard;
const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
        flex: 0.5,
        marginBottom: 10,
    },
    bgImage: {
        height: 150,
        //flex: 1,

        //borderTopLeftRadius: 50,
        //borderTopRightRadius: 50,
        borderRadius: 30,
    },
    cardMain: {
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E5E5E5',
        minHeight: 230,
        //flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    cardMainText: {
        padding: 10,
        paddingBottom: 0,
        justifyContent: 'space-between',
        flex: 1,
    },
    insideImage: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    cardBottomMainText: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    insideCardText: {
        flexDirection: 'row',
        alignContent: 'center', // icon ile text i orta hizaya getirmesi lazım
        // justifyContent: 'space-between',
        // flex: 1, //bunu vermeden justifyContent yemiyor
    },
    cardTopText: {
        marginBottom: 25,
        alignContent: 'center',
    },
    insideCardBottomButtonText: {
        fontSize: 10,
        lineHeight: 14,
    },
});
