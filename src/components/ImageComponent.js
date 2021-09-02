import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, ImageBackground, Image } from 'react-native';

const ImageComponent = (props) => {
    const { onPress, style, data = [], keepAspectRatio = false, imageStyle = {} } = props;

    const Btn = TouchableOpacity;

    // original aspect ratio of the Image
    const [imageAspectRatio, setImageAspectRatio] = useState(1);

    useEffect(() => {
        if (data.mobile_image_url) {
            Image.getSize(data.mobile_image_url, (width, height) => {
                setImageAspectRatio(width / height);
            });
        }
    }, [data.mobile_image_url]);

    return (
        <Btn {...{ onPress }} style={[styles.btnStyle]}>
            <View style={[style, styles.cardMain]}>
                <ImageBackground
                    source={{ uri: data.mobile_image_url }}
                    style={[styles.bgImage, keepAspectRatio ? { aspectRatio: imageAspectRatio } : imageStyle]}
                ></ImageBackground>
            </View>
        </Btn>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
    },
    bgImage: {
        width: '100%',
    },
    cardMain: {
        width: '100%',
    },
    insideImage: {
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 20,
        paddingVertical: 30,
    },
    insideCardText: {
        color: '#fff',
        width: '50%',
    },
    insideCardButton: {
        backgroundColor: '#fff',
        width: 85,
        borderRadius: 5,
        textAlign: 'center',
        padding: 10,
        overflow: 'hidden',
    },
});

export default ImageComponent;
