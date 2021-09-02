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
import VideoCard from './VideoCard';

const SliderVideos = (props) => {
    const { onPress, style, block = {}, navigation } = props;
    const [freetexts, setFreetexts] = useState({});

    useEffect(() => {
        getBlockDetails();
    }, []);

    const getBlockDetails = async () => {
        try {
            const response = await ContentAPI.getTagDetails('videolu-icerik');

            const data = response.data;
            if (data.success) {
                setFreetexts(data.freetexts);
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };
    //
    // const Slider = (props) => {
    //     const { onPress, style, data } = props;
    //
    //     let Btn;
    //     if (Platform.OS === 'ios') {
    //         Btn = TouchableOpacity;
    //     } else {
    //         Btn = TouchableNativeFeedback;
    //     }
    //
    //     return (
    //         <Btn {...{ onPress }} style={[styles.btnStyle]}>
    //             <View style={[styles.cardMain, style]}>
    //                 <View style={styles.cardHeader}>
    //                     <Image style={styles.cartItemImage} source={{ uri: data.image_url }} />
    //                     <BtText type="title5" color="green">
    //                         {data.title}
    //                     </BtText>
    //                 </View>
    //             </View>
    //         </Btn>
    //     );
    // };

    if (freetexts.data && !freetexts.data.length) {
        return null;
    }
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
                    onPress={() => navigation.navigate('VideoContentScreenStack')}
                />
            </View>
            <Carousel
                data={freetexts.data}
                renderItem={({ item, index }) => <VideoCard item={item} navigation={navigation} />}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                sliderWidth={Dimensions.get('window').width - 20}
                itemWidth={Dimensions.get('window').width / 2 - 15}
                activeSlideAlignment="start"
                loop={false}
            />
        </View>
    );
};

export default SliderVideos;

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
        minHeight: 207,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardHeaderIcon: {
        marginRight: 20,
    },
    cardBody: {
        marginTop: 15,
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
});
