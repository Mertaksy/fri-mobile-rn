import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import LevelSvg from '../../assets/icons/level.svg';
import MenuSvg from '../../assets/icons/menu.svg';
import TimeSvg from '../../assets/icons/time.svg';
import { DrawerActions } from '@react-navigation/native';

const OthersCard = (props) => {
    const { onPress, style, recipe, isRight, hasVideo, navigation } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    let marginStyle = { marginTop: 0 };

    const onPressed = () => {
        // const jumpToAction = DrawerActions.jumpTo('RecipesScreenStack',{
        //     slug: recipe.slug,
        // });
        // navigation.dispatch(jumpToAction);

        navigation.navigate('RecipeDetailsPage', {
            slug: recipe.slug,
        });
    };
    return (
        <Btn onPress={onPressed} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style, marginStyle]}>
                <Image
                    imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    source={{ uri: recipe.mobile_image_url }}
                    style={styles.bgImage}
                    resizeMode="cover"
                />
                <View style={styles.cardMainText}>
                    <BtText type="title6" style={styles.cardTopText}>
                        {recipe.title}
                    </BtText>
                    <View style={styles.cardBottomMainText}>
                        <View style={styles.insideCardText}>
                            <TimeSvg width={14} height={14} style={{ marginRight: 3 }} />
                            <BtText style={styles.insideCardBottomButtonText}>{recipe.cooking_time}</BtText>
                        </View>
                        <View style={styles.insideCardText}>
                            <LevelSvg width={14} height={14} style={{ marginRight: 3 }} />
                            <BtText style={styles.insideCardBottomButtonText}>{recipe.difficulty.title}</BtText>
                        </View>
                    </View>
                </View>
            </View>
        </Btn>
    );
};

export default OthersCard;
const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
        flex:1,
        marginVertical: 10,
    },
    bgImage: {
        height: 150,
        //flex: 1,

        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardMain: {
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E5E5E5',
        minHeight: 240,
        //flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    cardMainText: {
        padding: 10,
        justifyContent: 'space-between',
        flex: 1,
    },
    insideImage: {
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'flex-end',
    },
    cardBottomMainText: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    insideCardText: {
        flexDirection: 'row',
        alignContent: 'center', // icon ile text i orta hizaya getirmesi lazım
        // justifyContent: 'space-between',
        // flex: 1, //bunu vermeden justifyContent yemiyor
    },
    cardTopText: {
        marginBottom: 25,
        alignContent: 'center',
    },
    insideCardBottomButtonText: {
        fontSize: 10,
        lineHeight: 14,
    },
});
