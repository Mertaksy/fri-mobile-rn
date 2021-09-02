import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import BtText from './BtText';

const CardSlider = (props) => {
    const { style, data, navigation } = props;

    const goRecipeDetails = () => {
        if (!data.content_data) {
            return false;
        }
        if (data.content_type === 'App\\Category') {
            navigation.navigate('RecipesListPage', {
                category: data.content_data.slug,
            });
        } else if (data.content_type === 'App\\Recipe') {
            navigation.navigate('RecipeDetailsPage', {
                slug: data.content_data.slug,
            });
        } else if (data.content_type === 'App\\Freetext') {
            navigation.navigate('FreeTextDetailsPage', {
                slug: data.content_data.slug,
            });
        } else if (data.content_type === 'App\\ContentList') {
            navigation.navigate('ListDetailsPage', {
                slug: data.content_data.slug,
            });
        }
    };
    return (
        <TouchableOpacity onPress={goRecipeDetails} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <ImageBackground
                    imageStyle={{ borderRadius: 8 }}
                    source={{ uri: data.mobile_image_url }}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <View style={styles.insideImage}>
                        <BtText type="title2" style={styles.insideCardText}>
                            {data.title}
                        </BtText>
                        <BtText type="title5" color="green" style={styles.insideCardButton}>
                            Devamı
                        </BtText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
    },
    bgImage: {
        height: 200,
    },
    cardMain: {
        marginHorizontal: 5,
    },
    insideImage: {
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 20,
        paddingVertical: 30,
    },
    insideCardText: {
        color: '#fff',
        width: '65%',
    },
    insideCardButton: {
        backgroundColor: '#fff',
        width: 85,
        borderRadius: 5,
        textAlign: 'center',
        padding: 10,
        overflow: 'hidden',
    },
});

export default CardSlider;
