import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import modalBg from '../../assets/images/modal-bg.png';
import theme from '../theme';

const ActionConfirmationModal = ({ text = 'Emin misiniz?', setIsActionConfirmed, isModalVisible = true, setIsModalVisible }) => {
    const handleYes = () => {
        setIsActionConfirmed(true);
        setIsModalVisible(false);
    };

    const handleNo = () => {
        setIsActionConfirmed(false);
        setIsModalVisible(false);
    };
    return (
        <Modal visible={isModalVisible} style={styles.modal} animationType={'fade'} transparent={true}>
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <ImageBackground source={modalBg} resizeMode="stretch" style={styles.imageBackground}>
                        <Text style={styles.title}>{text}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleYes}>
                                <Text style={styles.buttonText}>Evet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleNo}>
                                <Text style={styles.buttonText}>Hayır</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    );
};

export default ActionConfirmationModal;

const styles = StyleSheet.create({
    title: {
        ...theme.typography.title4,
        color: theme.palette.green,
        paddingHorizontal: '5%',
        textAlign: 'center',
        lineHeight: 25,
        fontSize: 20,
    },
    outerContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    container: {
        width: '90%',
        height: '40%',
    },
    button: {
        paddingHorizontal: '15%',
        paddingVertical: 20,
        borderRadius: 5,
        borderColor: theme.palette.borderColor,
        borderWidth: 1,
        backgroundColor: theme.palette.orange,
    },
    buttonText: {
        color: 'white',
        ...theme.typography.button,
        fontSize: 16,
    },
    imageBackground: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '5%',
    },
});
