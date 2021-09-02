// Drawer Menu + logo
import { TouchableOpacity, View } from 'react-native';
import MenuSvg from '../../assets/icons/menu.svg';
import { BtText } from '../components';
import LogoSvg from '../../assets/icons/logo.svg';
import React from 'react';

const NavigationDrawerStructure = (props) => {
    //Structure for the navigation Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <MenuSvg width={24} height={24} style={{ marginHorizontal: 10 }} />
            </TouchableOpacity>
            {props.title ? (
                <BtText type="navTitle" color="green">
                    {props.title}
                </BtText>
            ) : (
                <LogoSvg height={24} style={{ marginLeft: 5 }} />
            )}
        </View>
    );
};

export default NavigationDrawerStructure;