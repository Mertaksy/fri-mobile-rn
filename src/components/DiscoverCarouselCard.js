import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BtButton from './BtButton';
import MenuSvg from '../../assets/icons/menu.svg';
import ArrowSvg from '../../assets/icons/arrow-right_green.svg';

const DiscoverCarouselCard = (props) => {
    const { style, data, navigation } = props;
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    const onPressed = () => {
        // const jumpToAction = DrawerActions.jumpTo('RecipesScreenStack',{
        //     slug: recipe.slug,
        // });
        // navigation.dispatch(jumpToAction);

        navigation.navigate('RecipeDetailsPage', {
            slug: data.slug,
        });
    };
    return (
        <Btn onPress={onPressed} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <ImageBackground
                    imageStyle={{ borderRadius: 8 }}
                    source={{ uri: data.mobile_image_url }}
                    style={styles.bgImage}
                    resizeMode="cover"
                ></ImageBackground>
                <View style={styles.sliderCardContent}>
                    <BtText type="title4" style={styles.sliderCardContentText}>
                        {data.title}
                    </BtText>
                    <BtText type="contentGilroy" color="green" style={styles.readMoreText}>
                        DEVAMINI OKU <ArrowSvg width={9} height={7} style={{ color: '#064545' }} />
                    </BtText>
                </View>
            </View>
        </Btn>
    );
};

export default DiscoverCarouselCard;

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
    sliderCardContent: {
        marginTop: 30,
        // paddingLeft: 20,
    },
    sliderCardContentText: {
        color: '#064545',
    },
    readMoreText: {
        //color : '#064545',
        opacity: 0.7,
        marginTop: 30,
    },
    // insideImage: {
    //     justifyContent: 'space-between',
    //     flex: 1,
    //     borderRadius: 8,
    //     backgroundColor: 'rgba(0,0,0,0.4)',
    //     paddingLeft: 20,
    //     paddingVertical: 30,
    // },
    // insideCardText: {
    //     color: '#fff',
    //     width: '50%',
    // },
    // insideCardButton: {
    //     backgroundColor: '#fff',
    //     width: 85,
    //     borderRadius: 5,
    //     textAlign: 'center',
    //     padding: 10,
    //     overflow: 'hidden',
    // },
});
