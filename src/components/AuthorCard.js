import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BtLinkButton from './BtLinkButton';
import MenuSvg from '../../assets/icons/menu.svg';

const AuthorCard = (props) => {
    const { onPress, style, writer = [], navigation } = props;

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
                    <Image source={{ uri: writer.image_full }} style={styles.bgImage} resizeMode="cover" />
                    <View>
                        <BtText type="title4">{writer.name}</BtText>
                        <BtLinkButton
                            style={{ paddingHorizontal: 0 }}
                            underlined
                            variant="orange"
                            type="linkButtonSmall"
                            label="Detay"
                            align="left"
                            onPress={() => navigation.navigate('AuthorDetailsPage', { author: writer })}
                        />
                    </View>
                </View>
            </View>
        </Btn>
    );
};

export default AuthorCard;
const styles = StyleSheet.create({
    btnStyle: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        overflow: 'hidden',
        //paddingTop: 10,
        marginTop: 0,
    },
    bgImage: {
        height: 50,
        width: 50,
        backgroundColor: '#E5E5E5',
        borderRadius: 25,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    topCardWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomCardTitle: {
        marginTop: 10,
        //alignItems: 'center',
        marginVertical: 15,
    },
    cardBottomLinks: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
        flexDirection: 'row',
        //marginLeft: -185,
    },
});
