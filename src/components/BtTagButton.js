import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';

const colors = ['#829595', '#e5a36c', '#58b3c8', '#3ad0aa', '#8c499c', '#e07b5a', '#58b3c8'];

const BtTagButton = (props) => {
    const { onPress, style, label, disabled, icon, btnStyle, width = 150, index = 0, isSelected } = props;

    const opacity = disabled ? 0.5 : 1;

    let color = colors[index % 6];
    let textColor = isSelected ? '#fff' : color;
    let borderColor = color;
    let backgroundColor = isSelected ? color : '#fff';

    let Btn;
    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
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
                    { width },
                ]}
            >
                <BtText textAlign="center" type="label12SB" style={{ color: textColor }}>
                    {label}
                </BtText>
            </View>
        </Btn>
    );
};

export default BtTagButton;

const styles = StyleSheet.create({
    button: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 7.5,
        alignItems: 'center',
        marginRight: 10,
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
