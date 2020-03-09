import React, { useState, useEffect } from 'react';
import { Text, View, Button, Vibration, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';


const NotificationsScreen = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});


    registerForPushNotificationsAsync = async () => {

        if(Constants.isDevice){
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );

            let finalStatus = existingStatus;
            if(existingStatus !== 'granted'){
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            if(finalStatus !== 'granted'){
                Alert.alert('Failed to get push token for push notifications');
                return;
            }

            let token = await Notifications.getExpoPushTokenAsync();
            console.log('TOKEN', token);
            setExpoPushToken(token);

        } else {
            Alert.alert('Must use physical device for Push Notifications');
        }
    }

    useEffect(() => {

        registerForPushNotificationsAsync();

        _notificationSubscription = Notifications.addListener(
            _handleNotification
        );


    }, []);

    _handleNotification = notification => {
        Vibration.vibrate();
        setNotification(notification);
    };
    

    sendPushNotification = async () => {
            const message = {
              to: expoPushToken,
              sound: 'default',
              title: 'Original Title',
              body: 'And here is the body!',
              data: { data: 'goes here' },
            };
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(message),
            });
            const data = response._bodyInit;
            console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
          };


    return (
        <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Origin: {notification.origin}</Text>
            <Text>Data: {JSON.stringify(notification.data)}</Text>
        </View>
        <Button
            title={'Press to Send Notification'}
            onPress={() => sendPushNotification()}
        />
        </View>
    );

}

NotificationsScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: 'Notificaciones',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" style={styles.iconMenu} />
            </TouchableOpacity>
        )
    };
  };


const styles = StyleSheet.create({
    iconMenu: {
        fontSize: 25,
        marginLeft: 10
    },
});

export default NotificationsScreen;