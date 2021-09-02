import React, { useReducer, useState, useContext, useLayoutEffect } from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    Button,
    StyleSheet,
    Alert,
    Dimensions,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    Image,
} from 'react-native';
import { BtInput, BtText, BtButton, BtGenderRadio, BtSelect, BtDateSelect } from '../../components';
import DoubleLineSvg from '../../../assets/icons/double_line.svg';
import flowerPng from '../../../assets/icons/flower.png';

const modalBgImage = require('../../../assets/images/modal-bg.png');
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import ApiErrors from '../../api/errors';
import * as UserAPI from '../../api/user';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import CrossSvg from '../../../assets/icons/cross.svg';
import TickCircleSvg from '../../../assets/icons/tick_circle.svg';
import OrangeFlowerSvg from '../../../assets/icons/orange_flower.svg';

const initialState = {
    // user:{},
    name: '',
    gsm_number: '',
    email: '',
    birthdate: '',
    selectedCity: null,
    city: '',
    district: '',
    address: '',
    imageUrl: '',
    gender: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const AccountSettingsPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //boş array koyduk. en çok kullanılan**
    useLayoutEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await UserAPI.getUser();
            const data = response.data;
            if (data.success) {
                console.log({ data });
                //  setState({ gsm_number: data.user.gsm_number, name: data.user.name, email: data.user.email });
                setState({ ...data.user });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };

    const phoneOnChange = (gsm_number) => {
        setState({ gsm_number, loginError: '' });
    };

    const handleDateChange = (selectedDate) => {
        const currentDate = selectedDate;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day.toString() : day;
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month;
        const formattedDate = currentDate.getFullYear().toString() + '-' + month.toString() + '-' + day.toString();
        setState({ birthdate: formattedDate });
    };

    const showOnDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        return status !== 'granted' ? alert('Sorry, we need camera roll permissions to make this work!') : status === 'granted';
    };

    const pickImage = async () => {
        let isHasPermission = await getPermissionAsync();
        if (isHasPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setState({ imageUrl: result.uri });
            }
        } else {
            throw new Error('Location permission not granted');
        }
    };

    const checkGoogle = async (data) => {
        try {
            const response = await UserAPI.checkSocialAccount(data.accessToken, 'google');

            if (response.success) {
                navigation.navigate('SmsVerifyPage', { gsm_number: response.gsm_number });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.errors.general === 'USER_NOT_FOUND') {
                navigation.navigate('RegisterFormPage', { google_data: data }); //aynı sayfada gelen datayla inputları doldurması gerekecek olarak düşündüm. öyle değilse setstate ile gelen datayı eklerim. hatta fb de örnek olarak yapayım :)
            }
            setState({ apiErrors: responseParsed.errors });
        }
    };

    const checkFacebook = async (data, token) => {
        try {
            const response = await UserAPI.checkSocialAccount(token, 'facebook');
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ name: data.name, email: data.email, imageUrl: data.picture.data.url }); // hata dönüyor be'den {"errors": Object {}, "message": "Server Error", "status": 500,"success": false, }
            if (responseParsed.errors.general === 'USER_NOT_FOUND') {
            }
            setState({ apiErrors: responseParsed.errors });
        }
    };

    const loginWithFacebook = async () => {
        try {
            await Facebook.initializeAsync('975239832889834');
            const { type, token, expires, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?fields=email,name,first_name,middle_name,last_name,picture.type(large)&access_token=${token}`,
                );

                const checkResponse = await checkFacebook(await response.json(), token);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };
    const loginWithGoogle = async () => {
        try {
            try {
                const result = await Google.logInAsync({
                    androidClientId: '512350746347-ec10kom3fjg3lmqcfbvadc3ei508h654.apps.googleusercontent.com',
                    iosClientId: '512350746347-j9krk5eko1b287569e8gsfrdf9pese1k.apps.googleusercontent.com',
                    scopes: ['profile', 'email'],
                });

                if (result.type === 'success') {
                    const checkResponse = await checkGoogle(result);
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

    const updateAccount = async () => {
        try {
            const postData = {
                imageUrl: state.imageUrl,
                name: state.name,
                gsm_number: state.gsm_number,
                email: state.email,
                gender: state.gender,
                birthdate: state.birthdate,
                city: state.city,
                district: state.district,
                address: state.address,
            };
            const response = await UserAPI.updateUserSettings(postData);
            const data = response.data;
            if (data.success) {
                setShowModal(true);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={flowerPng} style={styles.flower} />
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground style={styles.bgImage} resizeMode="stretch">
                    <View style={styles.innerContainer}>
                        <View style={styles.topCardWithImage}>
                            <DoubleLineSvg style={{ position: 'absolute', top: 0, right: 80 }} />
                            <View style={styles.badge}>
                                <BtText style={styles.badgeLabel} color="white" type="title4">
                                    +
                                </BtText>
                            </View>
                            <TouchableOpacity onPress={pickImage}>
                                {state.imageUrl ? (
                                    <ImageBackground
                                        imageStyle={{ borderRadius: 150 }}
                                        source={{ uri: state.imageUrl }}
                                        style={styles.bgUserImage}
                                        resizeMode="contain"
                                    ></ImageBackground>
                                ) : (
                                    <ImageBackground
                                        imageStyle={{ borderRadius: 150 }}
                                        source={require('../../../assets/images/select_photo.png')}
                                        style={styles.bgUserImage}
                                        resizeMode="contain"
                                        onPress="pickImage"
                                    ></ImageBackground>
                                )}
                            </TouchableOpacity>

                            <View style={{ marginLeft: 15 }}>
                                <BtText type="title5" style={{ color: Theme.palette.green }}>
                                    Hoşgeldin {state.name}
                                </BtText>
                                <BtText type="content">Bu sayfadan profilini düzenleyebilir, deneyimini</BtText>
                                <BtText type="content">kişiselleştirebilir, bildirimlerini görebilir, hesap ayarlarını</BtText>
                                <BtText type="content">yapabilirsin.</BtText>
                                <OrangeFlowerSvg style={styles.orangeFlower} />
                            </View>
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#E5E5E5',
                                borderBottomWidth: 0.5,
                                marginBottom: 35,
                                marginTop: 10,
                                paddingBottom: 15,
                                //marginHorizontal: 20,
                            }}
                        >
                            <BtText type="title3" color="lightBlue" style={{ marginTop: 30 }}>
                                Hesap Ayarları
                            </BtText>
                        </View>
                        <BtInput value={state.name} label="Ad/Soyad" onChangeText={(name) => setState({ name })} error={state.loginError} />
                        <BtInput
                            value={state.gsm_number}
                            label="Cep Telefonu Numaran"
                            onChangeText={phoneOnChange}
                            error={state.loginError}
                        />
                        <BtInput
                            value={state.email}
                            label="E-Posta"
                            onChangeText={(email) => setState({ email })}
                            error={state.loginError}
                        />
                        <BtText type="linkButton" style={{ marginTop: 10 }}>
                            Cinsiyet
                        </BtText>
                        <View style={{ flexDirection: 'row' }}>
                            <BtGenderRadio
                                label="Kadın"
                                isChecked={state.gender === 'female'}
                                onPress={() => setState({ gender: 'female' })}
                            ></BtGenderRadio>
                            <BtGenderRadio
                                label="Erkek"
                                isChecked={state.gender === 'male'}
                                onPress={() => setState({ gender: 'male' })}
                            ></BtGenderRadio>
                        </View>

                        <BtDateSelect label="Doğum Tarihi" value={state.birthdate} handleDateChange={handleDateChange}></BtDateSelect>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.cityAndDistrict}>
                                <BtInput
                                    value={state.city}
                                    label="İl"
                                    onChangeText={(city) => setState({ city })}
                                    error={state.loginError}
                                />
                            </View>
                            <View style={styles.cityAndDistrict}>
                                <BtInput
                                    value={state.district}
                                    label="İlçe"
                                    onChangeText={(district) => setState({ district })}
                                    error={state.loginError}
                                />
                            </View>
                        </View>

                        <BtInput
                            value={state.address}
                            label="Adres"
                            onChangeText={(address) => setState({ address })}
                            error={state.loginError}
                        />

                        <BtButton label="GÜNCELLE" variant="orange" onPress={updateAccount} />
                    </View>
                </ImageBackground>
                <Modal animationType="fade" transparent={true} visible={showModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                style={{
                                    alignSelf: 'flex-end',
                                }}
                            >
                                <CrossSvg width={20} height={20} />
                            </TouchableOpacity>
                            <View>
                                <View style={[styles.iconCart]}>
                                    <TickCircleSvg width={60} height={60} />
                                </View>
                            </View>
                            <BtText type="title1" color="green" style={{ textAlign: 'center', marginVertical: 15 }}>
                                Güncellendi
                            </BtText>
                            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                <BtButton
                                    onPress={() => setShowModal(false)}
                                    label="TAMAM"
                                    variant="orange"
                                    btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </ScrollView>
    );
};

export default AccountSettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        //justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    text: {
        color: 'grey',
        fontSize: 30,
        fontWeight: 'bold',
    },
    bgUserImage: {
        height: 60,
        width: 60,
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        //margin: 18,
    },
    topCardWithImage: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#f1fafc',
        width: '100%',
        height: 120,
    },
    cityAndDistrict: {
        width: Dimensions.get('window').width / 2 - 30,
    },
    badge: {
        backgroundColor: '#ff5f0e',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 28,
        left: 15,
        zIndex: 1,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    badgeLabel: {
        position: 'absolute',
        left: 3,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconCart: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    orangeFlower: {
        position: 'absolute',
        right: 0,
        bottom: -50,
    },
    flower: { zIndex: 0, position: 'absolute', top: -135, right: -50, transform: [{ scale: 0.4 }] },
});
