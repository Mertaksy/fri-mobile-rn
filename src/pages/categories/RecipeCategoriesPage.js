// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import React, { useReducer, useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, FlatList, Alert, StyleSheet } from 'react-native';
import { CardCategory, BtButton, RecipeCard, MiniCard, BtText, BtLoader, TopColorLine } from '../../components';
import Carousel from 'react-native-snap-carousel';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import SearchInput from '../../components/SearchInput';

const initialState = {
    categories: [],
    isLoading: true,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const RecipeCategoriesPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getAllCategoriesByType();
    }, []);

    const getAllCategoriesByType = async () => {
        try {
            const response = await ContentAPI.getAllCategoriesByType('tarif');
            const data = response.data;
            if (data.success) {
                setState({ categories: data.categories });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
        setState({ isLoading: false });
    };

    const selectCategory = (category) => {
        navigation.navigate('RecipesListPage', { category: category });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
            {state.isLoading ? (
                <BtLoader />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <SearchInput navigation={navigation} />
                    <View style={styles.categoryWrapper}>
                        {/*{state.categories.map((category, key) => {*/}
                        {/*    return <CardCategory key={key} data={category} style={styles.card} btnStyle={styles.btnStyle}/>;*/}
                        {/*})}*/}

                        <FlatList
                            //horizontal={true}
                            numColumns={3}
                            data={state.categories}
                            renderItem={({ item, index }) => (
                                <CardCategory onPress={() => selectCategory(item)} data={item} style={styles.card} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <BtButton
                            onPress={() => navigation.navigate('RecipesListPage')}
                            label="Tüm Tarifler"
                            style={{ marginHorizontal: 5 }}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default RecipeCategoriesPage;
const styles = StyleSheet.create({
    categoryWrapper: {
        flex: 1,
        padding: 10,
    },
    card: {
        marginVertical: 5,
    },
    btnStyle: {
        width: '20%',
    },
});
