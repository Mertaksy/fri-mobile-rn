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
import SortOrangeSvg from '../../assets/icons/sort_orange.svg';
import TimeSvg from '../../assets/icons/time.svg';

const letters = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
const SortButton = (props) => {
    const { handleSort, color } = props;
    const [showModal, setShowModal] = useState(false);
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    const sort = (sortType) => {
        handleSort(sortType);
        setShowModal(false);
    };
    return (
        <View style={styles.inputWrapper}>
            <Btn onPress={() => setShowModal(true)} style={styles.btnStyle}>
                {color === 'orange' ? <SortOrangeSvg style={styles.inputIcon} /> : <SortSvg style={styles.inputIcon} />}
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
                            <Btn style={[styles.selectionBtn]} onPress={() => sort('recent')}>
                                <BtText>En Yeniler</BtText>
                            </Btn>
                            {/*<Btn style={[styles.selectionBtn]} onPress={() => sort('top')}>*/}
                            {/*    <BtText>En Popüler</BtText>*/}
                            {/*</Btn>*/}
                            <Btn style={[styles.selectionBtn]} onPress={() => sort('ascending')}>
                                <BtText>Alfabetik</BtText>
                            </Btn>
                        </View>
                    </View>
                </Btn>
            </Modal>
        </View>
    );
};

export default SortButton;

const styles = StyleSheet.create({
    inputWrapper: {
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
    },
    inputIcon: {
        width: 26,
        height: 26,
    },
    selectionBtn: {
        backgroundColor: '#f4f3f0',
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#f4f3f0',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
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
    },
});
