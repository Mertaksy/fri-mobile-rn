import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import BtText from './BtText';
import BtInput from './BtInput';
import Theme from '../theme';
import modalBg from '../../assets/images/modal-bg.png';
import CrossIcon from './CrossIcon';

const InputModal = ({ addNewList, onChangeText, closeModal, isVisible, userInput, inputLabel, buttonText, title }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.centeredView}>
                <ImageBackground source={modalBg} resizeMode="stretch" style={styles.modalView}>
                    <CrossIcon onPress={closeModal} containerStyle={styles.closeModalButton} type="green" />
                    <BtText type="title1" style={styles.title}>
                        {title}
                    </BtText>
                    <View style={styles.input}>
                        <BtInput value={userInput} label={inputLabel} onChangeText={onChangeText} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={addNewList}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </Modal>
    );
};

export default InputModal;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginTop: 40,
    },
    title: {
        color: Theme.palette.green,
        width: '100%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'white',
        borderColor: Theme.palette.lightBlue,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        ...Theme.typography.button,
        color: Theme.palette.lightBlue,
        fontSize: 15,
        lineHeight: 20,
    },
    closeModalButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        minHeight: 370,
        marginHorizontal: 20,
        justifyContent: 'center',
        overflow: 'hidden',
    },
});
