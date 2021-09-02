import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import HTML from 'react-native-render-html';
import theme from '../theme';

const ListItemCard = (props) => {
    const { onPress, style, btnStyle, data } = props;

    return (
        <TouchableOpacity {...{ onPress }} style={[styles.btnStyle, btnStyle]}>
            <View style={[styles.cardMain, style]}>
                {data.mobile_image_url && (
                    <ImageBackground
                        imageStyle={{
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        }}
                        source={{ uri: data.mobile_image_url }}
                        style={styles.bgImage}
                        resizeMode="cover"
                    ></ImageBackground>
                )}
                <View style={styles.insideImage}>
                    <HTML source={{ html: data.title }} baseFontStyle={styles.insideCardText} />
                    {data.summary ? (
                        <HTML
                            customWrapper={(content) => <View style={styles.dataSummaryWrapper}>{content}</View>}
                            source={{ html: data.summary }}
                            baseFontStyle={styles.dataSummary}
                        />
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListItemCard;

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        minHeight: 100,
    },
    bgImage: {
        resizeMode: 'cover',
        height: 100,
        width: 100,
    },
    cardMain: {
        flexDirection: 'row',
    },
    insideImage: {
        flex: 1,
        padding: 10,
    },
    insideCardText: {
        ...theme.typography.title5,
        color: theme.palette.green,
    },
    dataSummaryWrapper: {
        marginTop: 5,
    },
    dataSummary: {
        ...theme.typography.cardText,
    },
});
