import React, { useContext } from 'react';
import { Context as AppContext } from '../context/AppContext';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Platform, Pressable } from 'react-native';
import BackSvg from '../../assets/icons/back.svg';
import LogoDarkSvg from '../../assets/icons/logo_dark.svg';
import Theme from '../theme';
import { BtText } from '../components';
import { switchApi } from '../api/api';

const CustomHeader = (props) => {
    const AppState = useContext(AppContext).state;

    const { navigation, title, isHomeScreen, isRoot } = props;
    const goBack = () => {
        navigation.pop();
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={styles.wrapper}>
                {!isRoot && (
                    <TouchableOpacity onPress={() => goBack()} style={[styles.iconBack]}>
                        <BackSvg width={44} height={28} />
                    </TouchableOpacity>
                )}
                {title && (
                    <BtText type="navTitle" color="green">
                        {title}
                    </BtText>
                )}
                {isHomeScreen && (
                    <Pressable
                        delayLongPress={15000}
                        onLongPress={() => {
                            switchApi();
                            navigation.push('HomePage');
                        }}
                    >
                        <LogoDarkSvg width={150} height={20} />
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;

const HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 60;
const HEADER_PADDING = Platform.OS === 'ios' ? 0 : 30;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: HEADER_HEIGHT,
        marginTop: HEADER_PADDING,
    },
    iconBack: {
        position: 'absolute',
        left: 10,
    },
});
