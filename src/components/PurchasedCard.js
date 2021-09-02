import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform, ImageBackground, Alert } from 'react-native';
import BtText from './BtText';
import TrashSvg from '../../assets/icons/trash.svg';

const PurchasedCard = (props) => {
    const { onPress, style, data, createdDate, onPressDelete } = props;


    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    return (
        <Btn {...{ onPress }} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <View style={styles.topCardWithImage}>
                    <Image
                        source={{ url: data.mobile_image_url }}
                        style={styles.bgImage}

                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                        <BtText type="title5" style={{ marginBottom: 13 }}>
                            {data.title}
                        </BtText>

                        <BtText type="linkButtonSmall" style={{ marginTop: 13 }}>
                            {createdDate}
                        </BtText>
                    </View>
                </View>
                <Btn onPress={onPressDelete} style={styles.deleteIcon}>
                    <TrashSvg width={14} height={14} />
                </Btn>
            </View>
        </Btn>
    );
};

export default PurchasedCard;

const styles = StyleSheet.create({
    btnStyle: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginVertical: 10,
        paddingBottom:20
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
    deleteIcon: {
        alignSelf: 'flex-end',
        marginRight: 25,
        marginTop: -15,
        width: 16,
        height: 16,
    },
});
