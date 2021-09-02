import React, { useReducer, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import * as ContentAPI from '../../api/content';
import ApiErrors from '../../api/errors';
import { BtText, BtFavoriteButton, BtShareButton } from '../../components';
import HTML from 'react-native-render-html';

const initialState = {
    articleDetails: {},
    slug: '',
};

const reducer = (state, newState) => ({ ...state, ...newState });

const Btn = TouchableOpacity;

const FreeTextDetailsPage = ({ route, navigation }) => {
    const [state, setState] = useReducer(reducer, initialState);
    const contentWidth = useWindowDimensions().width;

    const { params } = route;
    const slug = params.slug;

    useLayoutEffect(() => {
        if (slug) {
            getFreetextDetails(slug);
        }
        return () => {
            setState({ articleDetails: {} });
        };
    }, []);

    const getFreetextDetails = async (slug) => {
        try {
            const response = await ContentAPI.getFreetextDetails(slug);
            const data = response.data;
            if (data.success) {
                setState({ articleDetails: data.content });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const goAuthorPage = () => {
        navigation.navigate('AuthorDetailsPage', { author: state.articleDetails.author });
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.freeTextWrapper}>
                    <View style={styles.likeAndShare}>
                        <BtFavoriteButton slug={state.articleDetails.slug} contentType="yazi" navigation={navigation} />
                        <BtShareButton slug={state.articleDetails.slug} contentType="freetext" item={state.articleDetails} />
                    </View>
                    <HTML
                        source={{ html: state.articleDetails.title }}
                        baseFontStyle={styles.articleTitle}
                        customWrapper={(content) => <Text style={styles.articleTitleWrapper}>{content}</Text>}
                    />

                    {state.articleDetails.author && (
                        <Btn onPress={goAuthorPage}>
                            <View style={styles.authorWrapper}>
                                <Image source={{ uri: state.articleDetails.author.image_full }} style={styles.avatar} />

                                <BtText type="authorTitle" style={[Theme.typography.authorTitle, styles.authorName]}>
                                    {state.articleDetails.author.name}
                                </BtText>
                            </View>
                        </Btn>
                    )}

                    <View style={styles.articleWrapper}>
                        {state.articleDetails.content ? (
                            <>
                                <HTML
                                    source={{ html: state.articleDetails.content }}
                                    ignoredStyles={['font-family']}
                                    baseFontStyle={Theme.typography.gilroy14Medium}
                                    contentWidth={contentWidth}
                                    tagsStyles={{
                                        strong: {
                                            ...Theme.typography.strong,
                                            color: Theme.palette.green,
                                        },
                                        p: {
                                            ...Theme.typography.gilroy14Medium,
                                        },
                                        h2: {
                                            ...Theme.typography.title2,
                                            color: Theme.palette.green,
                                            marginVertical: 10,
                                        },
                                        ul: {
                                            ...Theme.typography.body,
                                            color: Theme.palette.green,
                                        },
                                        img: {
                                            marginVertical: 10,
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                        },
                                    }}
                                />
                                <Text style={[Theme.typography.title4, styles.tagTitle]}>Etiketler</Text>
                                <View style={styles.tagsContainer}>
                                    {state.articleDetails.tags.map((tagObject) => {
                                        return (
                                            <Btn key={tagObject.name} style={styles.tagButton}>
                                                <Text style={[Theme.typography.title7Gilroy, styles.tagButtonText]}>#{tagObject.name}</Text>
                                            </Btn>
                                        );
                                    })}
                                </View>
                            </>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FreeTextDetailsPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingVertical: 10,
    },
    freeTextWrapper: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    articleWrapper: {
        padding: 10,
    },
    likeAndShare: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    articleTitleWrapper: {
        textAlign: 'center',
        paddingVertical: 20,
    },
    articleTitle: {
        color: Theme.palette.green,
        ...Theme.typography.title2,
    },
    authorWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    authorName: {
        color: Theme.palette.green,
    },
    avatar: {
        height: 34,
        width: 34,
        backgroundColor: '#E5E5E5',
        borderRadius: 17,
        marginRight: 10,
    },
    tagTitle: {
        color: Theme.palette.green,
        marginVertical: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    tagButton: {
        borderWidth: 1,
        borderColor: Theme.palette.borderColor,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 8,
    },
    tagButtonText: {
        textAlign: 'center',
        color: Theme.palette.green,
    },
});
