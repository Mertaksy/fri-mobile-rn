import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HeartGreenSvg from '../../assets/icons/heart_green.svg';
import HeartFullSvg from '../../assets/icons/heart_full.svg';
import { Context as AppContext } from '../context/AppContext';
import * as UserAPI from '../api/user';
import ApiErrors from '../api/errors';
import InputModal from './InputModal';
import FavoriteListsModal from './FavoriteListsModal';

const BtFavoriteButton = ({ slug, contentType, disabled, navigation }) => {
    const [favoriteListsModalVisibility, setFavoriteListsModalVisibility] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [listCreationModalVisibility, setListCreationModalVisibility] = useState(false);

    const AppState = useContext(AppContext).state;
    const { syncFavoriteLists } = useContext(AppContext);
    let Btn;

    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    const showFavoriteListsModal = () => {
        if (AppState.userData) {
            setFavoriteListsModalVisibility(true);
        } else {
            navigation.navigate('AuthScreenStack');
        }
    };

    const removeFavorite = async () => {
        try {
            const listItem = getListItem();
            const response = await UserAPI.removeFavorites(listItem.uuid, contentType, slug);
            const data = response.data;
            if (data.success && data.is_deleted) {
                syncFavoriteLists();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setFavoriteListsModalVisibility(false);
    };

    const checkIfAdded = () => {
        let isAdded = false;
        AppState.favoriteLists.map((listItem) => {
            listItem.favorites.map((favorite) => {
                if (favorite.favorite_data.slug === slug) {
                    isAdded = true;
                }
            });
        });
        return isAdded;
    };

    const getListItem = () => {
        let list = null;
        AppState.favoriteLists.map((listItem) => {
            listItem.favorites.map((favorite) => {
                if (favorite.favorite_data.slug === slug) {
                    list = listItem;
                }
            });
        });
        return list;
    };

    const addNewList = async () => {
        try {
            const response = await UserAPI.addFavoritesList(contentType, newListName);
            const data = response.data;
            if (data.success) {
                setNewListName('');
                syncFavoriteLists();
                setListCreationModalVisibility(false);
                setFavoriteListsModalVisibility(true);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };

    const addFavorite = async (list_uuid) => {
        try {
            // ContentType difference can introduce problems when different types of content become favoritable
            const response = await UserAPI.addFavorites(list_uuid, contentType === 'yazi' ? 'freetext' : contentType, slug);
            const data = response.data;
            if (data.success && !data.already_exists) {
                syncFavoriteLists();
                setFavoriteListsModalVisibility(false);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setVisible(false);
    };

    return (
        <>
            {checkIfAdded() ? (
                <Btn onPress={() => removeFavorite()} style={styles.button}>
                    <HeartFullSvg width={20} height={20} />
                </Btn>
            ) : (
                <Btn onPress={showFavoriteListsModal} style={styles.button}>
                    <HeartGreenSvg width={20} height={20} />
                </Btn>
            )}

            <FavoriteListsModal
                visible={favoriteListsModalVisibility}
                setVisible={setFavoriteListsModalVisibility}
                setListCreationModalVisibility={setListCreationModalVisibility}
                addFavorite={addFavorite}
                contentType={contentType}
            />
            <InputModal
                addNewList={addNewList}
                onChangeText={(newListName) => setNewListName(newListName)}
                closeModal={() => {
                    setListCreationModalVisibility(false);
                    setFavoriteListsModalVisibility(true);
                }}
                isVisible={listCreationModalVisibility}
                newListName={newListName}
                title="Yeni Favori Listesi Oluştur"
                buttonText="OLUŞTUR"
                inputLabel="Liste Adı"
            />
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
    },
});

export default BtFavoriteButton;
