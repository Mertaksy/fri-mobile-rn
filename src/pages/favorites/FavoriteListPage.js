import React, { useReducer, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { BtText, BtButton, BtLoader } from '../../components';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import { Context as AppContext } from '../../context/AppContext';
import flower from '../../../assets/icons/flower.png';
import FavoriteEdit from '../../components/FavoriteEdit';
import InputModal from '../../components/InputModal';

const initialState = {
    showModal: false,
    newListName: '',
    listTitle: '',
    apiErrors: {},
    isLoading: false,
    favoriteType: 'tarif',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const FavoriteListPage = ({ navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const AppState = useContext(AppContext).state;
    const { syncFavoriteLists } = useContext(AppContext);

    useEffect(() => {
        syncFavoriteLists();
    }, [navigation]);

    const getFavoritesLists = async () => {
        setState({ ...state, isLoading: true });
        syncFavoriteLists();
        setState({ ...state, isLoading: false });
    };

    const addNewList = async () => {
        try {
            const response = await UserAPI.addFavoritesList(state.favoriteType, state.newListName);
            const data = response.data;
            if (data.success) {
                setState({ ...state, showModal: false, newListName: '' });
                syncFavoriteLists();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
            }
        }
    };

    const cardWidth = Dimensions.get('window').width - 40;

    const viewImages = (favorites) => {
        let _favorites = [...favorites];
        let optionData = [];
        for (let index = 0; index < 4; index++) {
            if (!_favorites[index]) {
                _favorites[index] = null;
            }
            optionData.push(_favorites[index]);
        }
        return (
            <View style={[styles.listContainer, { height: cardWidth }]}>
                {optionData.map((item, index) => {
                    if (item) {
                        return (
                            <Image
                                style={{ width: '49%', height: '49%', marginTop: index > 1 ? '2%' : 0 }}
                                key={index}
                                source={{ uri: item.favorite_data.mobile_image_url }}
                            ></Image>
                        );
                    }
                    return (
                        <View
                            style={{
                                width: '49%',
                                height: '49%',
                                backgroundColor: '#f4f3f0',
                                marginTop: index > 1 ? '2%' : 0,
                            }}
                        ></View>
                    );
                })}
            </View>
        );
    };
    const onRefresh = async () => {
        await getFavoritesLists();
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />}>
                    <Image source={flower} style={styles.flower} />
                    <View style={{ padding: 20 }}>
                        <View>
                            <View style={styles.headerTitle}>
                                <BtText type="title3" color="lightBlue" style={{ marginBottom: 5 }}>
                                    Tariflerim
                                </BtText>
                            </View>
                            <BtButton
                                label="Yeni Favori Listesi Oluştur"
                                icon={'filledPlus'}
                                style={{
                                    flex: 1,
                                    width: '100%',

                                    backgroundColor: 'rgba(186, 228, 238, 0.2)',
                                }}
                                onPress={() => {
                                    setState({ ...state, showModal: true, favoriteType: 'tarif' });
                                }}
                            />
                            {AppState.favoriteLists.map((option, key) => {
                                if (option.type !== 'tarif') {
                                    return null;
                                }
                                return (
                                    <View>
                                        <View style={[styles.btnStyle]} key={key}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('FavoritesPage', { favoriteList: option });
                                                }}
                                            >
                                                {viewImages(option.favorites)}
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View>
                                                <BtText type="title3" style={{ marginVertical: 5 }}>
                                                    {option.title}
                                                </BtText>
                                                <BtText type="body">{option.favorites_count} tarif</BtText>
                                            </View>
                                            {option.title === 'Tarifler' ? null : (
                                                <FavoriteEdit uuid={option.uuid} setState={setState} state={state} />
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{ marginVertical: 30 }}>
                            <View style={styles.headerTitle}>
                                <BtText type="title3" color="lightBlue" style={{ marginBottom: 5 }}>
                                    Yazılarım
                                </BtText>
                            </View>
                            <BtButton
                                label="Yeni Favori Listesi Oluştur"
                                icon={'filledPlus'}
                                style={{
                                    flex: 1,
                                    width: '100%',

                                    backgroundColor: 'rgba(186, 228, 238, 0.2)',
                                }}
                                onPress={() => {
                                    setState({ ...state, showModal: true, favoriteType: 'yazi' });
                                }}
                            />
                            {AppState.favoriteLists.map((option, key) => {
                                if (option.type !== 'yazi') {
                                    return null;
                                }
                                return (
                                    <View>
                                        <View style={[styles.btnStyle]} key={key}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('FavoritesPage', { favoriteList: option });
                                                }}
                                            >
                                                {viewImages(option.favorites)}
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View>
                                                <BtText type="title3" style={{ marginVertical: 5 }}>
                                                    {option.title}
                                                </BtText>
                                                <BtText type="body">
                                                    {option.favorites_count}{' '}
                                                    {option.title === 'Köşe Yazıları' ? 'köşe yazısı' : 'blog içerği'}
                                                </BtText>
                                            </View>
                                            {option.title === 'Blog' || option.title === 'Köşe Yazıları' ? null : (
                                                <FavoriteEdit uuid={option.uuid} setState={setState} state={state} />
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <InputModal
                            addNewList={addNewList}
                            onChangeText={(newListName) => setState({ newListName })}
                            closeModal={() => {
                                setState({ showModal: false });
                            }}
                            isVisible={state.showModal}
                            userInput={state.newListName}
                            title="Yeni Favori Listesi Oluştur"
                            buttonText="OLUŞTUR"
                            inputLabel="Liste Adı"
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default FavoriteListPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    moreIcon: {
        width: 20,
        height: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 80,
    },
    btnStyle: {
        overflow: 'hidden',
        marginTop: 30,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(229, 229, 229,0.4)',
        paddingBottom: 10,
    },
    flower: {
        zIndex: 0,
        position: 'absolute',
        top: -130,
        right: -55,
        transform: [{ scale: 0.3 }],
    },
    listContainer: {
        overflow: 'hidden',
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
