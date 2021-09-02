import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import ArrowSvg from '../../assets/icons/arrow-right.svg';

const PopularList = (props) => {
    const { onPress, style, data = [] } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    let dataCover = null;
    let dataList = [];
    if (data.length > 0) {
        dataCover = data[0];
        dataList = data.slice(1)
    }
    return (
        <View style={styles.cardMain}>
            <View style={styles.cardHeader}>
                <DotsSvg width={24} height={24} style={styles.cardHeaderIcon} />
                <BtText type="title5Gilroy" color="green" style={styles.cardTitle}>
                    HAFTANIN ENLERİ
                </BtText>
            </View>
            <View style={styles.cardBody}>
                {dataCover && (
                    <Btn style={[styles.btnStyle]}>
                        <View>
                            <ImageBackground
                                imageStyle={{ borderRadius: 8 }}
                                source={{ uri: dataCover.mobile_image_url }}
                                style={styles.bgImage}
                                resizeMode="cover"
                            >
                                <View style={styles.insideImage}>
                                    <BtText type="title2" style={styles.insideCardText}>
                                        {dataCover.title}
                                    </BtText>
                                    <BtText type="title5" color="green" style={styles.insideCardButton}>
                                        Devamı
                                    </BtText>
                                </View>
                            </ImageBackground>
                        </View>
                    </Btn>
                )}
                {dataList.map((item) => (
                    <Btn>
                        <View style={styles.cardItem}>
                            <Image style={styles.cartItemImage} source={{ uri: item.mobile_image_url }} />
                            <BtText type="title5" color="green" style={styles.cardItemDescription}>
                                {item.title}
                            </BtText>
                        </View>
                    </Btn>
                ))}
            </View>
        </View>
    );
};

export default PopularList;

const styles = StyleSheet.create({
    cardMain: {
        paddingVertical: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardHeaderIcon: {
        marginRight: 20,
        marginLeft: 10,
    },
    arrowRightIcon: {
        marginLeft: 5,
    },
    cardBody: {
        padding: 5,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(86,105,106,0.1)',
    },
    cartItemImage: {
        borderRadius: 8,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardItemDescription: {},
    bgImage: {
        height: 200,
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
