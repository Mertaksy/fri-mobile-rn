import React from 'react';
import { TouchableOpacity } from 'react-native';
import CrossSvg from '../../assets/icons/cross.svg';
import CrossGreenSvg from '../../assets/icons/cross_green.svg';

const CrossIcon = ({ onPress, crossStyle, containerStyle, width = 20, height = 20, type = 'green' }) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            {type === 'green' ? (
                <CrossGreenSvg style={crossStyle} width={width} height={height} />
            ) : (
                <CrossSvg style={crossStyle} width={width} height={height} />
            )}
        </TouchableOpacity>
    );
};

export default CrossIcon;
