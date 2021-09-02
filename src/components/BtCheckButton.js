import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Text, Dimensions } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import CheckSvg from '../../assets/icons/check_circle_green.svg';
import VeganSvg from '../../assets/icons/personalization/vegan.svg';
import VejeteryanSvg from '../../assets/icons/personalization/vejeteryan.svg';
import PeskateryanSvg from '../../assets/icons/personalization/peskateryan.svg';
import KetojenikSvg from '../../assets/icons/personalization/ketojenik.svg';
import GlutensizSvg from '../../assets/icons/personalization/glutensiz.svg';

const getIcon = (name) => {
    switch (name) {
        case 'vegan':
            return <VeganSvg style={styles.icon} width={18} height={18} />;
        case 'vejeteryan':
            return <VejeteryanSvg style={styles.icon} width={18} height={18} />;
        case 'peskateryan':
            return <PeskateryanSvg style={styles.icon} width={18} height={18} />;
        case 'ketojenik':
            return <KetojenikSvg style={styles.icon} width={18} height={18} />;
        case 'glutensiz':
            return <GlutensizSvg style={styles.icon} width={18} height={18} />;
        default:
            return null;
    }
};
const BtCheckButton = (props) => {
    const { onPress, style, label, variant, disabled, type, underlined, selected, icon } = props;

    const opacity = disabled ? 0.5 : 1;

    let color = 'lightGreen'; // for select from Theme Palette
    let backgroundColor = selected ? '#F5FBFD' : 'transparent';
    let textStyle = {};
    let borderColor = selected ? '#064545' : '#e5e5e5';

    if (variant) {
        color = variant || 'lightGreen';
    }
    if (underlined) {
        textStyle.textDecorationLine = 'underline';
    }

    let Btn;
    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    return (
        <Btn {...{ onPress }} style={[styles.btnStyle, { borderColor }]}>
            <View style={[styles.cardMain, { backgroundColor, opacity }, style]}>
                <View style={styles.checkIcon}>{selected ? <CheckSvg width={12} height={12} style={styles.checked} /> : null}</View>
                {getIcon(icon)}
                <BtText style={styles.textStyle} type={type || 'label12SB'} textAlign="center" color={color}>
                    {label}
                </BtText>
            </View>
        </Btn>
    );
};

export default BtCheckButton;

const styles = StyleSheet.create({
    button: {
        // height: 50,
        // borderWidth: 0,
        padding: 5,
        // paddingHorizontal: 10,
        // marginVertical: 7.5,
    },
    btnStyle: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        //width: '30%',
        //flex:1,
        margin: 5,
        overflow: 'hidden',
        borderRadius: 7,
        borderColor: '#e5e5e5',
        height: 95,
        borderStyle: 'solid',
        borderWidth: 1,
        width: (Dimensions.get('window').width - 70) / 3,
    },
    cardMain: {
        flex: 1,
        height: 95,
        backgroundColor: 'rgba(186, 228, 238, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        position: 'absolute',
        left: 7,
        top: 7,
    },
    checked: {
        color: '#064545',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    icon: {
        marginBottom: 5,
    },
});
