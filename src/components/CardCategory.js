import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Button, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import MenuSvg from '../../assets/icons/menu.svg';

const CardCategory = (props) => {
    const { onPress, style, btnStyle, data } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    return (
        <Btn {...{ onPress }} style={[styles.btnStyle, btnStyle]}>
            <View style={[styles.cardMain, style]}>
                {data.mobile_image_url !== '' && (
                    <ImageBackground
                        imageStyle={{ borderRadius: 8 }}
                        source={{ uri: data.mobile_image_url }}
                        style={styles.bgImage}
                        resizeMode="cover"
                    >
                        <View style={styles.insideImage}>
                            <BtText type="title5" style={styles.insideCardText}>
                                {data.name}
                            </BtText>
                        </View>
                    </ImageBackground>
                )}
            </View>
        </Btn>
    );
};

export default CardCategory;

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
        flex: 1 / 3,
    },
    bgImage: {
        height: 60,
        flex: 1,
    },
    cardMain: {
        marginHorizontal: 5,
    },
    insideImage: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 5,
    },
    insideCardText: {
        color: '#fff',
        // backgroundColor: 'red',
        textAlign: 'center',
    },
});
