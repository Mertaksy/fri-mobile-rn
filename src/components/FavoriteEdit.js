import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Context as AppContext } from '../context/AppContext';
import theme from '../theme';
import moreIcon from '../../assets/icons/more-button.png';
import ActionConfirmationModal from './ActionConfirmationModal';
import ApiErrors from '../api/errors';
import * as UserApi from '../api/user';
import InputModal from './InputModal';

const FavoriteEdit = ({ uuid, setState, state }) => {
    const [shouldShowPopUp, setShouldShowPopUp] = useState(false);
    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const { syncFavoriteLists } = useContext(AppContext);

    const handleDeleteButton = () => {
        setIsDeleteConfirmModalVisible(true);
    };

    const handleEditName = () => {
        setIsEditModalVisible(true);
    };

    // triggered when delete action is confirmed
    useEffect(() => {
        const deleteFavoriteList = async () => {
            try {
                const response = await UserApi.removeFavoriteList(uuid);
                if (response.data.success) {
                    await syncFavoriteLists();
                }
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
            setState({ ...state, isLoading: false });
        };

        if (!isDeleteConfirmed || !uuid) {
            return;
        }
        setState({ ...state, isLoading: true });
        try {
            deleteFavoriteList();
            setIsDeleteConfirmed(false);
            setIsDeleteConfirmModalVisible(false);
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    }, [isDeleteConfirmed]);

    const editName = () => {
        // get input
        // make is loading visible
        // make api call
        if (!userInput) {
            return;
        }
        setState({ ...state, isLoading: true });
        try {
            (async function () {
                const response = await UserApi.renameFavoritesList(uuid, userInput);
                if (response.data.success) {
                    await syncFavoriteLists();
                }
                setState({ ...state, isLoading: false });
            })();
            setIsEditModalVisible(false);
            setUserInput('');
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    return (
        <>
            <View>
                {shouldShowPopUp ? (
                    <View style={styles.popup}>
                        <TouchableOpacity style={[styles.option, styles.topOption]} onPress={handleDeleteButton}>
                            <Text style={styles.text}>Sil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={handleEditName}>
                            <Text style={styles.text}>Düzenle</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <TouchableOpacity style={{ padding: 5 }} onPress={() => setShouldShowPopUp(!shouldShowPopUp)}>
                    <Image source={moreIcon} resizeMode="contain" style={styles.moreIcon} />
                </TouchableOpacity>
            </View>
            <ActionConfirmationModal
                text="Bu listeyi silmek istediğinize emin misiniz?"
                setIsActionConfirmed={setIsDeleteConfirmed}
                isModalVisible={isDeleteConfirmModalVisible}
                setIsModalVisible={setIsDeleteConfirmModalVisible}
            />
            <InputModal
                buttonText="Güncelle"
                setIsVisible={setIsEditModalVisible}
                isVisible={isEditModalVisible}
                onPress={editName}
                onTextChange={(input) => setUserInput(input)}
                userInput={userInput}
                title="Liste Adını Değiştir"
                inputLabel="Liste Adı"
            />
        </>
    );
};

const styles = StyleSheet.create({
    popup: {
        borderRadius: 5,
        borderColor: theme.palette.borderColor,
        borderWidth: 1,
        padding: 10,
        position: 'absolute',
        width: 100,
        left: '-250%',
        top: '-210%',
        backgroundColor: 'white',
    },
    moreIcon: {
        width: 20,
        height: 20,
    },
    text: {
        paddingLeft: 5,
        color: theme.palette.gray,
    },
    option: {
        paddingVertical: 8,
        paddingRight: 15,
    },
    topOption: {
        borderBottomWidth: 1,
        borderColor: theme.palette.borderColor,
    },
});

export default FavoriteEdit;
