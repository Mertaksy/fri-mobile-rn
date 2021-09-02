import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import Theme from '../theme';

const BtText = (props) => {
    const {
        type,
        style,
        children,
        numberOfLines,
        textAlign,
        setNumNewLines,
        adjustsFontSizeToFit = false,
        allowFontScaling = false,
    } = props;
    const typography = type ? Theme.typography[type] : Theme.typography.body;
    const color = props.color && Theme.palette[props.color] ? Theme.palette[props.color] : Theme.palette.lightGreen;
    const computedStyle = [typography, { textAlign, color }];
    computedStyle.push(style);
    return (
        <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            style={[styles.text, computedStyle]}
            allowFontScaling={allowFontScaling}
            {...{ numberOfLines }}
            onTextLayout={({ nativeEvent: { lines } }) => {
                if (!setNumNewLines) {
                    return;
                }
                setNumNewLines(lines.length);
            }}
        >
            {children}
        </Text>
    );
};

export default BtText;

const styles = StyleSheet.create({
    text: {
        // flexWrap:'wrap'
        // backgroundColor: "#064545",
    },
});
