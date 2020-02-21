import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";


const MapScreen = () => {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const initialize = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation(JSON.stringify(position));
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        }
        initialize();
    }, [])
    
    return (
        <View style={styles.container}>
            {/* EL LOCATION TIENE QUE ESTAR GUARDADO EN EL ESTADO PARA HACER EL CONTROL, SI NO NO HACE NADA */}
            {location && <MapView 
                style={styles.map}
                region={{
                    latitude: JSON.parse(location).coords.latitude,
                    longitude: JSON.parse(location).coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
             >
                <Marker 
                    coordinate={{
                        latitude: JSON.parse(location).coords.latitude,
                        longitude: JSON.parse(location).coords.longitude
                    }}
                    title={"Usted se encuentra aquí"}
                />
                
            </MapView>}
            {!location && <Text>Loading...</Text>}
        </View>
    );
};

MapScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: 'Donde estoy',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" style={styles.iconMenu} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    iconMenu: {
        fontSize: 25,
        marginLeft: 10
    },
});

export default MapScreen;