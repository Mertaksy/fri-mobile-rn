import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text, ImageBackground } from 'react-native';
import Theme from '../theme';
import BtText from './BtText';
import DotsSvg from '../../assets/icons/three_dot.svg';
import ArrowSvg from '../../assets/icons/arrow-right.svg';

const PopularList = (props) => {
    const { onPress, style, data = [], navigation } = props;

    let Btn;
    if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }
    const goDetails = (slug) => {
        navigation.navigate('RecipeDetailsPage', {
            slug,
        });
    };
    return (
        <View style={styles.cardMain}>
            <View style={styles.cardHeader}>
                <DotsSvg width={24} height={24} style={styles.cardHeaderIcon} />
                <BtText type="title5Gilroy" color="orange" style={styles.cardTitle}>
                    POPÜLER İÇERİKLER
                </BtText>
            </View>
            <View style={styles.cardBody}>
                {data.map((item, key) => (
                    <Btn key={key} onPress={() => goDetails(item.slug)}>
                        <View style={styles.cardItem}>
                            <Image style={styles.cartItemImage} source={{ uri: item.mobile_image_url }} />
                            <BtText type="bodyBold" color="green" style={styles.cardItemDescription}>
                                {item.title}
                            </BtText>
                        </View>
                    </Btn>
                ))}
                <Btn onPress={() => navigation.navigate('RecipesListPage')}>
                    <View style={styles.cardItem}>
                        <BtText type="showAllText" color="green" style={styles.cardItemDescription}>
                            TÜMÜNÜ GÖSTER <ArrowSvg width={8} height={8} style={styles.arrowRightIcon} />
                        </BtText>
                    </View>
                </Btn>
            </View>
        </View>
    );
};

export default PopularList;

const styles = StyleSheet.create({
    cardMain: {
        paddingVertical: 10,
        borderTopColor: 'rgba(86,105,106,0.1)',
        borderTopWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardHeaderIcon: {
        marginRight: 20,
        marginLeft: 10,
    },
    arrowRightIcon: {
        marginLeft: 5,
    },
    cardBody: {
        padding: 5,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(86,105,106,0.1)',
    },
    cartItemImage: {
        borderRadius: 8,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginRight: 10,
    },
    cardTitle: {
        paddingVertical: 15,
    },
    cardItemDescription: {},
});
