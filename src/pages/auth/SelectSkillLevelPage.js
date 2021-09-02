// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { BtText, BtButton, BtLinkButton, BtInput, BtCheckButton } from '../../components';
import { useContext, useEffect, useReducer } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import LeftArrow from '../../../assets/icons/back.svg';
const modalBgImage = require('../../../assets/images/modal-bg.png');

const initialState = {
    pisirmebecerileri: [],
    availableOptions: [],
};

const reducer = (state, newState) => ({ ...state, ...newState });

const SelectSkillLevelPage = ({ route, navigation, shouldRedirectToCart }) => {
    const [state, setState] = useReducer(reducer, initialState);

    // Global context state
    const AppState = useContext(AppContext).state;
    // Global context actions
    const {} = useContext(AppContext);
    const { params } = route;
    // console.log('paramsSelectSkillLevelPage', params);
    useEffect(() => {
        const availableOptions = AppState.userAvailablePreferences.filter((option) => option.key === 'pisirmebecerileri');
        setState({ availableOptions });
    }, []);

    const onSelectOption = (value) => {
        let pisirmebecerileri = [value];
        setState({ pisirmebecerileri });
    };

    const goPage = async () => {
        navigation.navigate('SelectSkillsPage', {
            tariftercihleri: params.tariftercihleri,
            pisirmebecerileri: state.pisirmebecerileri,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                <View style={styles.innerContainer}>
                    <BtText type="title1" style={{ marginBottom: 9 }} color="green">
                        Seni Biraz Tanıyalım
                    </BtText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BtText>Yemek Pişirme Becerilerinizi Nasıl Tanımlarsın?</BtText>
                        <BtText>2/3</BtText>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 30 }}>
                        {state.availableOptions.map((option, key) => {
                            return (
                                <BtCheckButton
                                    key={key}
                                    variant="green"
                                    label={option.title}
                                    selected={state.pisirmebecerileri.includes(option.value)}
                                    onPress={() => onSelectOption(option.value)}
                                />
                            );
                        })}
                    </View>
                    <BtButton label="DEVAM ET" variant="orange" onPress={goPage} btnStyle={{ width: '50%', alignSelf: 'center' }} />
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

export default SelectSkillLevelPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
});
