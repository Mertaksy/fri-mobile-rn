import React, { useEffect, useState } from 'react';
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
    ListView,
} from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import BtButton from './BtButton';
import BtInput from './BtInput';
import MenuSvg from '../../assets/icons/menu.svg';
import SortSvg from '../../assets/icons/sort_orange.svg';
import CustomizeSvg from '../../assets/icons/customize.svg';
import Collapsible from 'react-native-collapsible';
import CheckCircleSvg from '../../assets/icons/check_circle_green.svg';
import EmptyCircleSvg from '../../assets/icons/empty_circle_green.svg';
import SearchSvg from '../../assets/icons/search.svg';
import DropdownSvg from '../../assets/icons/dropdown.svg';
import { useDebouncedEffect } from '../utils/useDebouncedEffect';
import SortButton from './SortButton';

const RecipeFilter = (props) => {
    const {
        onChangeText,
        categories,
        difficulties,
        applyFilters,
        handleSubmitSearch,
        handleTextChange,
        handleSortChange,
        preSelectedCategory,
        value,
    } = props;
    let _filters = {
        category: [],
        diet: 'hepsi',
        difficulty: [],
        time: [],
    };
    const [showModal, setShowModal] = useState(false);
    const [activeSections, setActiveSections] = useState([0, !preSelectedCategory, 1, 1]);
    const [filters, setFilters] = useState(_filters);
    const [keyword, setKeyword] = useState('');
    let _filtersCurrent = filters;
    if (preSelectedCategory) {
        _filtersCurrent.category = [preSelectedCategory];
    }
    let categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.slug,
    }));
    let dietOptions = [
        { label: 'Hepsi', value: 'hepsi' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Vejeteryan', value: 'vejeteryan' },
        { label: 'Katojenik', value: 'katojenik' },
        { label: 'Glutensiz', value: 'glutensiz' },
    ];

    const difficultyOptions = difficulties.map((difficulty) => ({
        label: difficulty.title,
        value: difficulty.slug,
    }));

    const timeOptions = [
        { label: '15 Dakikadan Az', value: '15' },
        { label: '30 Dakikadan Az', value: '30' },
        { label: '1 Saat Altı', value: '60' },
        { label: '1 Saat ve Üzeri', value: '61' },
    ];

    const videoOptions = [{ label: 'Sadece Videolu Tarifler', value: 'video_tarifler' }];

    useEffect(() => {
        setFilters(_filters);
        return () => {
            console.log('filters unmounted');
            setFilters(_filters);
        };
    }, []);
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    const setFilter = (name, option) => {
        let tempFilters = { ...filters };

        if (name === 'diet') {
            tempFilters[name] = option.value;
        } else {
            if (tempFilters[name].includes(option.value)) {
                tempFilters[name] = tempFilters[name].filter((item) => item !== option.value);
            } else {
                tempFilters[name].push(option.value);
            }
        }
        if (preSelectedCategory) {
            tempFilters.category = [preSelectedCategory];
        }
        _filtersCurrent = tempFilters;
        setFilters(tempFilters);
    };

    const onTextChange = async (text) => {
        setKeyword(text);
        handleTextChange(text);
    };
    const submitSearch = async (text) => {
        setKeyword(text);
        handleSubmitSearch();
    };
    const applyCurrentFilters = async () => {
        applyFilters(_filtersCurrent);
        setShowModal(false);
    };
    const collapse = async (idx) => {
        let _activeSections = [...activeSections];
        _activeSections[idx] = !activeSections[idx];
        setActiveSections(_activeSections);
    };

    return (
        <>
            <View style={styles.inputWrapper}>
                <View style={[styles.textInputWrapper]}>
                    <TextInput
                        value={value}
                        style={styles.textInput}
                        placeholder="tarif ara"
                        underlineColorAndroid="transparent"
                        onChangeText={onTextChange}
                        returnKeyType="search"
                        onSubmitEditing={submitSearch}
                    />
                    <TouchableOpacity style={styles.searchIcon} onPress={submitSearch}>
                        <SearchSvg width={15} height={15} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Btn onPress={() => setShowModal(true)} style={styles.iconBtnStyle}>
                        <CustomizeSvg style={styles.inputIcon} />
                    </Btn>
                    <SortButton handleSort={handleSortChange} color="orange" />
                </View>
            </View>

            <Modal animationType="fade" transparent visible={showModal} onRequestClose={() => setShowModal(false)}>
                <Btn
                    style={{ flex: 1, flexDirection: 'column' }}
                    activeOpacity={1}
                    onPressOut={() => {
                        setShowModal(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView style={styles.modalViewInner}>
                                {!preSelectedCategory && (
                                    <View style={styles.collapseItemWrapper}>
                                        <Btn onPress={() => collapse(0)} style={styles.collapseHeaderBtn}>
                                            <View style={styles.collapseTitle}>
                                                <BtText type="title4" color="green">
                                                    İlgili Kategorilere Göre
                                                </BtText>
                                                <DropdownSvg width={11} height={11} style={styles.arrowIcon} />
                                            </View>
                                        </Btn>
                                        <Collapsible collapsed={activeSections[0]} style={{}}>
                                            <View style={styles.collapseInner}>
                                                <ScrollView style={{ maxHeight: 160 }}>
                                                    {categoryOptions.map((option, idx) => {
                                                        return (
                                                            <Btn
                                                                onPress={() => setFilter('category', option)}
                                                                key={idx}
                                                                style={styles.optionItemBtn}
                                                            >
                                                                <View style={styles.optionItem}>
                                                                    {filters.category.includes(option.value) ? (
                                                                        <CheckCircleSvg
                                                                            width={17}
                                                                            height={17}
                                                                            style={styles.selectionIcon}
                                                                        />
                                                                    ) : (
                                                                        <EmptyCircleSvg
                                                                            width={17}
                                                                            height={17}
                                                                            style={styles.selectionIcon}
                                                                        />
                                                                    )}
                                                                    <BtText>{option.label}</BtText>
                                                                </View>
                                                            </Btn>
                                                        );
                                                    })}
                                                </ScrollView>
                                            </View>
                                        </Collapsible>
                                    </View>
                                )}
                                <View style={styles.collapseItemWrapper}>
                                    <Btn onPress={() => collapse(1)} style={styles.collapseHeaderBtn}>
                                        <View style={styles.collapseTitle}>
                                            <BtText type="title4" color="green">
                                                Beslenme Düzenine Göre
                                            </BtText>
                                            <DropdownSvg width={11} height={11} style={styles.arrowIcon} />
                                        </View>
                                    </Btn>
                                    <Collapsible collapsed={activeSections[1]} style={{}}>
                                        <View style={styles.collapseInner}>
                                            <View style={{ maxHeight: 200 }}>
                                                {dietOptions.map((option, idx) => {
                                                    return (
                                                        <Btn
                                                            onPress={() => setFilter('diet', option)}
                                                            key={idx}
                                                            style={[styles.optionItemBtn]}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.optionItem,
                                                                    { opacity: filters.diet === option.value ? 1 : 0.4 },
                                                                ]}
                                                            >
                                                                {filters.diet === option.value ? (
                                                                    <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                ) : (
                                                                    <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                )}
                                                                <BtText>{option.label}</BtText>
                                                            </View>
                                                        </Btn>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </Collapsible>
                                </View>
                                <View style={styles.collapseItemWrapper}>
                                    <Btn onPress={() => collapse(2)} style={styles.collapseHeaderBtn}>
                                        <View style={styles.collapseTitle}>
                                            <BtText type="title4" color="green">
                                                Pişirme Süresine Göre
                                            </BtText>
                                            <DropdownSvg width={11} height={11} style={styles.arrowIcon} />
                                        </View>
                                    </Btn>
                                    <Collapsible collapsed={activeSections[2]} style={{}}>
                                        <View style={styles.collapseInner}>
                                            <View style={{ maxHeight: 160 }}>
                                                {timeOptions.map((option, idx) => {
                                                    return (
                                                        <Btn
                                                            onPress={() => setFilter('time', option)}
                                                            key={idx}
                                                            style={styles.optionItemBtn}
                                                        >
                                                            <View style={styles.optionItem}>
                                                                {filters.time.includes(option.value) ? (
                                                                    <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                ) : (
                                                                    <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                )}
                                                                <BtText>{option.label}</BtText>
                                                            </View>
                                                        </Btn>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </Collapsible>
                                </View>
                                <View style={styles.collapseItemWrapper}>
                                    <Btn onPress={() => collapse(3)} style={styles.collapseHeaderBtn}>
                                        <View style={styles.collapseTitle}>
                                            <BtText type="title4" color="green">
                                                Zorluk Derecesine Göre
                                            </BtText>
                                            <DropdownSvg width={11} height={11} style={styles.arrowIcon} />
                                        </View>
                                    </Btn>
                                    <Collapsible collapsed={activeSections[3]} style={{}}>
                                        <View style={styles.collapseInner}>
                                            <ScrollView style={{ maxHeight: 160 }}>
                                                {difficultyOptions.map((option, idx) => {
                                                    return (
                                                        <Btn
                                                            onPress={() => setFilter('difficulty', option)}
                                                            key={idx}
                                                            style={styles.optionItemBtn}
                                                        >
                                                            <View style={styles.optionItem}>
                                                                {filters.difficulty.includes(option.value) ? (
                                                                    <CheckCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                ) : (
                                                                    <EmptyCircleSvg width={17} height={17} style={styles.selectionIcon} />
                                                                )}
                                                                <BtText>{option.label}</BtText>
                                                            </View>
                                                        </Btn>
                                                    );
                                                })}
                                            </ScrollView>
                                        </View>
                                    </Collapsible>
                                </View>
                            </ScrollView>
                            <BtButton style={styles.applyBtn} onPress={applyCurrentFilters} label="UYGULA" variant="orange" />
                        </View>
                    </View>
                </Btn>
            </Modal>
        </>
    );
};

export default RecipeFilter;

const styles = StyleSheet.create({
    textInputWrapper: {
        flex: 1,
    },
    textInput: {
        color: '#064545',
        borderRadius: 5,
        borderWidth: 0,
        height: 50,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 14,
    },
    inputWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        margin: 20,
        marginTop: -25,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,

        elevation: 5,
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    iconBtnStyle: {
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
    },
    btnIconStyle: {
        padding: 10,
        alignItems: 'center',
        width: 40,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        margin: 5,
    },
    inputIcon: {
        width: 26,
        height: 26,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        marginHorizontal: 20,
        marginVertical: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 20,
    },
    modalViewInner: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    iconSelected: {
        backgroundColor: Theme.palette.green,
    },
    selectionIcon: {
        marginRight: 10,
    },
    optionItem: {
        flexDirection: 'row',
    },
    optionItemBtn: {
        paddingVertical: 5,
    },
    applyBtn: {
        paddingHorizontal: 20,
        marginBottom: 0,
        marginHorizontal: 20,
    },
    collapseTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    collapseItemWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#f4f3f0',
        marginVertical: 10,
    },
    collapseInner: {
        paddingBottom: 20,
    },
});
