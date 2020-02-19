import React, { useContext } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Context } from '../context/noteContext';
import noteForm from '../components/noteForm';
import NoteForm from '../components/noteForm';

const EditNoteScreen = ({ navigation }) => {

    const { editNote } = useContext(Context);
    const note = navigation.getParam('note');


    editLocalNote = async (id, title,content) => {
    
        try {
            // RECOGEMOS LAS NOTAS LOCALES GUARDADAS EN LA ASYNC STORAGE
            AsyncStorage.getItem('localNotesData').then((value) => {
                if(value !== null) {

                    // LO PASAMOS A UNA VARIABLE
                    const arrayLocalNotes = JSON.parse(value);

                    // OBTENEMOS EL ELEMENTO EN CUESTION QUE SE NECESITA EDITAR
                    const idx = arrayLocalNotes.find(element => element.id === id);

                    // USAMOS EL METODO SPLICE PARA ELIMINAR EL ELEMENTO QUE SE VA A EDITAR Y AÑADIR EL NUEVO EDITADO EN LA MISMA POSICION 
                    // DEL QUE SE VA HA BORRADO
                    arrayLocalNotes.splice(arrayLocalNotes.indexOf(idx), 1, {
                        id,
                        title,
                        content,
                        isLocal: true
                    });
            
                    // AÑADIMOS EL ARRAY DE NUEVO AL ASYNC STORAGE CON LOS VALORES MODIFICADOS Y VOLVEMOS A LA PANTALLA PRINCIPAL
                    AsyncStorage.setItem('localNotesData', JSON.stringify(arrayLocalNotes)).then(() => {
                        navigation.navigate('Index');
                    })

                }
            })



        } catch (error) {
            console.log('ERROR', error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <NoteForm 
                titleLabel={'Enter new title'}
                contentLabel={'Enter new content'}
                textButton={'EDIT NOTE'}
                initialValues={{ title: note.title, content: note.content}}
                onSubmit={( title, content ) => {

                    if(note.isLocal){                            
                        editLocalNote(note.id, title, content);
                    } else {
                        editNote(note.id, title, content, () => navigation.navigate('Index'));
                    };

                }}/>
            </View>
        </View>
    )
};

EditNoteScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Edit Note',
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFE'        
    },
    cardStyle: {
        backgroundColor: 'white',
        padding: 25,
        marginTop: 40,
        marginHorizontal: 20,
        borderRadius: 15,
        elevation: 3,
        paddingBottom: 40
    },
});

export default EditNoteScreen;