import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Image,
    Text,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import { BtLinkButton, CardSlider } from './index';
import * as ContentAPI from '../api/content';
import ApiErrors from '../api/errors';
import Carousel from 'react-native-snap-carousel';
import HTML from 'react-native-render-html';

const SliderArticles = (props) => {
    const { onPress, style, block = {}, navigation } = props;
    const [freetexts, setFreetexts] = useState({});

    const CAROUSEL_ITEM_WIDTH = Dimensions.get('window').width / 2 - 15;
    useEffect(() => {
        getBlockDetails();
    }, []);

    const getBlockDetails = async () => {
        try {
            const response = await ContentAPI.getTagDetails('kose-yazisi');
            const data = response.data;
            if (data.success) {
                setFreetexts(data.freetexts);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const Slider = (props) => {
        const { style, data } = props;
        const [summary, setSummary] = useState('<p></p>');

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

        return (
            <TouchableOpacity onPress={onPressed} style={[styles.btnStyle]}>
                <View style={[styles.cardMain, style]}>
                    <View style={styles.cardHeader}>
                        <HTML source={{ html: data.title }} baseFontStyle={{ ...Theme.typography.title6, color: Theme.palette.green }} />
                        <View>
                            <HTML
                                source={{ html: summary }}
                                baseFontStyle={{ ...Theme.typography.textSummary, color: Theme.palette.green }}
                            />
                        </View>
                    </View>
                    <View style={styles.cardFooter}>
                        <View style={styles.avatar}>
                            <Image style={styles.avatarImage} source={{ uri: data.author.image_full }} />
                        </View>
                        <BtText type="title6" color="green">
                            {data.author.name}
                        </BtText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.blockWrapper}>
            <View style={styles.blockHeader}>
                <BtText type="title3" color="green">
                    {block.title}
                </BtText>
                <BtLinkButton
                    icon="arrow-right-green"
                    iconPosition="right"
                    variant="green"
                    type="linkButtonSmall"
                    label="TÜMÜNÜ LİSTELE"
                    style={{ marginBottom: 20, opacity: 0.7 }}
                    onPress={() => navigation.navigate('ArticlesPage')}
                />
            </View>
            <Carousel
                data={freetexts.data}
                renderItem={({ item, index }) => <Slider data={item} />}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                sliderWidth={Dimensions.get('window').width - 20}
                itemWidth={CAROUSEL_ITEM_WIDTH}
                activeSlideAlignment="start"
                loop={false}
                contentContainerCustomStyle={[
                    { overflow: 'hidden' },
                    freetexts.data ? { width: CAROUSEL_ITEM_WIDTH * freetexts.data.length } : {},
                ]}
            />
        </View>
    );
};

export default SliderArticles;

const styles = StyleSheet.create({
    blockWrapper: {},
    blockHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnStyle: {
        borderRadius: 10,
    },
    cardMain: {
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        paddingBottom: 10,
        height: 240,
        flex: 1,
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
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingVertical: 10,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    cartItemImage: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
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
