import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CheckCircleSvg from '../../assets/icons/check_circle_green.svg';
import EmptyCircleSvg from '../../assets/icons/empty_circle_green.svg';
import BtText from './BtText';

const SelectAllButton = ({ onPress, isAllSelected, style }) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    marginBottom: 10,
                }}
            >
                {isAllSelected ? <CheckCircleSvg width={13} height={13} /> : <EmptyCircleSvg width={13} height={13} />}
                <BtText style={{ marginLeft: 5 }} type="label12SB">
                    {isAllSelected ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                </BtText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default SelectAllButton;
