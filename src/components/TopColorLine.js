import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Theme from '../theme';

const TopColorLine = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.lineYellow}></View>
            <View style={styles.lineBlue}></View>
            <View style={styles.lineOrange}></View>
            <View style={styles.lineYellow}></View>
        </View>
    );
};

export default TopColorLine;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    lineYellow: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f6ff6c',
    },
    lineBlue: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#bae4ee',
    },
    lineOrange: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fdaf87',
    },

});
