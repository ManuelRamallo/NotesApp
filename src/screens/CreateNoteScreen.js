import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, AsyncStorage, Alert} from 'react-native';
import { Context } from '../context/noteContext';
import NoteForm from '../components/noteForm';


const CreateNoteScreen = ({ navigation }) => {

    const { createNote } = useContext(Context);
    const [switchValue, setSwitchValue] = useState(false);
    const [toggleLocalNotes, setToggleLocalNotes] = useState(null);

  
            
    AsyncStorage.getItem('toggleLocalNotes').then(value => {
        if(value !== null){
            setToggleLocalNotes(JSON.parse(value));
        }
    });

   


    addLocalNote = async (title, content) => {
        const listLocalNotes = [];
        if(title && content) {
            listLocalNotes.push({
                id: Math.floor(Math.random() * 99999),
                title, 
                content,
                isLocal: true
            })

            try {
                AsyncStorage.getItem('localNotesData').then((value) => {

                    // ESTO ES PARA CUANDO EL ARRAY DE ASYNC STORAGE YA NO ESTÉ VACÍO
                    if(value !== null){
                        // esto ahora es un array con objetos dentro
                        const arrayLocalNotes = JSON.parse(value);
                        // lo que hacemos ahora es guardar de nuevo el array en el async storage
                        arrayLocalNotes.push({
                            id: Math.floor(Math.random() * 99999),
                            title, 
                            content,
                            isLocal: true
                        });
                        AsyncStorage.setItem('localNotesData', JSON.stringify(arrayLocalNotes)).then(() => {
                            navigation.navigate('Index');
                        })
                    // EL ELSE ES PARA CUANDO EL ARRAY DE ASYNC STORAGE ESTÉ VACIO LA PRIMERA VEZ
                    } else {
                        AsyncStorage.setItem('localNotesData', JSON.stringify(listLocalNotes)).then(() => {
                            navigation.navigate('Index');
                        })
                    }
                })
            } catch (error) {
                console.log('ERROR', error);
            }


        } else {
            Alert.alert(
                'ERROR',
                'Falta algun dato como el titulo o el contenido',
                [ 
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                { toggleLocalNotes ? 
                    <View style={styles.toggle}>
                        <Text style={styles.textToggle}>{switchValue ? 'Guardar en local' : 'Guardar en remoto'}</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={() => setSwitchValue(!switchValue)} 
                            value={switchValue}
                            thumbColor={'#59ADE7'}
                        />   
                    </View> 
                    : 
                    null
                }
                         

                <NoteForm 
                    titleLabel={'Enter title'}
                    contentLabel={'Enter content'}
                    textButton={'CREATE NOTE'}
                    onSubmit={( title, content ) => {
                        if(switchValue){                            
                            addLocalNote(title,content);
                        } else {
                            createNote(title, content, () => navigation.navigate('Index'))
                        };
                    }}/>
            </View>

        </View>
    );
};

CreateNoteScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Create Note',
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
    toggle: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    textToggle: {
        textAlign: 'left',
        marginRight: 5,
        marginTop: 3,
        fontWeight: 'bold'
    },
    switch: {
        alignSelf: 'flex-end'
    },
});

export default CreateNoteScreen;