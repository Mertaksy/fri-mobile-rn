import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import BtText from './BtText';
import CheckedBox from '../../assets/icons/check_circle_green.svg';
import UncheckedBox from '../../assets/icons/empty_circle_green.svg';

const BtGenderRadio = (props) => {
    const { onPress, label, value, isChecked, disabled } = props;

    let Btn;
    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    return (
        <Btn {...{ onPress }}>
            <View style={[styles.button]}>
                {isChecked ? <CheckedBox width={16} height={16} style={styles.icon} /> : <UncheckedBox width={16} height={16} style={styles.icon} />}
                <BtText type="button">
                    {label}
                </BtText>
            </View>
        </Btn>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        paddingVertical: 17,
        paddingHorizontal: 10,
        marginVertical: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
});

export default BtGenderRadio;
