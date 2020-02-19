import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/noteContext';
import { Feather } from "@expo/vector-icons";
import { Text } from 'react-native-elements';

const DetailNoteScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    // const note = state.find(
    //     note => note.id === navigation.getParam("id")
    // );

    const note = navigation.getParam('item');


    return (
        <View>
            <View style={styles.cardStyle}>
                <Text h4>{note.title}</Text>
                <Text style={styles.contentStyle}>{note.content}</Text>
            </View>
        </View>
    )
};

DetailNoteScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Note Details',
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Edit", { note: navigation.getParam('item') })}>
                <Feather name="edit-2" style={styles.iconEditStyle} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    iconEditStyle: {
        fontSize: 30,
        marginRight: 10
    },
    cardStyle: {
        backgroundColor: 'white',
        padding: 25,
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 12,
        borderRadius: 15,
        elevation: 3
    },
    contentStyle: {
        marginTop: 20,
        marginBottom: 30
    }
});

export default DetailNoteScreen;