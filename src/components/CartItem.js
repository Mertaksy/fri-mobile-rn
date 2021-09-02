import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, SafeAreaView, Modal } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import EmptyCircleSvg from '../../assets/icons/empty_circle.svg';
import CheckCircleSvg from '../../assets/icons/check_circle_green.svg';
import BtButton from './BtButton';
import { Context as AppContext } from '../context/AppContext';
import * as UserAPI from '../api/user';
import ApiErrors from '../api/errors';
import CrossSvg from '../../assets/icons/cross.svg';
import BagGreenSvg from '../../assets/icons/bag_green.svg';

const CardItem = (props) => {
    const { onPress, navigation, data = {}, onRefresh } = props;
    const AppState = useContext(AppContext).state;
    const { syncFavoriteLists } = useContext(AppContext);

    const [isTraditional, setIsTraditional] = useState(false);
    const [selections, setSelections] = useState({});
    const [deletedItem, setDeletedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalDeleteAll, setShowModalDeleteAll] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [cartIngredients, setCartIngredients] = useState(data.cart_ingredients);

    useEffect(() => {
        let _selections = {};
        cartIngredients.map((item, index) => {
            _selections[item.ingredient.slug] = true;
        });
        setSelections(_selections);
    }, []);

    const Btn = TouchableOpacity;

    const addCart = async (ingredients) => {
        try {
            const response = await UserAPI.addCart(props.data.slug, ingredients);
            const data = response.data;
            if (data && data.success) {
                if (data.added_ingredients && data.added_ingredients.length > 0) {
                    updateItemUuid(data.added_ingredients[0]);
                    setShowModal(false);
                }
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
        }
    };

    const hideAddModal = () => {
        setShowModalAdd(false);
    };

    const deleteItem = async () => {
        try {
            const response = await UserAPI.deleteItem(deletedItem.cart_uuid);
            if (response.data.success) {
                updateSelection(deletedItem.ingredient.slug);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setShowModal(false);
        setDeletedItem(null);
    };
    const deleteRecipe = async () => {
        try {
            const response = await UserAPI.deleteRecipeFromCart(data.slug);
            if (response.data.success) {
                onRefresh();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setShowModalDeleteAll(false);
    };
    const openModalForSelection = (item) => {
        if (selections[item.ingredient.slug]) {
            setShowModal(true);
            setDeletedItem(item);
        } else {
            addCart(item.ingredient.slug);
            updateSelection(item.ingredient.slug);
        }
    };

    const getFavoritesListUUID = async () => {
        try {
            const response = await UserAPI.getFavoritesList();
            if (response.data.success) {
                const favoritesList = response.data.favoritelist.find((favoriteObj) => favoriteObj.title === 'Tarifler');
                return favoritesList.uuid;
            }
            return;
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const deleteRecipeAndAddFavorite = async () => {
        setShowModalDeleteAll(false);
        const uuid = await getFavoritesListUUID();
        await deleteRecipe();
        addFavorite(uuid);
    };

    const updateItemUuid = (addedIngredient) => {
        let _cartIngredients = [...cartIngredients];
        _cartIngredients.map((item) => {
            if (item.ingredient.slug == addedIngredient.ingredient) {
                item.cart_uuid = addedIngredient.cart_uuid;
            }
            return item;
        });
        setCartIngredients(_cartIngredients);
    };

    const updateSelection = (slug) => {
        let _selections = { ...selections };
        _selections[slug] = !selections[slug];
        setSelections(_selections);
    };
    const addFavorite = async (list_uuid) => {
        try {
            const response = await UserAPI.addFavorites(list_uuid, 'tarif', data.slug);
            const _responseData = response.data;
            if (_responseData.success && !_responseData.already_exists) {
                syncFavoriteLists();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
        }
        hideAddModal();
    };

    return (
        <SafeAreaView style={styles.cardMain}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <Image style={styles.cartItemImage} source={{ uri: data.mobile_image_url }} />
                    <BtText type="title5" color="green" style={styles.cardTitle}>
                        {data.title}
                    </BtText>
                </View>
                <Btn
                    onPress={() => {
                        setShowModalDeleteAll(true);
                    }}
                >
                    <CrossSvg width={12} height={12} />
                </Btn>
            </View>
            <View style={styles.cardBody}>
                {cartIngredients.map((item, index) => (
                    <Btn key={index} onPress={() => openModalForSelection(item)}>
                        <View style={styles.cardItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.cardItemDot}></View>
                                <BtText type="title5Gilroy" style={styles.cardItemDescription}>
                                    {`${item.ingredient.title} - ${item.unit} ${item.modern_unit.title}`}
                                </BtText>
                            </View>
                            {selections[item.ingredient.slug] ? (
                                <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                            ) : (
                                <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                            )}
                        </View>
                    </Btn>
                ))}
            </View>
            <Modal animationType="fade" transparent={true} visible={showModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Btn
                            onPress={() => {
                                setShowModal(false);
                            }}
                            style={{
                                alignSelf: 'flex-end',
                            }}
                        >
                            <CrossSvg width={20} height={20} />
                        </Btn>
                        <View>
                            <View style={[styles.iconCart]}>
                                <BagGreenSvg width={20} height={20} />
                                <View style={styles.badge}>
                                    <BtText style={styles.badgeLabel} color="white" type="title3">
                                        !
                                    </BtText>
                                </View>
                            </View>
                        </View>
                        <BtText type="title1" color="green" style={{ textAlign: 'center', marginVertical: 15 }}>
                            Emin misin?
                        </BtText>
                        <BtText style={{ textAlign: 'center' }}>Malzemeyi sepetinden çıkarmak istediğine emin misin?</BtText>
                        <View style={{ marginTop: 20, flexDirection: 'row' }}>
                            <BtButton onPress={() => setShowModal(false)} label="VAZGEÇ" btnStyle={{ flex: 1, marginHorizontal: 10 }} />
                            <BtButton onPress={deleteItem} label="SİL" btnStyle={{ flex: 1, marginHorizontal: 10 }} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={showModalDeleteAll}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Btn
                            onPress={() => {
                                setShowModalDeleteAll(false);
                            }}
                            style={{
                                alignSelf: 'flex-end',
                            }}
                        >
                            <CrossSvg width={20} height={20} />
                        </Btn>

                        <BtText type="title1" color="green" style={{ margin: 10 }}>
                            Sil ve Favorilere Ekle
                        </BtText>
                        <BtText style={{ marginHorizontal: 10 }}>
                            Çilekli Magnolia tarifini sepetinden çıkardıktan sonra favoriye eklemek ister misin?
                        </BtText>
                        <View style={{ marginTop: 20 }}>
                            <BtButton onPress={deleteRecipe} label="SİL" btnStyle={{ marginHorizontal: 10 }} />
                            <BtButton
                                onPress={deleteRecipeAndAddFavorite}
                                label="SİL VE FAVORİLERİME EKLE"
                                btnStyle={{ marginHorizontal: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default CardItem;

const styles = StyleSheet.create({
    cardMain: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        padding: 5,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingVertical: 15,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    cartItemImage: {
        borderRadius: 8,
        width: 53,
        height: 53,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardFooterTitle: {
        paddingVertical: 15,
        textAlign: 'right',
    },
    cardItemDescription: {},
    cardItemDot: {
        width: 4,
        height: 4,
        backgroundColor: Theme.palette.green,
        marginRight: 10,
        borderRadius: 2,
    },
    selectorBtn: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedBtn: {
        backgroundColor: '#fff',
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
        backgroundColor: '#bae4ee',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    badge: {
        backgroundColor: '#ff5f0e',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -3,
        right: 0,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
});
