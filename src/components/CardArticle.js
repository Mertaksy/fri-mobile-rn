import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import BtText from './BtText';
import React, { useState, useEffect } from 'react';

const CardArticle = (props) => {
    const { onPress, style, data, navigation } = props;
    const [summary, setSummary] = useState('<p></p>');
    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    const onPressed = () => {
        navigation.navigate('FreeTextDetailsPage', {
            slug: data.slug,
        });
    };

    useEffect(() => {
        if (!data) {
            return;
        } else if (data.summary) {
            setSummary(`<p>${data.summary.slice(0, data.title.length > 30 ? 90 : 110)}...</p>`);
        } else {
            const sum = data.content.slice(0, data.title.length > 30 ? 90 : 110);
            setSummary(`${sum}...`);
        }
    }, [data]);

    // card component title ı yazısını içine sığdırmak için kaç tane /n olusturuyorsa onun miktarını bu state depoluyor.
    const [numTitleNewLines, setNumTitleNewLines] = useState(null);

    return (
        <Btn onPress={onPressed} style={[styles.btnStyle]}>
            <View style={[styles.cardMain, style]}>
                <View style={styles.cardHeader}>
                    <BtText type="title6" color="green" setNumNewLines={setNumTitleNewLines} numberOfLines={3}>
                        {data.title}
                    </BtText>
                    {/* dinamik olarak numberOfLines belirlemek ellipsisin lüzumsuz fazla boşluk oluşturmasına engel oluyor */}
                    <BtText type="textSummary" style={{ marginTop: 7 }} numberOfLines={numTitleNewLines === 1 ? 7 : 6}>
                        {summary}
                    </BtText>
                </View>
                {data.author && (
                    <View style={styles.cardFooter}>
                        <View style={styles.avatar}>
                            <Image style={styles.avatarImage} source={{ uri: data.author.image_full }} />
                        </View>
                        <BtText type="title6" color="green">
                            {data.author.name}
                        </BtText>
                    </View>
                )}
            </View>
        </Btn>
    );
};
export default CardArticle;

const styles = StyleSheet.create({
    bgHeroImage: {
        flex: 1,
        height: 200,
    },
    insideImage: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    btnStyle: {
        borderRadius: 10,
        flex: 0.5,
        marginVertical: 5,
    },
    cardMain: {
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        paddingBottom: 10,
        height: 240,
        justifyContent: 'space-between',
    },
    cardHeader: {},

    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        marginTop: 15,
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardTitle: {
        paddingVertical: 15,
    },
    cardItemDescription: {
        color: '#fff',
        width: '85%',
    },
    avatar: {
        marginRight: 10,
    },
    avatarImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
});
