import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const NoteForm = ({ onSubmit, initialValues, titleLabel, contentLabel, textButton }) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return(
        <View style={styles.container}>
           
                <Text style={styles.textStyle}>{titleLabel}</Text>
                <TextInput
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.textInputStyle}
                />
                <Text style={styles.textStyle}>{contentLabel}</Text>
                <TextInput
                    value={content}
                    onChangeText={text => setContent(text)}
                    style={styles.textInputAreaStyle}
                    numberOfLines={5}
                    multiline
                />
                <TouchableOpacity onPress={() => onSubmit(title, content)}>
                    <View style={styles.buttonCreate}>
                        <Text style={styles.textButton}>{textButton}</Text>
                    </View>
                </TouchableOpacity>
           
        </View>
    )
};

NoteForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    
    textInputStyle: {
        borderColor: "#DFDFDF",
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 25,
        marginHorizontal: 10,
        height: 40,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 18,
      },
      textInputAreaStyle: {
        textAlign: 'left',
        textAlignVertical: 'top',
        borderColor: "#DFDFDF",
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 40,
        marginHorizontal: 10,
        height: 300,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
      },
      textStyle: {
        marginLeft: 10,
        color: '#666666',
        fontWeight: "bold",
        fontSize: 16
      },
      buttonCreate: {
        marginHorizontal: 30,
        backgroundColor: '#59ADE7',
        padding: 15, 
        borderRadius: 8,
        elevation: 4
      },
      textButton: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
      }
});

export default NoteForm;