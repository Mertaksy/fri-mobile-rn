import React, { useReducer, useContext, useEffect } from 'react';
import { Context as AppContext } from '../../context/AppContext';
import { View, StyleSheet, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import BtText from '../../components/BtText';
import BtButton from '../../components/BtButton';
import BtCheckButton from '../../components/BtCheckButton';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import modalBgImage from '../../../assets/images/modal-bg.png';
import SelectAllButton from '../../components/SelectAllButton';
import BtLoader from '../../components/BtLoader';

const initialState = {
    preferredDietTypes: [],
    preferredDifficulties: [],
    preferredCategories: [],
    availableDietTypes: [],
    availableDifficulties: [],
    availableCategories: [],
    isAllSelected: false,
    isLoading: true,
};

const PersonalizationPreferencesPage = ({ navigation }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const { setUserPreferences, setShouldRefreshMainPage } = useContext(AppContext);

    useEffect(() => {
        const getUserPreferencesData = async () => {
            try {
                const preferencesResponse = await UserAPI.getUserPreferences();
                if (preferencesResponse.data.success) {
                    const availableCategories = preferencesResponse.data.available_values.filter(
                        (item) => item.key === 'favorikategoriler',
                    );
                    const availableDietTypes = preferencesResponse.data.available_values.filter((item) => item.key === 'tariftercihleri');
                    const availableDifficulties = preferencesResponse.data.available_values.filter(
                        (item) => item.key === 'pisirmebecerileri',
                    );
                    const preferredCategories = preferencesResponse.data.preferences.favorikategoriler;
                    const preferredDietTypes = preferencesResponse.data.preferences.tariftercihleri;
                    const preferredDifficulties = preferencesResponse.data.preferences.pisirmebecerileri;
                    setState({
                        ...state,
                        availableDietTypes,
                        availableDifficulties,
                        availableCategories,
                        preferredCategories,
                        preferredDietTypes,
                        preferredDifficulties,
                        isLoading: false,
                    });
                }
            } catch (e) {
                const responseParsed = ApiErrors(e);
                console.log(responseParsed);
            }
        };
        getUserPreferencesData();
    }, []);

    const onSelectSkill = (value) => {
        if (!state.preferredDifficulties || !state.preferredDifficulties.includes(value)) {
            setState({ ...state, preferredDifficulties: [value] });
            return;
        }

        setState({ ...state, preferredDifficulties: [] });
        return;
    };

    const onSelectDiet = (value) => {
        if (!state.preferredDietTypes || !state.preferredDietTypes.includes(value)) {
            setState({ ...state, preferredDietTypes: [value] });
            return;
        }

        setState({ ...state, preferredDietTypes: [] });
        return;
    };
    const onSelectCategory = (value) => {
        if (!state.preferredCategories) {
            setState({ ...state, preferredCategories: [value] });
            return;
        } else if (state.preferredCategories.includes(value)) {
            const filteredCategories = state.preferredCategories.filter((category) => category !== value);
            setState({ ...state, preferredCategories: filteredCategories });
            return;
        }
        setState({ ...state, preferredCategories: [...state.preferredCategories, value] });
    };

    const onSave = async () => {
        const setLoading = (bool) => {
            setState({ ...state, isLoading: bool });
        };
        setLoading(true);
        try {
            setState({ apiErrors: {} });
            const postData = {
                secenekler: JSON.stringify({
                    tariftercihleri: state.preferredDietTypes,
                    pisirmebecerileri: state.preferredDifficulties,
                    favorikategoriler: state.preferredCategories,
                }),
            };
            const response = await UserAPI.setUserPreferences(postData);
            const data = response.data;

            if (data.success) {
                setUserPreferences(data.preferences);
                navigation.pop();
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
            setState({ apiErrors: responseParsed.errors });
        }
        setLoading(false);
        setShouldRefreshMainPage(true);
    };

    const updateSelectionAll = () => {
        if (state.isAllSelected) {
            setState({ ...state, isAllSelected: false, preferredCategories: [] });
        } else {
            setState({ ...state, isAllSelected: true, preferredCategories: state.availableCategories.map((item) => item.value) });
        }
    };

    const handleNoDiet = () => {
        setState({ ...state, preferredDietTypes: [] });
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={modalBgImage} style={styles.bgImage} resizeMode="stretch">
                {state.isLoading ? (
                    <BtLoader />
                ) : (
                    <ScrollView style={styles.scrollView} nestedScrollEnabled>
                        <View style={styles.outerContainer}>
                            <BtText type="body" color="lightGreen" style={styles.title}>
                                1. Özel bir diyet uyguluyor musun?
                            </BtText>
                            <View style={styles.stepContainer}>
                                {state.availableDietTypes.map((option, key) => {
                                    return (
                                        <BtCheckButton
                                            icon={option.value}
                                            key={key}
                                            label={option.title}
                                            selected={state.preferredDietTypes ? state.preferredDietTypes.includes(option.value) : false}
                                            onPress={() => onSelectDiet(option.value)}
                                            style={styles.option}
                                        />
                                    );
                                })}
                                <BtCheckButton
                                    variant="green"
                                    onPress={handleNoDiet}
                                    label="Uygulamıyorum"
                                    selected={!state.preferredDietTypes || !state.preferredDietTypes[0]}
                                    style={styles.option}
                                />
                            </View>

                            <BtText type="body" color="lightGreen" style={styles.title}>
                                2. Yemek pişirme becerilerini nasıl tanımlarsın?
                            </BtText>
                            <View style={styles.stepContainer}>
                                {state.availableDifficulties.map((option, key) => {
                                    return (
                                        <BtCheckButton
                                            key={key}
                                            label={option.title}
                                            selected={
                                                state.preferredDifficulties ? state.preferredDifficulties.includes(option.value) : false
                                            }
                                            onPress={() => onSelectSkill(option.value)}
                                            style={styles.option}
                                        />
                                    );
                                })}
                            </View>

                            <BtText type="body" color="lightGreen" style={styles.title}>
                                3. Favori yemek kategorilerini seç.
                            </BtText>
                            <SelectAllButton isAllSelected={state.isAllSelected} onPress={() => updateSelectionAll()} />
                            <ScrollView style={styles.nestedScrollView} nestedScrollEnabled>
                                <View style={styles.stepContainer}>
                                    {state.availableCategories.map((option) => {
                                        return (
                                            <BtCheckButton
                                                key={option.title}
                                                label={option.title}
                                                selected={state.preferredCategories ? state.preferredCategories.includes(option.value) : ''}
                                                onPress={() => onSelectCategory(option.value)}
                                                style={styles.option}
                                            />
                                        );
                                    })}
                                </View>
                            </ScrollView>
                            <View style={styles.divider}></View>

                            <BtButton label="Güncelle" variant="orange" onPress={onSave} />
                        </View>
                    </ScrollView>
                )}
            </ImageBackground>
        </SafeAreaView>
    );
};

export default PersonalizationPreferencesPage;

const styles = StyleSheet.create({
    option: {
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    nestedScrollView: {
        height: 315,
    },
    stepContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        marginVertical: 20,
        marginTop: 20,
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        marginTop: 10,
        marginBottom: 10,
    },
});
