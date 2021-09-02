import React, { useEffect, useState } from 'react';
import Theme from '../theme';
import { StyleSheet, View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import FacebookLogo from '../../assets/images/facebook_logo.png';
import GoogleLogo from '../../assets/images/google_logo.png';
import AppleLogo from '../../assets/icons/apple_logo.svg';

const SocialMediaAuthButton = ({ label, icon, onPress }) => {
    const loginButtonWidth = Platform.OS === 'ios' ? '100%' : Dimensions.get('window').width / 2 - 25;
    const [logoButton, setLogoButton] = useState(null);

    useEffect(() => {
        if (icon === 'google') {
            setLogoButton(<Image source={GoogleLogo} style={styles.image} />);
        } else if (icon === 'facebook') {
            setLogoButton(<Image source={FacebookLogo} style={styles.image} />);
        } else if (icon === 'apple') {
            setLogoButton(<AppleLogo style={styles.appleButton} />);
        }
    }, []);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, { width: loginButtonWidth }]}>
                {logoButton}
                <Text style={Theme.typography.authButton}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
    },
    image: {
        height: 16,
        width: 16,
        position: 'absolute',
        left: 18,
    },
    appleButton: {
        position: 'absolute',
        left: 10,
    },
});
export default SocialMediaAuthButton;
