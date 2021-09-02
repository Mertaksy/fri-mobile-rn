import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import BtText from './BtText';
import ArrowRightGreenSvg from '../../assets/icons/arrow-right_green.svg';

const BtLinkButton = (props) => {
    const { onPress, style, label, variant, disabled, type, underlined, align = 'center', iconPosition, icon } = props;

    const opacity = disabled ? 0.5 : 1;
    const _iconPosition = iconPosition ? iconPosition : 'left';

    let color = 'lightGreen'; // for select from Theme Palette
    let backgroundColor = 'transparent';
    let justifyContent = 'center';
    let paddingHorizontal = 5;
    let textStyle = {};

    if (variant) {
        color = variant || 'lightGreen';
    }
    if (align === 'left') {
        justifyContent = 'flex-start';
        paddingHorizontal = 0;
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
    const getIcon = (name) => {
        switch (name) {
            case 'arrow-right-green':
                return <ArrowRightGreenSvg style={[styles.icon]} height={8} width={8} />;
            default:
                return null;
        }
    };
    return (
        <Btn {...{ onPress }}>
            <View style={[styles.button, { backgroundColor, opacity, justifyContent }, style]}>
                {_iconPosition === 'left' ? getIcon(icon) : null}
                <BtText style={[styles.label, textStyle, paddingHorizontal]} type={type || 'linkButton'} textAlign={align} color={color}>
                    {label}
                </BtText>
                {_iconPosition === 'right' ? getIcon(icon) : null}
            </View>
        </Btn>
    );
};

export default BtLinkButton;

const styles = StyleSheet.create({
    button: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        lineHeight: 20,
    },
});
