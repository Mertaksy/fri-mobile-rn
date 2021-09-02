import React, { useContext, useState } from 'react';
import { View, Share, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback, Modal, SafeAreaView } from 'react-native';
import BtText from './BtText';
import CheckedBox from '../../assets/icons/check_circle_green.svg';
import UncheckedBox from '../../assets/icons/empty_circle_green.svg';
import HeartSvg from '../../assets/icons/heart.svg';
import HeartGreenSvg from '../../assets/icons/heart_full.svg';
import CrossSvg from '../../assets/icons/cross.svg';
import ShareSvg from '../../assets/icons/share.svg';

import { Context as AppContext } from '../context/AppContext';
import * as UserAPI from '../api/user';
import ApiErrors from '../api/errors';
import { Platform } from 'react-native-web';

const domainUrl = 'https://bizimtarifler.com';

const BtShareButton = (props) => {
    const { onPress, item, contentType, disabled } = props;
    const [showModalAdd, setShowModalAdd] = useState(false);
    const AppState = useContext(AppContext).state;
    let Btn;
    if (disabled) {
        Btn = View;
    } else if (Platform.OS === 'ios') {
        Btn = TouchableOpacity;
    } else {
        Btn = TouchableOpacity;
    }

    const getShareUrl = () => {
        let url = domainUrl;
        if (contentType === 'tarif') {
            url = `${domainUrl}/tarifler/${item.slug}`;
        }
        if (contentType === 'freetext') {
            url = `${domainUrl}/blog/${item.slug}`;
        }
        return url;
    };
    const onShare = async () => {
        try {
            const shareUrl = getShareUrl();
            const message = Platform.OS === 'ios' ? item.title : `${item.title} ${shareUrl}`;
            const result = await Share.share({
                message: message,
                title: 'Bizim Tarifler',
                url: shareUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Btn onPress={onShare} style={styles.button}>
                <ShareSvg width={20} height={20} />
            </Btn>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
    },
    modalBody: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    modalCloseBtn: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    listItemBtn: {
        borderTopColor: 'rgba(229, 229, 229,0.4)',
        borderTopWidth: 1,
        paddingVertical: 20,
    },
});

export default BtShareButton;
