import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  AsyncStorage,
  Button,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as noteContext } from '../context/noteContext';


const IndexScreen = ({ navigation }) => {
    const { state, getNotes, deleteNote } = useContext(noteContext);
    const [arrayNotes, setArrayNotes] = useState([]);

    useEffect(() => {
      getNotes();
      getGeneralNotes();

        const listener = navigation.addListener('didFocus', () => {
            getNotes();
            getGeneralNotes();
        });

        return () => {
            listener.remove();
        };

    }, []);


  getGeneralNotes = async () => {
    //  Limpiamos el array cada vez que se actualiza
    setArrayNotes(() => arrayNotes.splice());

    await AsyncStorage.getItem('localNotesData').then(value => {
        if (value !== null) {
            JSON.parse(value).forEach(noteLocal => {
                setArrayNotes((arrayNotes) => arrayNotes.concat(noteLocal));
            });
      } else {
        console.log('WARNING, ASYNC STORAGE VACIO');
      }
    });

    // ESTO SON LAS NOTAS REMOTAS
      state.forEach(noteRemote => {
          setArrayNotes((arrayNotes) => arrayNotes.concat(noteRemote));
      });
  };

  deleteLocalNote = async (id) => {
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
                arrayLocalNotes.splice(arrayLocalNotes.indexOf(idx), 1);
        
                // AÑADIMOS EL ARRAY DE NUEVO AL ASYNC STORAGE CON LOS VALORES MODIFICADOS Y VOLVEMOS A LA PANTALLA PRINCIPAL
                AsyncStorage.setItem('localNotesData', JSON.stringify(arrayLocalNotes)).then(() => {
                    getNotes();
                    getGeneralNotes();
                });

            }
        })



      } catch (error) {
          console.log('ERROR', error);
      }
  }

  return (
    <View style={styles.container}>  
      <FlatList
        data={arrayNotes}
        keyExtractor={(note, index) => note.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { item })}
              style={styles.cardStyle}
            >
              <View style={styles.cardContentStyle}>
                <View>
                  {item.isLocal ?  <AntDesign name="mobile1" style={styles.iconLocalNote} /> : <MaterialCommunityIcons name="server" style={styles.iconLocalNote} />}
                </View>
                <Text style={styles.titleStyle} numberOfLines={1}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => {
                  if(item.isLocal){     
                    deleteLocalNote(item.id);
                  } else {
                    deleteNote(item.id).then(() => { 
                      getNotes();
                      getGeneralNotes();
                    });
                  };
                }}>
                  <Feather name="trash" style={styles.iconStyle} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* <Button onPress={() => clearAsyncStorage()} title="Clear Async Storage" /> */}
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return { 
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" style={styles.iconCreateNote} />
      </TouchableOpacity>
    ),
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" style={styles.iconMenu} />
        </TouchableOpacity>
    )
  };
};


const styles = StyleSheet.create({
  iconCreateNote: {
    fontSize: 25,
    marginRight: 15
  },
  
  container: {
    backgroundColor: '#F9FAFE',
    flex: 1,
    padding: 10,
  },
  cardStyle: {
    backgroundColor: 'white',
    padding: 25,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 3,
  },
  cardContentStyle: {
    flexDirection: 'row',
    flex: 1    
  },
  titleStyle: {
    fontSize: 18,
    maxWidth: '80%',
    width: '80%',
    marginLeft: 20
  },
  iconLocalNote: {
    fontSize: 18,
    marginTop: 5
  },
  iconStyle: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#DC5050',
  },
  iconMenu: {
    fontSize: 25,
    marginLeft: 10
},
});
export default IndexScreen;
