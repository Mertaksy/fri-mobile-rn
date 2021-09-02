import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import AvatarSvg from '../../assets/icons/avatar.svg';
import HeartSvg from '../../assets/icons/heart.svg';
import GloveSvg from '../../assets/icons/glove.svg';
import NotificationSvg from '../../assets/icons/notifications.svg';
import DivideSvg from '../../assets/icons/divide.svg';
import TimeSvg from '../../assets/icons/time.svg';
import LevelSvg from '../../assets/icons/level.svg';
import OutSvg from '../../assets/icons/out.svg';

const getIcon = (name) => {
    switch (name) {
        case 'avatar':
            return <AvatarSvg style={styles.icon} width={20} height={20} />;
        case 'notifications':
            return <NotificationSvg style={styles.icon} />;
        case 'heart':
            return <HeartSvg style={styles.icon} width={20} height={20} />;
        case 'glove':
            return <GloveSvg style={styles.icon} width={20} height={20} />;
        case 'divide':
            return <DivideSvg style={styles.icon} width={20} height={20} />;
        case 'level':
            return <LevelSvg style={styles.icon} width={20} height={20} />;
        case 'time':
            return <TimeSvg style={styles.icon} width={20} height={20} />;
        case 'out':
            return <OutSvg style={styles.icon} width={20} height={20} />;

        default:
            return null;
    }
};
const BtIconButton = (props) => {
    const { onPress, style, label, variant, disabled, transparent, icon, iconPosition, bordered } = props;

    const opacity = disabled ? 0.5 : 1;

    const _iconPosition = iconPosition ? iconPosition : 'left';
    let color = 'lightGreen'; // for select from Theme Palette
    let borderColor = bordered ? Theme.palette.lightGreen : 'transparent';
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

    return (
        <Btn {...{ onPress }} style={styles.buttonWrapper}>
            <View style={[styles.button, { backgroundColor, opacity, borderColor }, style]}>
                {_iconPosition === 'left' ? getIcon(icon) : null}
                <BtText type="button" textAlign="center" {...{ color }}>
                    {label}
                </BtText>
                {_iconPosition === 'right' ? getIcon(icon) : null}
            </View>
        </Btn>
    );
};

export default BtIconButton;

const styles = StyleSheet.create({
    buttonWrapper: {
        marginVertical: 5,
    },
    button: {
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        paddingVertical: 17,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
});
