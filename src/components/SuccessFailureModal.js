import React, { useContext } from 'react';
import { StyleSheet, Modal, View, ImageBackground, Image } from 'react-native';
import BtText from './BtText';
import BtButton from './BtButton';
import modalBg from '../../assets/images/modal-bg.png';
import successIcon from '../../assets/icons/successIcon.png';
import failureIcon from '../../assets/icons/failureIcon.png';
import { Context as AppContext } from '../context/AppContext';

const SuccessFailureModal = () => {
    const { successFailureModalVisibility, successFailureModalType } = useContext(AppContext).state;
    const { setSuccessFailureModalVisibility, setSuccessFailureModalType } = useContext(AppContext);

    return (
        <Modal transparent={true} visible={successFailureModalVisibility} animationType={'fade'} style={styles.modal}>
            <View style={styles.outerContainer}>
                <View resizeMode={'stretch'} style={styles.innerContainer}>
                    <ImageBackground source={modalBg} style={styles.imageBackground} resizeMode="stretch">
                        <View style={styles.contentContainer}>
                            <View style={styles.topContainer}>
                                <Image source={successFailureModalType === 'success' ? successIcon : failureIcon} width="40" height="40" />
                                <BtText type="title1" style={styles.modalElement} color="green">
                                    {successFailureModalType === 'success' ? 'Tebrikler!' : 'Üzgünüz!'}
                                </BtText>
                                <BtText type="body" style={styles.modalElement} color="green">
                                    {successFailureModalType === 'success'
                                        ? 'İşlemin başarıyla tamamlanmıştır'
                                        : 'İşlemini gerçekleştiremedik.İstersen tekrar deneyebilirsin'}
                                </BtText>
                            </View>
                            <BtButton
                                variant="orange"
                                onPress={setSuccessFailureModalVisibility}
                                label={successFailureModalType === 'success' ? 'DEVAM ET' : 'TAMAM'}
                                style={styles.button}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {},
    outerContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '90%',
        height: 350,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        paddingVertical: 40,
        paddingHorizontal: '10%',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 50,
    },
    modalElement: {
        marginTop: 15,
        textAlign: 'center',
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SuccessFailureModal;
