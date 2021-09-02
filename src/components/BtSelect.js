import * as React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Theme from '../theme';
import RNPickerSelect from 'react-native-picker-select';

const BtSelect = (props) => {
    const { editable = true, label } = props;
    const editableStyle = editable ? { opacity: 1 } : { opacity: 0.5 };
    const renderErrors = (error) => {
        if (!error || error === '') {
            return null;
        }
        if (Array.isArray(error)) {
            return error.map((item, key) => (
                <Text key={key} style={styles.error}>
                    {item}
                </Text>
            ));
        }
        return <Text style={styles.error}>{error}</Text>;
    };
    const errorStyle = props.error ? { borderColor: Theme.palette.error } : {};
    return (
        <View style={[styles.textInputWrapper]}>
            <RNPickerSelect
                placeholder={props.placeholder}
                style={pickerSelectStyles}
                onValueChange={props.onChangeText}
                items={props.items || []}
            />
            {renderErrors(props.error)}
            <Text style={styles.textInputLabel}>{props.label}</Text>
        </View>
    );
};

export default BtSelect;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width:"100%",
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 4,
        color: '#064545',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        borderRadius: 8,
        color: '#064545',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    textInputWrapper: {
        marginVertical: 10,
        flex:1,
    },
    textInputLabel: {
        color: '#56696a',
        ...Theme.typography.inputLabel,
        position: 'absolute',
        top: -5,
        left: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        ...Theme.typography.inputError,
        marginLeft: 10,
    },
});
