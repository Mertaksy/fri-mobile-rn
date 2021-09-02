import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BtLinkButton from './BtLinkButton';
import MenuSvg from '../../assets/icons/menu.svg';

const WriterCard = (props) => {
    const { onPress, style, writer } = props;


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
                    <ImageBackground
                        imageStyle={{ borderRadius: 150 }}
                        source={{ url: writer.imageUrl }}
                        style={styles.bgImage}
                        resizeMode="contain"
                    ></ImageBackground>
                    <View>
                        <BtText type="title4">{writer.name}</BtText>
                        <BtText type="body">{writer.email}</BtText>
                    </View>
                </View>
                <View
                    style={{
                        borderColor: '#E5E5E5',
                        borderWidth: 1,
                        margin: 10,
                        marginHorizontal: 20,
                    }}
                />
                <View style={styles.bottomCardTextWithLinks}>
                    <BtText type="title5" style={styles.bottomCardTitle}>
                        {writer.title}
                    </BtText>
                    <View style={styles.cardBottomLinks}>
                        <BtLinkButton
                            underlined
                            variant="orange"
                            type="linkButton"
                            label="Yazılar"
                            onPress={() => navigation.navigate('RegisterPage')}
                        />
                        <BtLinkButton
                            underlined
                            variant="orange"
                            type="linkButton"
                            label="Tarifler"
                            onPress={() => navigation.navigate('RegisterPage')}
                        />
                    </View>
                </View>
            </View>
        </Btn>
    );
};

export default WriterCard;
const styles = StyleSheet.create({
    btnStyle: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        overflow: 'hidden',
        //paddingTop: 10,
        marginTop: 15,
    },
    bgImage: {
        height: 70,
        width: 70,
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        margin: 18,
    },
    topCardWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardMain: {
        //backgroundColor: 'pink',
    },
    bottomCardTextWithLinks: {
        //alignItems: 'center',
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
