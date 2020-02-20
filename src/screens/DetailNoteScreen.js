import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Context } from '../context/noteContext';
import { Feather } from "@expo/vector-icons";
import { Text } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';


const shareOptions = {
    message: 'Message to share'
};


const DetailNoteScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    const note = navigation.getParam('item');

    shareOptions.message = note.content;

    onSharePress = () => Share.share(shareOptions);

    return (
        <View>
            <View style={styles.cardStyle}>
                <View style={styles.headerStyle}>
                    <Text h4>{note.title}</Text>
                    <TouchableOpacity onPress={onSharePress}>
                        <EvilIcons name="share-google" style={styles.iconShareStyle} />
                    </TouchableOpacity>
                </View>
                
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
    headerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconShareStyle: {
        fontSize: 38
    },
    contentStyle: {
        marginTop: 20,
        marginBottom: 30
    }
});

export default DetailNoteScreen;