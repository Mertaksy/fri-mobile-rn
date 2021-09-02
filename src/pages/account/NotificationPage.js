import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MiniCard, BtText } from '../../components';
import * as UserAPI from '../../api/user';
import ApiErrors from '../../api/errors';
import BagBlueSvg from '../../../assets/icons/bag_blue.svg';
import Theme from '../../theme';

const initialState = {
    notifications: [],
};

const reducer = (state, newState) => ({ ...state, ...newState });

const NotificationPage = () => {
    const [state, setState] = useReducer(reducer, initialState);

    const getNotificationDataFromServer = async () => {
        await getNotifications();
    };

    useEffect(() => {
        getNotificationDataFromServer();
        return () => {
            UserAPI.markAsReadNotification();
        };
    }, []);

    const deleteSelectedNotification = async (id) => {
        try {
            const response = await UserAPI.deleteNotification(`${id}`);
            getNotificationDataFromServer();
        } catch (e) {
            const responseParsed = ApiErrors(e);
            console.log(responseParsed);
        }
    };

    const getNotifications = async () => {
        try {
            const response = await UserAPI.getNotifications();
            const data = response.data;
            if (data.success) {
                setState({ notifications: data.notifications });
            }
        } catch (e) {
            const responseParsed = ApiErrors(e);
            if (responseParsed.status === 401) {
                console.log(responseParsed);
            }
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.notificationWrapper}>
                    {state.notifications.length ? (
                        state.notifications.map((option, key) => {
                            return (
                                <MiniCard
                                    key={key}
                                    data={option.data}
                                    createdDate={option.created_at.slice(0, 10)}
                                    onPressDelete={() => deleteSelectedNotification(option.id)}
                                />
                            );
                        })
                    ) : (
                        <View>
                            <View style={styles.iconCart}>
                                <BagBlueSvg width={30} height={30} />
                            </View>
                            <BtText type="title4" color="lightBlue" style={styles.noNotification}>
                                Bildirim yok :(
                            </BtText>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationPage;

const styles = StyleSheet.create({
    safeAreaView: { flex: 1, backgroundColor: '#fff' },
    scrollView: { flex: 1 },
    notificationWrapper: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    noNotification: { textAlign: 'center', marginTop: 20 },
    headerTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    headerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Theme.palette.green,
        flex: 1,
        padding: 10,
        margin: 5,
    },
    cardItemDot: {
        backgroundColor: Theme.palette.green,
        color: '#fff',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    iconCart: {
        backgroundColor: 'rgba(115, 179, 179,0.15)',
        borderRadius: 45,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
});
