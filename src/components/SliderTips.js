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
import BtLinkButton from './BtLinkButton';
import CardSlider from './CardSlider';
import * as ContentAPI from '../api/content';
import ApiErrors from '../api/errors';
import Carousel from 'react-native-snap-carousel';
import HTML from 'react-native-render-html';
import ArrowSvg from '../../assets/icons/arrow-right.svg';

const SliderTips = (props) => {
    const { onPress, style, block = {}, navigation } = props;
    const [freetexts, setFreetexts] = useState({});

    useEffect(() => {
        getBlockDetails();
    }, []);

    const getBlockDetails = async () => {
        try {
            const response = await ContentAPI.getTagDetails('mutfaktan-ipuclari');
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
        const { onPress, style, data } = props;

        let Btn;
        if (Platform.OS === 'ios') {
            Btn = TouchableOpacity;
        } else {
            Btn = TouchableOpacity;
        }

        return (
            <Btn {...{ onPress }} style={[styles.btnStyle]}>
                <View style={[styles.cardMain, style]}>
                    <View style={styles.cardHeader}>
                        <Image style={styles.cartItemImage} source={{ uri: data.mobile_image_url }} />
                        <BtText type="title5" color="green" style={{ flex: 1 }}>
                            {data.title}
                        </BtText>
                    </View>
                    <View style={styles.cardBody}>
                        {data.content ? (
                            <HTML
                                source={{ html: data.content || '' }}
                                tagsStyles={{
                                    p: {
                                        fontSize: 12,
                                        lineHeight: 20,
                                        fontFamily: 'gilroy-medium',
                                        color: '#56696a',
                                    },
                                }}
                            />
                        ) : null}
                    </View>
                </View>
            </Btn>
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
                    onPress={() => navigation.navigate('TipsPage')}
                />
            </View>
            <Carousel
                data={freetexts.data}
                renderItem={({ item, index }) => <Slider data={item} />}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                sliderWidth={Dimensions.get('window').width - 20}
                itemWidth={Dimensions.get('window').width - 50}
                activeSlideAlignment="start"
                loop={false}
            />
        </View>
    );
};

export default SliderTips;

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
        marginRight: 20,
        borderRadius: 0,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        paddingLeft: 0,
        minHeight: 207,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },

    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        marginTop: 10,
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
        width: 60,
        height: 60,
        borderRadius: 8,
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
});
