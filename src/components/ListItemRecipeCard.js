import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Button, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import MenuSvg from '../../assets/icons/menu.svg';
import TimeSvg from '../../assets/icons/time.svg';
import LevelSvg from '../../assets/icons/level.svg';

const ListItemRecipeCard = (props) => {
    const { style, btnStyle, data, navigation } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    const goDetails = () => {
        navigation.navigate('RecipeDetailsPage', {
            slug: data.slug,
        });
    };
    return (
        <Btn onPress={goDetails} style={[styles.btnStyle, btnStyle]}>
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
                    <BtText type="title5" color="green" style={styles.insideCardText}>
                        {data.title}
                    </BtText>
                    <View style={styles.iconWrapper}>
                        <View style={styles.iconItem}>
                            <TimeSvg width={14} height={14} style={{ marginRight: 3 }} />
                            <BtText type="cardText">{data.cooking_time + ' dk.'}</BtText>
                        </View>
                        <View style={styles.iconItem}>
                            <LevelSvg width={14} height={14} style={{ marginRight: 3 }} />
                            <BtText type="cardText">{data.difficulty.title}</BtText>
                        </View>
                    </View>
                </View>
            </View>
        </Btn>
    );
};

export default ListItemRecipeCard;

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
        justifyContent: 'center',
    },
    insideCardText: {
        marginBottom: 10,
    },
    iconWrapper: {
        flexDirection: 'row',
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
});
