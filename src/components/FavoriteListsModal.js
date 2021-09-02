import React, { useRef, useContext } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import modalBg from '../../assets/images/modal-bg.png';
import BtText from './BtText';
import { Context as AppContext } from '../context/AppContext';
import PlusSvg from '../../assets/icons/plus.svg';
import Theme from '../theme';
import CrossIcon from './CrossIcon';

const FavoriteListsModal = ({ visible, setVisible, setListCreationModalVisibility, contentType, addFavorite }) => {
    const scrollView = useRef(null);
    const AppState = useContext(AppContext).state;

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.centeredView} onPress={() => setVisible(false)}>
                <View style={styles.modal}>
                    <ImageBackground resizeMode="stretch" source={modalBg} style={styles.modalBackground}>
                        <CrossIcon onPress={() => setVisible(false)} containerStyle={styles.modalCloseBtn} type="green" />
                        <View style={styles.modalBody}>
                            <BtText type="title1" color="green" style={{ marginBottom: 10 }}>
                                Ekleyeceğin Listeyi Seç
                            </BtText>
                            <ScrollView
                                style={styles.scrolView}
                                onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
                                ref={scrollView}
                            >
                                {AppState.favoriteLists.map((list, idx) => {
                                    if (list.type === contentType) {
                                        return (
                                            <TouchableOpacity key={idx} onPress={() => addFavorite(list.uuid)} style={styles.listItemBtn}>
                                                <BtText type="gilroy16M" color="green" style={styles.listItemLabel}>
                                                    {list.title}
                                                </BtText>
                                            </TouchableOpacity>
                                        );
                                    }
                                })}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.newListButton}
                                onPress={() => {
                                    setVisible(false);
                                    setListCreationModalVisibility(true);
                                }}
                            >
                                <View style={styles.newListInnerContainer}>
                                    <Text style={styles.newListText}>Yeni Liste Oluştur</Text>
                                    <View style={styles.newListIcon}>
                                        <PlusSvg width={15} height={15} fill="#000" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    scrolView: {
        marginBottom: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalBackground: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    modalBody: {
        height: '100%',
        paddingVertical: 50,
        paddingHorizontal: '5%',
    },
    modalCloseBtn: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    modal: {
        borderRadius: 15,
        marginHorizontal: 20,
        height: '60%',
    },
    newListIcon: {
        backgroundColor: Theme.palette.orange,
        padding: 8,
        borderRadius: 5,
    },
    newListText: {
        ...Theme.typography.strong,
        color: Theme.palette.green,
        lineHeight: 25,
        fontSize: 14,
    },
    newListInnerContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    newListButton: {
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Theme.palette.borderColor,
    },
    listItemBtn: {
        borderTopColor: 'rgba(229, 229, 229,0.4)',
        borderTopWidth: 1,
        paddingVertical: 20,
    },
});

export default FavoriteListsModal;
