import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BtText from './BtText';

const CountDownTimer = (props) => {
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
            if (seconds === 0 && minutes === 0) {
                props.timerFinishHandle();
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <View style={styles.wrapper}>
            <BtText style={styles.text} type="bodyBold" color="green">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </BtText>
        </View>
    );
};

export default CountDownTimer;
const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: 80,
        height: 36,
        textAlign: 'center',
        borderRadius: 20,
    },
});
