import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, Modal } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import EmptyCircleSvg from '../../assets/icons/empty_circle.svg';
import CheckCircleSvg from '../../assets/icons/check_circle.svg';
import BtButton from './BtButton';
import { Context as AppContext } from '../context/AppContext';
import * as UserAPI from '../api/user';
import ApiErrors from '../api/errors';
import CrossSvg from '../../assets/icons/cross.svg';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardFoodList = (props) => {
    const { onPress, navigation, data = [], shouldShowCartButton, slug } = props;
    const AppState = useContext(AppContext).state;
    const { setUserCart } = useContext(AppContext);

    const [isTraditional, setIsTraditional] = useState(false);
    const [selections, setSelections] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let _selections = {};
        data.map((item, index) => {
            _selections[item.ingredient.slug] = true;
        });

        setSelections(_selections);
    }, []);

    const Btn = TouchableOpacity;

    const addtoCart = async () => {
        try {
            if (!AppState.userData) {
                await AsyncStorage.setItem('unauthCart', JSON.stringify({ ingredients: selections, recipe_slug: slug }));
                navigation.navigate('AuthScreenStack', { shouldRedirectToCart: true });
            } else {
                const ingredients = Object.keys(selections)
                    .filter((item) => {
                        return selections[item];
                    })
                    .join(',');
                addCart(ingredients);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getCart = async () => {
        try {
            const response = await UserAPI.getCart();
            const data = response.data;
            if (data.success) {
                setUserCart(data.cart);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const addCart = async (ingredients) => {
        try {
            const response = await UserAPI.addCart(props.slug, ingredients);
            if (response.data && response.data.success) {
                setShowModal(true);
                getCart();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
        }
    };
    const updateSelection = (slug) => {
        let _selections = { ...selections };
        _selections[slug] = !selections[slug];
        setSelections(_selections);
    };
    const updateSelectionAll = (slug) => {
        let _selections = {};
        data.map((item, index) => {
            _selections[item.ingredient.slug] = !isAllSelected;
        });
        setSelections(_selections);
    };
    const goChart = () => {
        setShowModal(false);
        navigation.navigate('Cart') || navigation.navigate('CartPage');
    };
    const isAllSelected = !Object.keys(selections).some((item) => selections[item] === false);
    const isBtnDisabled = !Object.keys(selections).some((item) => selections[item] === true);

    return (
        <View style={styles.cardMain}>
            <View style={styles.cardHeader}>
                <DotsSvg width={24} height={24} style={styles.cardHeaderIcon} />
                <BtText type="title5Gilroy" color="yellow" style={styles.cardTitle}>
                    MALZEME KAPINA GELSİN
                </BtText>
            </View>
            <View style={styles.unitOptions}>
                <Btn onPress={() => setIsTraditional(true)} style={[styles.selectorBtn, isTraditional && styles.selectedBtn]}>
                    <View style={{}}>
                        <BtText type="title5Gilroy" color={isTraditional ? 'green' : 'white'}>
                            Geleneksel
                        </BtText>
                    </View>
                </Btn>
                <Btn onPress={() => setIsTraditional(false)} style={[styles.selectorBtn, !isTraditional && styles.selectedBtn]}>
                    <View style={{}}>
                        <BtText type="title5Gilroy" color={isTraditional ? 'white' : 'green'}>
                            Sayısal (gr)
                        </BtText>
                    </View>
                </Btn>
            </View>
            <View style={styles.cardBody}>
                {data.map((item, index) => {
                    const isSponsored = item.ingredient.is_sponsored;
                    return (
                        <Btn key={index} onPress={() => updateSelection(item.ingredient.slug)}>
                            <View style={styles.cardItem}>
                                <BtText type="title5Gilroy" style={styles.cardItemDescription}>
                                    {isTraditional
                                        ? `${item.ingredient.title} (${item.traditional_unit} ${item.traditionalunit.title})`
                                        : `${item.ingredient.title} (${item.modern_unit} ${item.modernunit.title})`}
                                </BtText>
                                {isSponsored ? (
                                    <Image source={{ uri: item.ingredient.image_sponsor }} style={styles.sponsorIcon} alt="sponsor icon" />
                                ) : null}
                                {shouldShowCartButton ? (
                                    <>
                                        {selections[item.ingredient.slug] ? (
                                            <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                        ) : (
                                            <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                        )}
                                    </>
                                ) : null}
                            </View>
                        </Btn>
                    );
                })}
            </View>
            <View style={styles.cardFooter}>
                {shouldShowCartButton ? (
                    <>
                        <Btn onPress={() => updateSelectionAll()}>
                            <View style={styles.cardItem}>
                                <BtText type="title5Gilroy" color="white" style={styles.cardFooterTitle}>
                                    {isAllSelected ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                                </BtText>
                                {isAllSelected ? (
                                    <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                ) : (
                                    <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                )}
                            </View>
                        </Btn>
                        <BtButton
                            disabled={isBtnDisabled}
                            label="MALZEMELERİ SEPETE EKLE"
                            style={styles.addToCart}
                            variant="orange"
                            onPress={addtoCart}
                        />
                    </>
                ) : null}
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

                        <BtText type="title1" color="green" style={{ margin: 15 }}>
                            Malzemeler sepete eklenmiştir.
                        </BtText>
                        <BtText color="green" style={{ marginHorizontal: 15 }}>
                            Malzemelerini sepete ekledik, şimdi istegelsin’den sipariş ver!
                        </BtText>
                        <View style={{ marginTop: 40 }}>
                            <BtButton onPress={goChart} label="SEPETE GİT" variant="orange" btnStyle={{ marginHorizontal: 10 }} />
                            <BtButton onPress={() => setShowModal(false)} label="GERİ DÖN" btnStyle={{ marginHorizontal: 10 }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CardFoodList;

const styles = StyleSheet.create({
    cardMain: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Theme.palette.green,
    },
    addToCart: {
        marginVertical: 10,
    },
    sponsorIcon: {
        width: 40,
        height: 40,
    },
    unitOptions: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    cardHeader: {
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
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        minHeight: 60,
    },
    cartItemImage: {
        borderRadius: 8,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardFooter: {
        padding: 5,
    },
    cardFooterTitle: {
        paddingVertical: 15,
        textAlign: 'left',
        width: '70%',
    },
    cardItemDescription: {
        color: '#fff',
        width: '70%',
    },
    selectorBtn: {
        height: 40,
        borderRadius: 10,
        borderColor: '#fff',
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
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
    },
});
