import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import BtText from './BtText';
import TrashSvg from '../../assets/icons/trash.svg';

const MiniCard = (props) => {
    const { onPress, style, data, createdDate, onPressDelete } = props;

    return (
        <TouchableOpacity {...{ onPress }} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <View style={styles.topCardWithImage}>
                    <Image source={{ uri: data.mobile_image_url }} style={styles.bgImage} resizeMode="contain" />
                    <View style={styles.textContainer}>
                        <BtText type="title5" style={styles.message}>
                            {data.title}
                        </BtText>
                        <BtText type="linkButtonSmall" style={styles.createdDate}>
                            {createdDate}
                        </BtText>
                        <TouchableOpacity style={styles.deleteIconContainer} onPress={onPressDelete}>
                            <TrashSvg />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MiniCard;

const styles = StyleSheet.create({
    textContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    createdDate: {
        marginTop: 13,
    },
    message: {
        marginBottom: 13,
        lineHeight: 25,
    },
    btnStyle: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        margin: 10,
        paddingBottom: 20,
    },
    bgImage: {
        height: 70,
        width: 70,
        backgroundColor: '#E5E5E5',
        borderRadius: 35,
        marginLeft: 18,
    },
    topCardWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardMain: {},
    deleteIcon: {},
    deleteIconContainer: {
        alignSelf: 'flex-end',
        width: 16,
        height: 16,
        marginRight: 25,
        marginTop: -40,
        paddingBottom: 25,
        paddingTop: 10,
        paddingRight: 25,
        paddingLeft: 13,
    },
});
