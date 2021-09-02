import React, { useContext } from 'react';
import { Context as AppContext } from '../context/AppContext';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UserWhiteSvg from '../../assets/icons/user_white.svg';
import BagGreenSvg from '../../assets/icons/bag_green.svg';
import Theme from '../theme';
import { BtText } from '../components';

const HeaderRightMenu = (props) => {
    const AppState = useContext(AppContext).state;
    //Structure for the navigation Drawer
    const goAccount = () => {
        //Props to open/close the drawer
        if (!AppState.userData) {
            props.navigationProps.navigate('AuthScreenStack');
        } else {
            props.navigationProps.navigate('AccountScreenStack');
        }
    };
    const goCart = () => {
        if (!AppState.userData) {
            props.navigationProps.navigate('AuthScreenStack');
        } else {
            props.navigationProps.navigate('CartScreenStack');
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => goAccount()} style={[styles.iconUser]}>
                <UserWhiteSvg width={14} height={14} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goCart()} style={[styles.iconCart]}>
                <BagGreenSvg width={14} height={14} />
                <View style={styles.badge}>
                    <BtText style={styles.badgeLabel} color="white" type="badgeLabel">
                        {AppState.userCart.length}
                    </BtText>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default HeaderRightMenu;

const styles = StyleSheet.create({
    wrapper: { flexDirection: 'row', marginRight: 10, justifyContent: 'center' },
    iconUser: {
        backgroundColor: '#165151',
        borderRadius: 17.5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconCart: {
        backgroundColor: '#bae4ee',
        borderRadius: 17.5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    badge: {
        backgroundColor: '#ff5f0e',
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -3,
        right: -3,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    badgeLabel: {
        // lineHeight: 14,
    },
});
