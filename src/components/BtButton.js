import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BackWhiteSvg from '../../assets/icons/back_white.svg';
import FacebookLogo from '../../assets/icons/facebook-logo-white.png';
import GoogleLogo from '../../assets/images/google_logo.png';
import filledPlus from '../../assets/icons/filledPlus.png';

const BtButton = (props) => {
    const {
        onPress,
        style,
        label,
        variant,
        disabled,
        transparent,
        icon,
        iconPosition = 'left',
        btnStyle,
        textType = 'button',
        iconAlign,
    } = props;

    const opacity = disabled ? 0.5 : 1;

    const _iconPosition = iconPosition ? iconPosition : 'left';
    let color = 'lightBlue'; // for select from Theme Palette
    let borderColor = Theme.palette.lightBlue;
    let backgroundColor = 'transparent';

    if (variant) {
        color = 'white'; // for select from Theme Palette
        borderColor = Theme.palette[variant] || Theme.palette.lightBlue;
        backgroundColor = Theme.palette[variant] || 'transparent';
    }

    let Btn;
    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    let iconFixedStyle = {};
    if (iconAlign) {
        iconFixedStyle = {
            position: 'absolute',
            top: 15,
        };
        iconFixedStyle[iconPosition] = 15;
    }
    const getIcon = (name) => {
        switch (name) {
            case 'facebook':
                return <Image source={FacebookLogo} style={[styles.icon, iconFixedStyle]} height={20} width={20} />;
            case 'google':
                return <Image source={GoogleLogo} style={[styles.icon, iconFixedStyle]} height={20} width={20} />;
            case 'back-white':
                return <BackWhiteSvg style={[styles.icon, iconFixedStyle]} height={20} width={20} />;
            // favoriler sayfasındaki favori listesi oluşturma butonunun artısı
            case 'filledPlus':
                return (
                    <Image source={filledPlus} style={[styles.icon, iconFixedStyle, { transform: [{ scale: 1.3 }], marginRight: 20 }]} />
                );
            default:
                return null;
        }
    };
    return (
        <Btn {...{ onPress }} style={[btnStyle]}>
            <View
                style={[
                    icon ? styles.socialMediaButton : null,
                    styles.button,
                    {
                        backgroundColor,
                        opacity,
                        borderColor,
                    },
                    style,
                ]}
            >
                {_iconPosition === 'left' ? getIcon(icon) : null}
                <BtText type={textType} textAlign="center" {...{ color }}>
                    {label}
                </BtText>
                {_iconPosition === 'right' ? getIcon(icon) : null}
                {/*{icon && <Icon name={icon} style={styles.icon} {...{color}} />}*/}
            </View>
        </Btn>
    );
};

export default BtButton;

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        paddingVertical: 17,
        paddingHorizontal: 10,
        marginVertical: 7.5,
        alignItems: 'center',
    },
    icon: {
        marginRight: 9,
        marginTop: -2,
        width: 20,
        height: 20,
        //marginBottom: 15
    },
    socialMediaButton: {
        flexDirection: 'row',
        //paddingHorizontal:15
        justifyContent: 'center',
    },
});
