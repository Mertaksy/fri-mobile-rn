import React, { useReducer, useEffect } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { ListItemRecipeCard } from '../../components';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import HTML from 'react-native-render-html';
import theme from '../../theme';
import * as WebBrowser from 'expo-web-browser';

const initialState = {
    listItem: {},
    bannerImageUri: '',
    buttonText: '',
    buttonBgColor: 'white',
    buttonUrl: '',
    bannerAspectRatio: 1.6,
};

const reducer = (state, newState) => ({ ...state, ...newState });

const ListDetailsPage = ({ route, navigation }) => {
    const { params = {} } = route;
    const [state, setState] = useReducer(reducer, initialState);
    useEffect(() => {
        getListDetails();
    }, []);

    const getListDetails = async () => {
        try {
            const response = await ContentAPI.getListDetails(params.slug);
            const data = response.data;
            if (data.success) {
                setState({
                    listItem: data.content,
                    bannerImageUri: data.content.mobile_banner_image_url,
                    buttonText: data.content.button_text,
                    buttonTextColor: data.content.button_text_color,
                    buttonBgColor: data.content.button_bg_color,
                    buttonUrl: data.content.button_url,
                    listImage: data.content.mobile_image_url,
                });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    useEffect(() => {
        if (state.bannerImageUri) {
            Image.getSize(state.bannerImageUri, (width, height) => {
                setState({ ...state, bannerAspectRatio: width / height });
            });
        }
    }, [state.bannerImageUri]);

    const handleBannerButton = async () => {
        await WebBrowser.openBrowserAsync(state.buttonUrl, {
            controlsColor: state.buttonBgColor,
            toolbarColor: state.buttonTextColor,
        });
    };

    return (
        <ScrollView style={styles.scrollView}>
            <ImageBackground
                source={{ uri: state.bannerImageUri ? state.bannerImageUri : state.listImage }}
                style={{ width: '100%', aspectRatio: state.bannerAspectRatio }}
            >
                {state.bannerImageUri ? (
                    <TouchableOpacity
                        onPress={handleBannerButton}
                        style={[
                            {
                                backgroundColor: state.buttonBgColor,
                            },
                            styles.bannerButton,
                        ]}
                    >
                        <Text style={[{ zIndex: 999, color: state.buttonTextColor }, Theme.typography.title4]}>{state.buttonText}</Text>
                    </TouchableOpacity>
                ) : null}
            </ImageBackground>

            <View style={styles.contentContainer}>
                <HTML
                    customWrapper={(content) => <View style={styles.titleWrapper}>{content}</View>}
                    source={{ html: state.listItem.title }}
                    baseFontStyle={styles.title}
                />
                <HTML
                    customWrapper={(content) => <Text style={styles.contentWrapper}>{content}</Text>}
                    source={{ html: state.listItem.content }}
                    baseFontStyle={styles.content}
                />
                <View style={styles.listWrapper}>
                    {state.listItem.items &&
                        state.listItem.items.map((item, index) => {
                            return (
                                <View key={index}>
                                    {item.freetext && (
                                        <View style={styles.htmlWrapper}>
                                            <HTML
                                                source={{ html: item.freetext }}
                                                baseFontStyle={{
                                                    fontSize: 14,
                                                    lineHeight: 22,
                                                    fontFamily: 'gilroy-medium',
                                                    color: '#56696a',
                                                }}
                                                tagsStyles={{
                                                    strong: {
                                                        fontSize: 14,
                                                        lineHeight: 22,
                                                        fontFamily: 'gilroy-bold',
                                                        color: '#064545',
                                                    },
                                                    p: {
                                                        fontSize: 14,
                                                        lineHeight: 22,
                                                        fontFamily: 'gilroy-medium',
                                                        color: '#56696a',
                                                        marginBottom: 10,
                                                    },
                                                    h2: {
                                                        fontSize: 16,
                                                        lineHeight: 22,
                                                        fontFamily: 'recoleta-semi-bold',
                                                        color: '#ee6621',
                                                        marginTop: 20,
                                                        marginBottom: 10,
                                                    },
                                                    h1: {
                                                        fontSize: 18,
                                                        lineHeight: 22,
                                                        fontFamily: 'recoleta-semi-bold',
                                                        color: '#ee6621',
                                                        marginTop: 20,
                                                        marginBottom: 10,
                                                    },
                                                    ul: { fontSize: 14, lineHeight: 22, fontFamily: 'gilroy-medium', color: '#064545' },
                                                }}
                                            />
                                        </View>
                                    )}
                                    {item.cms_type === 'recipe' && (
                                        <ListItemRecipeCard data={item.contentitem_data} navigation={navigation} />
                                    )}
                                </View>
                            );
                        })}
                </View>
            </View>
        </ScrollView>
    );
};

export default ListDetailsPage;
const styles = StyleSheet.create({
    listWrapper: { marginVertical: 20 },
    titleWrapper: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.title2,
        color: theme.palette.green,
    },
    contentWrapper: {
        textAlign: 'center',
        marginVertical: 10,
    },
    content: {
        ...theme.typography.body,
        color: theme.palette.green,
    },
    contentContainer: { marginVertical: 10, padding: 20 },
    bannerButton: {
        zIndex: 1,
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        bottom: '10%',
        right: '5%',
    },
    scrollView: { flex: 1, backgroundColor: '#fcfcfc' },
    card: {
        marginVertical: 10,
    },
    btnStyle: {
        width: '20%',
    },
});
