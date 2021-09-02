import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Image,
    Button,
    ImageBackground,
    TextInput,
    ScrollView,
    Modal,
    Dimensions,
} from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BtButton from './BtButton';
import BtInput from './BtInput';
import MenuSvg from '../../assets/icons/menu.svg';
import SortSvg from '../../assets/icons/sort.svg';
import TimeSvg from '../../assets/icons/time.svg';

const letters = 'ABCDEFGHIJKLMNOPRSTUVYZ';
const DictionarySort = (props) => {
    const { onChangeText } = props;
    const [showModal, setShowModal] = useState(false);
    const [letter, setLetter] = useState('');
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    const onOrderPress = () => {};
    const onLetterPress = (letter) => {
        setLetter(letter);
        onChangeText(letter);
        setShowModal(false);
    };
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                onChangeText={onLetterPress}
                maxLength={1}
                value={letter}
                placeholder="Harfe Göre Ara"
                style={styles.textInput}
                underlineColorAndroid="transparent"
            />
            <Btn onPress={() => setShowModal(true)} style={styles.btnStyle}>
                <SortSvg style={styles.inputIcon} />
            </Btn>
            <Modal animationType="fade" transparent={true} visible={showModal}>
                <Btn
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => {
                        setShowModal(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {letters.split('').map((val, key) => {
                                return (
                                    <Btn
                                        key={key}
                                        onPress={() => onLetterPress(val)}
                                        style={[styles.btnIconStyle, val === letter ? styles.iconSelected : null]}
                                    >
                                        <BtText color={val === letter ? 'white' : 'lightGreen'}>{val}</BtText>
                                    </Btn>
                                );
                            })}
                        </View>
                    </View>
                </Btn>
            </Modal>
        </View>
    );
};

export default DictionarySort;

const styles = StyleSheet.create({
    textInput: {
        color: '#064545',
        borderRadius: 5,
        borderWidth: 0,
        height: 50,
        width: 250,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 14,
    },
    inputWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: -25,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnStyle: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
    },
    btnIconStyle: {
        padding: 10,
        alignItems: 'center',
        width: 40,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        margin: 5,
    },
    inputIcon: {
        width: 26,
        height: 26,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 120,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconSelected: {
        backgroundColor: Theme.palette.green,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});
