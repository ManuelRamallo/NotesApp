import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'react-native-elements';

const EmptyState = () => {

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/empty-state.png')}
                style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>No se han encontrado resultados</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '90%',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    textStyle: {
        fontSize: 18,
        
    }
});

export default EmptyState;