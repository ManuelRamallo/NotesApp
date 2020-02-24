import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NextMatchesScreen = () => {
    return (
        <View>
            <Text>
                Next Matches Screen
            </Text>
        </View>
    )
};

NextMatchesScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: 'Buscar prox partidos',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" style={styles.iconMenu} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({});

export default NextMatchesScreen;