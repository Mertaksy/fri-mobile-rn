import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Platform, Modal, Text } from 'react-native';
import Theme from '../theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import BtButton from './BtButton';

const BtDateSelect = (props) => {
    const { label, value, error, handleDateChange } = props;
    const date = props.value || new Date().toLocaleDateString();
    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [dateLabel, setDateLabel] = useState(date);

    //const editableStyle = editable ? { opacity: 1 } : { opacity: 0.5 };
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

    const birthdateOnChange = (event, selectedDate) => {
        setShowPicker(false);
        handleDateChange(selectedDate);

        // setState({ birth: formattedDate });
    };

    return (
        <View>
            <View style={[styles.textInputWrapper]}>
                <TouchableOpacity
                    onPress={() => {
                        setShowPicker(true);
                    }}
                    style={styles.btn}
                >
                    <View>
                        <Text style={styles.textInputLabel}>{label}</Text>
                        <Text style={styles.textLabel}>{date}</Text>
                    </View>
                </TouchableOpacity>
                {renderErrors(error)}
            </View>

            {showPicker && (
                <View style={[styles.textInputWrapper]}>
                    {Platform.OS == 'ios' ? (
                        <Modal animationType="fade" transparent={true} visible={showModal}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ marginTop: 0 }}>
                                        <DateTimePicker
                                            mode="date"
                                            value={new Date(date)}
                                            locale="tr-TR"
                                            onChange={birthdateOnChange}
                                            display="spinner"
                                        />
                                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                            <BtButton
                                                label="VAZGEÇ"
                                                onPress={() => setShowPicker(false)}
                                                btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                            />
                                            <BtButton
                                                label="TAMAM"
                                                onPress={() => setShowPicker(false)}
                                                variant="orange"
                                                btnStyle={{ flex: 1, marginHorizontal: 10 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    ) : (
                        <DateTimePicker mode="date" value={new Date(date)} locale="tr-TR" onChange={birthdateOnChange} display="spinner" />
                    )}
                </View>
            )}
        </View>
    );
};

export default BtDateSelect;

const styles = StyleSheet.create({
    textInputWrapper: {
        marginVertical: 10,
    },
    btn: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        height: 50,
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: Theme.spacing.tiny,
        position: 'relative',
        fontSize: 14,
    },
    textInputLabel: {
        color: '#56696a',
        ...Theme.typography.inputLabel,
        position: 'absolute',
        top: -22,
        left: -5,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },
    textLabel: {
        color: '#064545',
        fontFamily: 'gilroy-medium',
    },
    error: {
        color: 'red',
        ...Theme.typography.inputError,
        marginLeft: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
