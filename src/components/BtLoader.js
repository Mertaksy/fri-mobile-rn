import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Theme from '../theme';

const loader = require('../../assets/bt_loading.gif');

const BtLoader = (props) => {
    const { width = 80, height = 80, style = {} } = props;
    return (
        <View style={[styles.container, style]}>
            <Image source={loader} style={{ width, height }} />
        </View>
    );
};

export default BtLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
    },
});
