import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import BtText from './BtText';
import HTML from 'react-native-render-html';
import theme from '../theme';

const ListSlider = (props) => {
    const { style, data, navigation } = props;

    const goDetails = () => {
        navigation.navigate('ListDetailsPage', {
            slug: data.slug,
        });
    };
    return (
        <TouchableOpacity onPress={goDetails} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <ImageBackground
                    imageStyle={{ borderRadius: 8 }}
                    source={{ uri: data.mobile_image_url }}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <View style={styles.insideImage}>
                        <HTML
                            customWrapper={(content) => <View style={styles.insideCardTextWrapper}>{content}</View>}
                            source={{ html: data.title }}
                            baseFontStyle={styles.insideCardText}
                        />
                        <BtText type="title5" color="green" style={styles.insideCardButton}>
                            Devamı
                        </BtText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

export default ListSlider;

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
    },
    bgImage: {
        height: 200,
    },
    cardMain: {
        marginHorizontal: 5,
    },
    insideImage: {
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 20,
        paddingVertical: 30,
    },
    insideCardTextWrapper: {
        maxWidth: '70%',
    },
    insideCardText: {
        ...theme.typography.title2,
        color: '#fff',
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
