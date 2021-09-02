import * as React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Theme from '../theme';

const BtInput = (props) => {
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
            <TextInput
                style={[styles.textInput, errorStyle, editableStyle]}
                editable={editable}
                underlineColorAndroid="transparent"
                {...props}
            />
            {renderErrors(props.error)}
            <Text style={styles.textInputLabel}>{props.label}</Text>
        </View>
    );
};

export default BtInput;

const styles = StyleSheet.create({
    textInputWrapper: {
        marginVertical: 10,
    },
    textInput: {
        color: '#064545',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        height: 50,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: Theme.spacing.tiny,
        position: 'relative',
        fontSize: 14,
        fontFamily: 'gilroy-medium',
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
