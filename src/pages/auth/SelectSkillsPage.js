// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { BtText, BtButton, BtLinkButton, BtCheckButton } from '../../components';
import { useContext, useEffect, useReducer } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import * as ContentAPI from '../../api/content';
import LeftArrow from '../../../assets/icons/back.svg';
import SelectAllButton from '../../components/SelectAllButton';

const modalBgImage = require('../../../assets/images/modal-bg.png');

const initialState = {
    favorikategoriler: [],
    availableOptions: [],
    isAllSelected: false,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const SelectSkillsPage = ({ route, navigation, shouldRedirectToCart }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;
    // Global context actions
    const { setUserPreferences } = useContext(AppContext);
    const { params } = route;

    const sortCategoriesAlphabetically = function (categoryArr) {
        return categoryArr.sort((curCategory, nextCategory) => {
            const curCategoryName = curCategory.name.toLocaleLowerCase();
            const nextCategoryName = nextCategory.name.toLocaleLowerCase();

            return curCategoryName.localeCompare(nextCategoryName);
        });
    };

    const fetchAvailableCategories = async () => {
        try {
            const response = await ContentAPI.getAllCategoriesByType('tarif');
            if (response.data.success) {
                const availableOptions = sortCategoriesAlphabetically(response.data.categories);
                setState({ ...state, availableOptions });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    useEffect(() => {
        fetchAvailableCategories();
    }, []);

    const onSelectOption = (value) => {
        let favorikategoriler = state.favorikategoriler;
        if (favorikategoriler.includes(value)) {
            favorikategoriler = favorikategoriler.filter((option) => option !== value);
        } else {
            favorikategoriler.push(value);
        }
        setState({ ...state, favorikategoriler });
    };

    const onSave = async () => {
        try {
            setState({ apiErrors: {} });
            const postData = {
                secenekler: JSON.stringify({
                    tariftercihleri: params.tariftercihleri,
                    pisirmebecerileri: params.pisirmebecerileri,
                    favorikategoriler: state.favorikategoriler,
                }),
            };

            const response = await UserAPI.setUserPreferences(postData);
            const data = response.data;

            if (data.success) {
                setUserPreferences(data.preferences);
                if (shouldRedirectToCart) {
                    navigation.navigate('Cart');
                }
                navigation.navigate('TabBarStackNavigator');
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            setState({ apiErrors: responseParsed.errors });
        }
    };

    const handleSelectAll = () => {
        if (state.isAllSelected) {
            setState({ ...state, isAllSelected: false, favorikategoriler: [] });
            return;
        }
        setState({ ...state, isAllSelected: true, favorikategoriler: state.availableOptions.map((option) => option.slug) });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <View style={styles.innerContainer}>
                    <BtText type="title1" style={{ marginBottom: 9 }} color="green">
                        Seni Biraz Tanıyalım
                    </BtText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BtText>Favori yemek kategorilerini seç.</BtText>
                        <BtText>3/3</BtText>
                    </View>
                    <SelectAllButton isAllSelected={state.isAllSelected} onPress={handleSelectAll} style={styles.isAllSelected} />
                    <ScrollView style={{ maxHeight: 315, marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {state.availableOptions.map((option, key) => {
                                return (
                                    <BtCheckButton
                                        key={key}
                                        label={option.name}
                                        selected={state.favorikategoriler.includes(option.slug)}
                                        onPress={() => onSelectOption(option.slug)}
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                    <View style={styles.divider}></View>
                    <BtButton label="PİŞİRMEYE BAŞLA" variant="orange" onPress={onSave} />
                    <View style={styles.goBack}>
                        <LeftArrow width={13} height={10} style={styles.icon} />
                        <BtLinkButton type="linkButtonSmall" label="GERİ DÖN" onPress={() => navigation.goBack()} />
                    </View>
                </View>
                <BtLinkButton
                    type="linkButtonSmall"
                    label="Kişiselleştirmeyi atla"
                    style={{ marginBottom: 50 }}
                    onPress={() => {
                        if (shouldRedirectToCart) {
                            navigation.navigate('Cart');
                        }

                        navigation.navigate('TabBarStackNavigator');
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SelectSkillsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    isAllSelected: {
        marginTop: 20,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    text: {
        color: 'grey',
        fontSize: 30,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 5,
        alignSelf: 'flex-start',
        marginTop: 6,
    },
    goBack: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        marginTop: 10,
        marginBottom: 10,
    },
});
