import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as UserAPI from '../api/user';
import ApiErrors from '../api/errors';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { StyleSheet, Dimensions, View } from 'react-native';
import { BtText } from '.';
import SocialMediaAuthButton from './SocialMediaAuthButton';

const SocialMediaLoginSection = ({ navigation, setState }) => {
    const loginWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            await checkApple(credential);
        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    };

    const checkApple = async (data) => {
        const accessToken = data.identityToken;
        try {
            const response = await UserAPI.checkSocialAccount(accessToken, 'apple');
            console.log(response.data);
            if (response.data.success) {
                navigation.navigate('SmsVerifyPage', { gsm_number: response.data.gsm_number });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log({ responseParsed });
            if (responseParsed.errors.general === 'USER_NOT_FOUND') {
                navigation.navigate('RegisterFormPage', { apple_data: data });
            }
            if (responseParsed.errors.general === 'SMS gönderimi için bir süre daha beklemelisiniz.') {
                setState({ apiErrors: responseParsed.errors });
            }
        }
    };

    const loginWithFacebook = async () => {
        try {
            await Facebook.initializeAsync({ appId: '975239832889834', appName: 'Bizim Tarifler' });
            const { type, token, expires, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?fields=email,name,first_name,middle_name,last_name,picture.type(large)&access_token=${token}`,
                );

                // TODO: Erman POST <ENDPOINT>/auth/check_social
                // USER_NOT_FOUND gelirse  navigation.navigate('RegisterFormPage', { fb_data: response });
                const checkResponse = await checkFacebook(await response.json(), token);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };

    const checkFacebook = async (data, token) => {
        try {
            const response = await UserAPI.checkSocialAccount(token, 'facebook');
            // console.log('check facebook cevap döndü', response);
            if (response.data.success) {
                navigation.navigate('SmsVerifyPage', { gsm_number: response.data.gsm_number });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.errors.general === 'USER_NOT_FOUND') {
                navigation.navigate('RegisterFormPage', { fb_data: { ...data, accessToken: token } });
            } else {
                setState({ apiErrors: responseParsed.errors });
            }
        }
    };

    const loginWithGoogle = async () => {
        try {
            try {
                const result = await Google.logInAsync({
                    androidClientId: '512350746347-ec10kom3fjg3lmqcfbvadc3ei508h654.apps.googleusercontent.com',
                    iosClientId: '512350746347-j9krk5eko1b287569e8gsfrdf9pese1k.apps.googleusercontent.com',
                    iosStandaloneAppClientId: '512350746347-q05eqq92rds0s0v3i03otk7kpqu1lh1j.apps.googleusercontent.com',
                    androidStandaloneAppClientId: '512350746347-md3nu82bg036jthg4e132fnajktomuls.apps.googleusercontent.com',
                    scopes: ['profile', 'email'],
                });

                if (result.type === 'success') {
                    await checkGoogle(result);
                    return result.accessToken; //TODO: burası ne yapıyor?
                } else {
                    return { cancelled: true };
                }
            } catch (e) {
                return { error: true };
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };

    const checkGoogle = async (data) => {
        try {
            const response = await UserAPI.checkSocialAccount(data.accessToken, 'google');

            if (response.data.success) {
                navigation.navigate('SmsVerifyPage', { gsm_number: response.data.gsm_number });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.errors.general === 'USER_NOT_FOUND') {
                navigation.navigate('RegisterFormPage', { google_data: data });
            } else {
                setState({ apiErrors: responseParsed.errors });
            }
        }
    };

    const OS = Platform.OS;

    return (
        <>
            <View style={OS === 'ios' ? styles.alternativeContainer : styles.container}>
                {OS === 'ios' ? <SocialMediaAuthButton icon="apple" label={'Apple ile devam et'} onPress={loginWithApple} /> : null}
                <SocialMediaAuthButton icon="google" label={OS === 'ios' ? 'Google ile devam et' : 'Google'} onPress={loginWithGoogle} />
                <SocialMediaAuthButton
                    icon="facebook"
                    label={OS === 'ios' ? 'Facebook ile devam et' : 'Facebook'}
                    onPress={loginWithFacebook}
                />
            </View>
            <View style={OS === 'ios' ? styles.orContainer : styles.orContainerAlternative}>
                <View
                    style={{
                        borderColor: '#E5E5E5',
                        borderWidth: 0.7,
                        width: Dimensions.get('window').width / 2.6,
                    }}
                />
                <BtText type="contentGilroy" style={{ color: Theme.palette.lightGreen }}>
                    ya da
                </BtText>

                <View
                    style={{
                        borderColor: '#E5E5E5',
                        borderWidth: 0.7,
                        width: Dimensions.get('window').width / 2.6,
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        justifyContent: 'space-between',
    },
    orContainerAlternative: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    alternativeContainer: {},
    alternativeButton: {
        height: 50,
        marginVertical: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
    },
});

export default SocialMediaLoginSection;
